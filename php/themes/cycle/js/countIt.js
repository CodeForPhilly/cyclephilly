var counter2015;

google.setOnLoadCallback(function() {
  $(function() {
   var counterRef = new Firebase('https://cyclephilly.firebaseio.com/trips-count/');
  counterRef.child('2015').on('value', function(snapshot) {
       counter2015 = snapshot.val();
      $('#2015TotalTrips').html(counter2015.total);
});

 console.log(counter2015 + "<-- this is the count for 2015 trips from firebaseio");
  });
});
   
