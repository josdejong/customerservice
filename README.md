# Customer Service

Customer Service is a demo demonstrating how to create a powerful web
application for customer service using AngularJS for the user interface, and
CouchDB as database.

The demo conists of a basic Customer Service application. One can create, edit,
and delete customers, and for each customer, create multiple reports. The
customers can be searched by name and by last updated.

The complete application consists of one file: index.html. The file is only
450 lines of code, including everything: interface, controller, database,
search queries.


## Deployment

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
