var express = require('express');

var app = express();

var inBody = function(query) {
  var result = eval(query);
  return "<html>\n" +
    "\n" +
    "<head>\n" +
    "  <title>OJSI</title>\n" +
    "  <meta property=\"og:locale\" content=\"en_US\" />\n" +
    "  <meta property=\"og:type\" content=\"article\" />\n" +
    "  <meta property=\"og:title\" content=\"" + query + "\" />\n" +
    "  <meta property=\"og:description\" content=\"" + result + "\" />\n" +
    "  <meta property=\"og:url\" content=\"https://ojsi.herokuapp.com/\" />\n" +
    "  <meta property=\"og:site_name\" content=\"OJSI\" />\n" +
    "</head>\n" +
    "\n" +
    "<body>\n" +
    result + "\n" +
    "</body>\n" +
    "\n" +
    "</html>\n"
};

app.get('/', function (req, res) {
  var splitted = req.originalUrl.split('?');
  if (splitted.length < 1) {
    res.send('Query not received');
  } else {
    var queryStart = splitted[0].length + 1;
    var encodedQuery = req.originalUrl.substring(queryStart);
    res.send(inBody(decodeURIComponent(encodedQuery)));
  }
});

app.listen(process.env.PORT || '3000', function() {
  console.log('Server started')
});

