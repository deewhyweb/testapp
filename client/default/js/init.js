/*
JSON is automatically included with each app.

Use the $fh.ready() (http://docs.feedhenry.com/wiki/Ready) function to trigger 
loading the local config and binding a click event to invoke the cloud action 
call which will return the remote config.
*/

$fh.ready(function() {
  // The local config variable from config.js can be accessed directly


  document.getElementById('soapcall').onclick = function() {
    // Invoke a cloud action call to get the remote configuration
    // See: http://docs.feedhenry.com/wiki/Actions
    var symbol = document.getElementById('symbol').value;
    if (symbol && symbol != "") {
      console.log(symbol);
      $fh.act(
        {
          act: 'getResult',
          req: {symbol: symbol}
        },
        function(res) {
          console.log(res);
          document.getElementById('results').innerHTML = "<p>" + JSON.stringify(res) + "</p>";
        },
        function(code,errorprops,params) {
          alert('An error occured: ' + code + ' : ' + errorprops);
        }
      );
    } else {

      alert('Please enter a symbol');
    }
    
  };

});