/**
 * This nodejs script can automatically insert randomly generated documents
 * (corresponding with the customer service application) for testing or 
 * benchmarking purposes. 
 * 
 * Example usage: 
 *   node create_documents.js 100
 * This will insert 100 random documents in the database "service".
 */

var http = require('http'),
    url = require('url'),
    qs = require('querystring');

var DATABASE = 'http://localhost:5984/service';


/**
 * Execute an HTTP request
 * If data is provided, a POST request is performed. Else a GET request is 
 * performed.
 * @param {String} requestUrl   
 * @param {String or Object} data   Optional data
 * @param {function} callback   A callback function, with the response data
 *                              as parameter.
 */ 
function http_request(requestUrl, data, callback) {
    var u = url.parse(requestUrl);
    
    var options = {
        host: u.hostname,
        port: u.port || 80,
        path: u.pathname + (u.query ? '?' + u.query : ''),
        method: data ? 'POST' : 'GET'
    };
    
    var payload;
    switch( typeof(data) ) {
        case "string": 
          payload = data;
          break;
        case "object":
          payload = JSON.stringify(data);
          options.headers = options.headers || {};
          options.headers["Content-Type"] = "application/json";
          break;
        case "undefined":
          payload = undefined;
          break;
        default:
          payload = String(data);
          break;
    }

    var req = http.request(options, function(res) {
        var data = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            if (callback) {
                callback(data);
            }
        });
    });
    req.on('error', function(e) {
        throw e;
    });

    if (payload) {
        req.write(payload);
    }
    req.end();
}

function generateWord() {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charsCount = chars.length;
  var len = Math.round(2 + Math.random() * 8);

  var word = '';
  for (var i = 0; i < len; i++) {
    word += chars[Math.round(Math.random() * (charsCount - 1))];
  }
  return word;
}

function generateWords(count) {
  var words = '';
  for (var i = 0; i < count; i++) {
    words += generateWord() + ' ';
  }
  return words;
}

function generateReports(count) {
  var reports = [];
  for (var i = 0; i < count; i++) {
    reports.push(generateReport());
  }
  return reports;
}

function generateReport() {
  var report = {
   'date': new Date((new Date()).valueOf() - (Math.random() * 1000 * 60 * 60 * 24 * 365)),
   'bill': Math.round(Math.random() * 500 ) + ' euro',
   'payed': (Math.random() > 0.1),
   'report': generateWords(Math.round(Math.random() * 100))
  };
  return report;
}

function generateDocument() {
  var doc = {
   'name': generateWords(2),
   'address': {
       'street': generateWords(2),
       'city': generateWord(),
       'country': generateWord()
   },
   'contact': [
   ],
   'reports': generateReports(Math.round(Math.random() * 10))
  };
  
  return doc;
}

function generateDocuments(count) {
  var docs = [];
  for (var i = 0; i < count; i++) {
    docs.push(generateDocument());
  }
  return docs;
}

function createDocuments(docCount) {
  console.log('creating ' + docCount + ' documents');
  
  var batchsize = 1000;
  var docsLeft = docCount;

  var createBulk = function () {
    var count = Math.min(batchsize, docsLeft);
    docsLeft -= count;

    if (count == 0) {
      console.log('done');
      return;
    }

    // create the documents in a batch
    var bulkDocs = {
      'docs': generateDocuments(count)
    };
    http_request(DATABASE + '/_bulk_docs', bulkDocs, function () {
      console.log(docsLeft + ' documents left (' + 
        Math.round(100 * (docCount - docsLeft) / docCount) + '%)');
      createBulk();
    });
  }
  
  createBulk();
}


var docCount = process.argv[2];
if (docCount == undefined) {
  console.log('Provide a document count as command line parameter');
  console.log('Example usage to insert 1000 documents:');
  console.log('  node create_documents.js 1000');
}
else {
  // create the documents
  createDocuments(docCount);
}
