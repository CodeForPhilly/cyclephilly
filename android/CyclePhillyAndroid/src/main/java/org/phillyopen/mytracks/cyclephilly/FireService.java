package org.phillyopen.mytracks.cyclephilly;

import java.net.URI;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.DefaultHttpClient;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Binder;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

public class FireService extends Service {
    public static final String LOCATION_POLL_INTERVAL = "lp";
    public static final String LOCATION_ACCURACY = "la";
    public static final String LOCATION_POWER = "lw";
    public static final String FIREBASE_REF = "fb";
    public static final Boolean FIREBASE_APPEND = false;

    public static final String NOTIFICATION_ACTIVITY = "na";
    public static final String NOTIFICATION_ICON = "ni";
    public static final String NOTIFICATION_STARTUP = "ns";
    public static final String NOTIFICATION_TEXT = "nt";

    private static final long TWO_MINUTES = 1000 * 60 * 2;
    private static final String URL = "https://cyclephilly.firebaseio.com/location/lizzy.json";
    private static final long POLL_INTERVAL = 1000 * 60 * 5;
    private static final int SERVICE_ID = 0xba5e;

    private Location currentLocation = null;
    private NotificationManager notificationMgr;
    private boolean started = false;
    private LocationListener locListener;

    // notification settings
    private int icon = -1;
    private Class<Activity> notifiedActivity;
    private String startupText = null;
    private String notificationText = null;

    // Settings
    private boolean isAppend = false;
    private int locationAccuracy = Criteria.ACCURACY_COARSE;
    private int locationPower = Criteria.POWER_MEDIUM;
    private long pollInterval = POLL_INTERVAL;
    private String firebaseRef = URL;

    public class FireServiceBinder extends Binder {
        FireService getService() {
            return FireService.this;
        }
    }

    private final IBinder binder = new FireServiceBinder();

    @Override
    public void onCreate() {
        notificationMgr = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
    }

    @Override
    public void onDestroy() {
        clearListener();
        notificationMgr.cancel(SERVICE_ID);
        started = false;
    }

    private void showNotification() {
        if (icon != -1) {
            CharSequence text = startupText;

            Notification note = new Notification(icon, text,
                    System.currentTimeMillis());
            PendingIntent i = PendingIntent.getActivity(this, 0,
                    new Intent(this, notifiedActivity), 0);
            note.setLatestEventInfo(this, notificationText,
                    text, i);
            notificationMgr.notify(SERVICE_ID, note);
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }

    @Override
    public int onStartCommand(Intent i, int flags, int startId) {
        if (i != null) {
            setupParams(i);
            startLocationService();
            showNotification();
        }
        return START_STICKY;
    }

    @SuppressWarnings("unchecked")
    private void setupParams(Intent i) {
        Bundle extras = i.getExtras();
        locationAccuracy = extras.getInt(LOCATION_ACCURACY, Criteria.ACCURACY_COARSE);
        locationPower = extras.getInt(LOCATION_POWER, Criteria.POWER_MEDIUM);
        isAppend = FIREBASE_APPEND;
        pollInterval = extras.getLong(LOCATION_POLL_INTERVAL, POLL_INTERVAL);
        String ref = extras.getString(FIREBASE_REF);
        if (ref != null) {
            firebaseRef = ref;
        } else {
            firebaseRef = URL;
        }

        // Notification stuff
        String clazz = extras.getString(NOTIFICATION_ACTIVITY);
        if (clazz != null) {
            try {
                notifiedActivity = (Class<Activity>)Class.forName(clazz);
            } catch (ClassCastException e) {
                notifiedActivity = null;
            } catch (ClassNotFoundException e) {
                notifiedActivity = null;
            }
            startupText = extras.getString(NOTIFICATION_STARTUP);
            notificationText = extras.getString(NOTIFICATION_TEXT);
        }
        int iconId = extras.getInt(NOTIFICATION_ICON, -1);
        if (iconId != -1 && notifiedActivity != null && startupText != null) {
            icon = iconId;
            if (notificationText == null) {
                notificationText= startupText;
            }
        }
    }

    private LocationManager getLocationMgr() {
        return (LocationManager)getSystemService(Context.LOCATION_SERVICE);
    }

    private LocationListener getListener() {
        return new LocationListener() {

            @Override
            public void onLocationChanged(Location location) {
                onNewLocation(location);
            }

            @Override
            public void onProviderDisabled(String provider) {
                // TODO Auto-generated method stub

            }

            @Override
            public void onProviderEnabled(String provider) {
                // TODO Auto-generated method stub

            }

            @Override
            public void onStatusChanged(String provider, int status,
                                        Bundle extras) {
                // TODO Auto-generated method stub

            }
        };
    }

    private void clearListener() {
        if (locListener != null) {
            getLocationMgr().removeUpdates(locListener);
            locListener = null;
        }
    }

    private void startLocationService() {
        if (started) {
            clearListener();
        }
        started = true;
        LocationManager mgr = getLocationMgr();
        locListener = getListener();
        String provider = getProviderName(mgr);
        mgr.requestLocationUpdates(provider, pollInterval, 0, locListener);
    }

    private String getProviderName(LocationManager mgr) {
        Criteria crit;
        crit = new Criteria();
        crit.setAccuracy(locationAccuracy);
        crit.setAltitudeRequired(false);
        crit.setBearingRequired(false);
        crit.setPowerRequirement(locationPower);
        crit.setCostAllowed(false);
        return mgr.getBestProvider(crit, true);
    }

    private void onNewLocation(Location location) {
        if (isBetterLocation(location, currentLocation)) {
            currentLocation = location;
        }
        sendLocation(currentLocation);
    }

    private boolean isBetterLocation(Location location, Location currentBest) {

        if (currentBest == null) {
            return true;
        }

        long timeDelta = location.getTime() - currentBest.getTime();
        boolean isSignificantlyNewer = timeDelta > TWO_MINUTES;
        boolean isSignificantlyOlder = timeDelta < -TWO_MINUTES;
        boolean isNewer = timeDelta > 0;

        if (isSignificantlyNewer) {
            return true;
        }
        if (isSignificantlyOlder) {
            return false;
        }

        int accDelta = (int)(location.getAccuracy() - currentBest.getAccuracy());
        boolean isMoreAccurate = accDelta < 0;
        boolean isMuchWorse = accDelta > 200;
        boolean sameProvider = isSameProvider(location.getProvider(),
                currentBest.getProvider());

        if (!isMoreAccurate) {
            // Less accurate
            return false;
        } else if (isNewer && isMoreAccurate) {
            return true;
        } else if (isNewer && !isMuchWorse && sameProvider) {
            return true;
        }
        return false;
    }

    private boolean isSameProvider(String a, String b) {
        if (a == null) {
            return b == null;
        }
        return a.equals(b);
    }

    private void sendLocation(Location location) {
        String json = buildJSON(location);
        new UploadTask().execute(json);
    }

    private String buildJSON(Location location) {
        long ts = location.getTime();
        long updateTs = System.currentTimeMillis();
        double lat = location.getLatitude();
        double lon = location.getLongitude();
        StringBuilder sb = new StringBuilder("{\"ts\":");
        sb.append(ts)
                .append(",\"updated\":")
                .append(updateTs)
                .append(",\"lat\":")
                .append(lat)
                .append(",\"lon\":")
                .append(lon)
                .append("}");
        String json = sb.toString();
        return json;
    }

    private void putString(String data, String targetUrl) {
        URI url = URI.create(targetUrl);
        ByteArrayEntity entity = new ByteArrayEntity(data.getBytes());
        HttpClient client = new DefaultHttpClient();
        HttpUriRequest req;
        if (isAppend) {
            HttpPost post = new HttpPost(url);
            post.setEntity(entity);
            req = post;
        } else {
            HttpPut put = new HttpPut(url);
            put.setEntity(entity);
            req = put;
        }
        try {
            HttpResponse resp = client.execute(req);
            int statusCode = resp.getStatusLine().getStatusCode();
            Log.i("locationService", "Upload response: " + statusCode);
        } catch (Exception e) {
            Log.e("locationService", "Caught exception uploading: " + e);
        }
    }

    private class UploadTask extends AsyncTask<String, Void, Void> {

        @Override
        protected Void doInBackground(String... params) {
            putString(params[0], firebaseRef);
            return null;
        }
    }

}