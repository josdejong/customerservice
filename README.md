# Customer Service

Customer Service is a demo showing the ease, power, and flexibility of
a web application build with
[AngularJS](http://angularjs.org/) for the user interface and
[CouchDB](http://couchdb.apache.org/) as database.
The demo consists of a basic customer service application.
One can create, edit, and delete customers.
For each customer, one can create, edit and delete reports.
The customers can be searched by name and by last updated.

The complete application consists of a single file:
[index.html](https://github.com/wjosdejong/customerservice/blob/master/index.html).
The file is only a few hundred lines of code, including everything:
interface, controller, database, search queries.
(Of course, for a serious application one should separate html, css, and javascript.)

<img src="https://raw.github.com/wjosdejong/customerservice/master/screenshot.png">


## Installation

To install the demo (on Ubuntu):

- install CouchDB via the command

      sudo apt-get install CouchDB

- open the web interface in your browser at http://localhost:5984/_utils
- create a database, for example named "service"
- in this database, create a document with id with an easy to remember
  id, for example "app", and save it.
- in the document with id "app", add the file "index.html" as attachment
- run the application in your browser via

      http://localhost:5984/service/app/index.html


Instead of installing CouchDB locally, one can create an account at a hosting
service for couchdb, such as [Cloudant](https://cloudant.com/).


## References

- AngularJS: http://angularjs.org/
- CouchDB: http://couchdb.apache.org/


Jos de Jong, 2012
