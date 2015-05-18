/**	 Cycle Altanta, Copyright 2012 Georgia Institute of Technology
 *                                    Atlanta, GA. USA
 *
 *   @author Christopher Le Dantec <ledantec@gatech.edu>
 *   @author Anhong Guo <guoanhong15@gmail.com>
 *
 *   Updated/Modified for Atlanta's app deployment. Based on the
 *   CycleTracks codebase for SFCTA.
 *
 *   CycleTracks, (c) 2009 San Francisco County Transportation Authority
 * 					  San Francisco, CA, USA
 *
 *   Licensed under the GNU GPL version 3.0.
 *   See http://www.gnu.org/licenses/gpl-3.0.txt for a copy of GPL version 3.0.
 *
 * 	 @author Billy Charlton <billy.charlton@sfcta.org>
 *
 */
package org.phillyopen.mytracks.cyclephilly;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import org.json.JSONObject;
import org.phillyopen.mytracks.cyclephilly.R;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.firebase.client.AuthData;
import com.firebase.client.Firebase;
import com.firebase.client.FirebaseError;
import com.firebase.client.ServerValue;
import com.firebase.security.token.TokenGenerator;

public class UserInfoActivity extends Activity {
	public final static int PREF_AGE = 1;
	public final static int PREF_ZIPHOME = 2;
	public final static int PREF_ZIPWORK = 3;
	public final static int PREF_ZIPSCHOOL = 4;
	public final static int PREF_EMAIL = 5;
	public final static int PREF_GENDER = 6;
	public final static int PREF_CYCLEFREQ = 7;
	public final static int PREF_ETHNICITY = 8;
	public final static int PREF_INCOME = 9;
	public final static int PREF_RIDERTYPE = 10;
	public final static int PREF_RIDERHISTORY = 11;
    public final static int PREF_ANONID = 13;
    public final static String FIRE_REF = "https://cyclephilly.firebaseio.com";
    public final static String FIRE_TOKEN = "bi7GsULLfYOxmv47jt3gh2rgnN5XvjlnpLVTu8wy";
    public final char[] CHARSET_AZ_09 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();

	private static final String TAG = "UserPrefActivity";

	private final static int MENU_SAVE = 0;

	final String[] freqDesc = { "Less than once a month",
			"Several times a month", "Several times per week", "Daily" };

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.userprefs);
        //Firebase Init
        Firebase.setAndroidContext(this);

		// Don't pop up the soft keyboard until user clicks!
		this.getWindow().setSoftInputMode(
				WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);

		SeekBar sb = (SeekBar) findViewById(R.id.SeekCycleFreq);
		sb.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {

			@Override
			public void onStopTrackingTouch(SeekBar arg0) {
				// TODO Auto-generated method stub
			}

			@Override
			public void onStartTrackingTouch(SeekBar arg0) {
				// TODO Auto-generated method stub
			}

			@Override
			public void onProgressChanged(SeekBar arg0, int arg1, boolean arg2) {
				TextView tv = (TextView) findViewById(R.id.TextFreq);
				tv.setText(freqDesc[arg1 / 100]);
			}
		});

		Button btn = (Button) findViewById(R.id.saveButton);
		btn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				Intent intent = new Intent(UserInfoActivity.this,
						MainInput.class);
				startActivity(intent);
				finish();
			}

		});

		SharedPreferences settings = getSharedPreferences("PREFS", 0);
		Map<String, ?> prefs = settings.getAll();
		for (Entry<String, ?> p : prefs.entrySet()) {
			int key = Integer.parseInt(p.getKey());
			// CharSequence value = (CharSequence) p.getValue();

			switch (key) {
			case PREF_AGE:
				((Spinner) findViewById(R.id.ageSpinner))
						.setSelection(((Integer) p.getValue()).intValue());
				break;
			case PREF_ETHNICITY:
				((Spinner) findViewById(R.id.ethnicitySpinner))
						.setSelection(((Integer) p.getValue()).intValue());
				break;
			case PREF_INCOME:
				((Spinner) findViewById(R.id.incomeSpinner))
						.setSelection(((Integer) p.getValue()).intValue());
				break;
			case PREF_RIDERTYPE:
				((Spinner) findViewById(R.id.ridertypeSpinner))
						.setSelection(((Integer) p.getValue()).intValue());
				break;
			case PREF_RIDERHISTORY:
				((Spinner) findViewById(R.id.riderhistorySpinner))
						.setSelection(((Integer) p.getValue()).intValue());
				break;
			case PREF_ZIPHOME:
				((EditText) findViewById(R.id.TextZipHome)).setText((CharSequence) p.getValue());
				break;
			case PREF_ZIPWORK:
				((EditText) findViewById(R.id.TextZipWork)).setText((CharSequence) p.getValue());
				break;
			case PREF_ZIPSCHOOL:
				((EditText) findViewById(R.id.TextZipSchool)).setText((CharSequence) p.getValue());
				break;
			case PREF_EMAIL:
				((EditText) findViewById(R.id.TextEmail)).setText((CharSequence) p.getValue());
				break;
			case PREF_CYCLEFREQ:
				((SeekBar) findViewById(R.id.SeekCycleFreq)).setProgress(((Integer) p.getValue()).intValue());
				break;
			case PREF_GENDER:
				int x = ((Integer) p.getValue()).intValue();
				if (x == 2) {
					((RadioButton) findViewById(R.id.ButtonMale)).setChecked(true);
				} else if (x == 1) {
					((RadioButton) findViewById(R.id.ButtonFemale)).setChecked(true);
				}
				break;
			}
		}
	}

	@Override
	public void onDestroy() {
		savePreferences();
		super.onDestroy();
	}

	private void savePreferences() {
		// Save user preferences. We need an Editor object to
		// make changes. All objects are from android.context.Context
		final SharedPreferences settings = getSharedPreferences("PREFS", 0);
		SharedPreferences.Editor editor = settings.edit();

		editor.putInt("" + PREF_AGE, ((Spinner) findViewById(R.id.ageSpinner))
				.getSelectedItemPosition());
		editor.putInt("" + PREF_ETHNICITY,
				((Spinner) findViewById(R.id.ethnicitySpinner))
						.getSelectedItemPosition());
		editor.putInt("" + PREF_INCOME,
				((Spinner) findViewById(R.id.incomeSpinner))
						.getSelectedItemPosition());
		editor.putInt("" + PREF_RIDERTYPE,
				((Spinner) findViewById(R.id.ridertypeSpinner))
						.getSelectedItemPosition());
		editor.putInt("" + PREF_RIDERHISTORY,
				((Spinner) findViewById(R.id.riderhistorySpinner))
						.getSelectedItemPosition());

		editor.putString("" + PREF_ZIPHOME,
				((EditText) findViewById(R.id.TextZipHome)).getText()
						.toString());
		editor.putString("" + PREF_ZIPWORK,
				((EditText) findViewById(R.id.TextZipWork)).getText()
						.toString());
		editor.putString("" + PREF_ZIPSCHOOL,
				((EditText) findViewById(R.id.TextZipSchool)).getText()
						.toString());
		editor.putString("" + PREF_EMAIL,
				((EditText) findViewById(R.id.TextEmail)).getText().toString());
		editor.putInt("" + PREF_CYCLEFREQ, ((SeekBar) findViewById(R.id.SeekCycleFreq)).getProgress());

        //Anon ID creator
        String anon = settings.getString(""+PREF_ANONID,"NADA");
        if(anon == "NADA"){


            editor.putString("" + PREF_ANONID,randomString(CHARSET_AZ_09,8));
        }

		RadioGroup rbg = (RadioGroup) findViewById(R.id.RadioGroup01);
		if (rbg.getCheckedRadioButtonId() == R.id.ButtonMale) {
			editor.putInt("" + PREF_GENDER, 2);
			//Log.v(TAG, "gender=" + 2);
		}
		if (rbg.getCheckedRadioButtonId() == R.id.ButtonFemale) {
			editor.putInt("" + PREF_GENDER, 1);
			//Log.v(TAG, "gender=" + 1);
		}

//		Log.v(TAG,
//				"ageIndex="
//						+ ((Spinner) findViewById(R.id.ageSpinner))
//								.getSelectedItemPosition());
//		Log.v(TAG,
//				"ethnicityIndex="
//						+ ((Spinner) findViewById(R.id.ethnicitySpinner))
//								.getSelectedItemPosition());
//		Log.v(TAG,
//				"incomeIndex="
//						+ ((Spinner) findViewById(R.id.incomeSpinner))
//								.getSelectedItemPosition());
//		Log.v(TAG,
//				"ridertypeIndex="
//						+ ((Spinner) findViewById(R.id.ridertypeSpinner))
//								.getSelectedItemPosition());
//		Log.v(TAG,
//				"riderhistoryIndex="
//						+ ((Spinner) findViewById(R.id.riderhistorySpinner))
//								.getSelectedItemPosition());
//		Log.v(TAG, "ziphome="
//				+ ((EditText) findViewById(R.id.TextZipHome)).getText()
//						.toString());
//		Log.v(TAG, "zipwork="
//				+ ((EditText) findViewById(R.id.TextZipWork)).getText()
//						.toString());
//		Log.v(TAG, "zipschool="
//				+ ((EditText) findViewById(R.id.TextZipSchool)).getText()
//						.toString());
//		Log.v(TAG, "email="
//				+ ((EditText) findViewById(R.id.TextEmail)).getText()
//						.toString());
//		Log.v(TAG,
//				"frequency="
//						+ ((SeekBar) findViewById(R.id.SeekCycleFreq))
//								.getProgress() / 100);

		// Don't forget to commit your edits!!!
		editor.commit();
        //Update firebase
        final Firebase ref = new Firebase(FIRE_REF);
        String deviceName = android.os.Build.MODEL;
        String deviceMan = android.os.Build.MANUFACTURER;
        Map<String,  Object> payload = new HashMap<String, Object>();
        payload.put("email", ((EditText) findViewById(R.id.TextEmail)).getText().toString());
        payload.put("device",deviceName);

        payload.put("uid", settings.getString(""+PREF_ANONID,"anon"));
        System.out.println("uid: "+settings.getString(""+PREF_ANONID,"anon"));

        JSONObject pl=new JSONObject(payload);
        TokenGenerator tokenGenerator = new TokenGenerator(FIRE_TOKEN);
        String token = tokenGenerator.createToken(pl);

        //Re-authenticate
        ref.unauth();
        ref.authWithCustomToken(token, new Firebase.AuthResultHandler(){
            @Override
            public void onAuthenticationError(FirebaseError error) {
                System.err.println("Login Failed! " + error.getMessage());
            }
            @Override
            public void onAuthenticated(AuthData authData) {
                System.out.println("Login Succeeded: ! "+authData.getAuth().get("uid"));
                Map<String, String> map = new HashMap<String, String>();
                map.put("provider", authData.getProvider());
                map.put("lastLogin", ""+System.currentTimeMillis());
                if(authData.getAuth().containsKey("email")) {
                    map.put("email", authData.getAuth().get("email").toString());
                }
                if(authData.getAuth().containsKey("device")) {
                    map.put("device", authData.getAuth().get("device").toString());
                }
                String gender = "unknown";
                if(settings.getInt(""+PREF_GENDER,0) == 2){
                    gender = "male";
                }else if (settings.getInt(""+PREF_GENDER,0) == 1){
                    gender = "female";
                }
                map.put("gender", gender);
                ref.child("users").child(authData.getAuth().get("uid").toString()).setValue(map);
            }
        });

		Toast.makeText(getBaseContext(), "User preferences saved.",
				Toast.LENGTH_SHORT).show();
	}

	/* Creates the menu items */
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		menu.add(0, MENU_SAVE, 0, "Save").setIcon(
				android.R.drawable.ic_menu_save);
		return true;
	}

	/* Handles item selections */
	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case MENU_SAVE:
			savePreferences();
			this.finish();
			return true;
		}
		return false;
	}

    public static String randomString(char[] characterSet, int length) {
        Random random = new SecureRandom();
        char[] result = new char[length];
        for (int i = 0; i < result.length; i++) {
            // picks a random index out of character set > random character
            int randomCharIndex = random.nextInt(characterSet.length);
            result[i] = characterSet[randomCharIndex];
        }
        return new String(result);
    }
}
