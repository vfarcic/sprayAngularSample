Spray & Angular sample
======================


Development: prerequisites
--------------------------

This application is created using [Scala](http://www.scala-lang.org/) and (optionally Java) in the back-end.
Front-end is decoupled from the back-end and based on HTML, JavaScript and CSS.
Communication between the back-end and the front-end is done through the REST API.

### Back-end

Whole back-end code is based on [Akka](http://akka.io/) and is divided into 3 major parts.

To develop the back-end, following needs to be downloaded and installed:

* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Scala](http://www.scala-lang.org/)
* [SBT](http://www.scala-sbt.org/)

Routing is done with [Spray](http://spray.io/).
Spray uses DSL based on [Scala](http://www.scala-lang.org/) and uses [Akka](http://akka.io/) behind the curtains.

Services are done using [Akka](http://akka.io/).

As data storage we choose [MongoDB](http://www.mongodb.org/).

Back-end tasks (dependencies, compilation, testing, execution, etc) are performed using [SBT](http://www.scala-sbt.org/).

### Front-end

Front-end is based on HTML, JavaScript and CSS.
There is no server side rendering.
Whole front-end is deployed to the browser as static pages and uses REST JSON to obtain data from the server.

To develop the front-end, following needs to be downloaded and installed:

* [Node.js](http://nodejs.org/)

Once Node.js is installed, please run the following to download the rest of programs and dependencies.

```bash
npm install -g grunt-cli
npm install -g gulp
npm install
```

Front-end tasks (uglification, concatenation, testing, etc) are done using [Node.js](http://nodejs.org/) which, in turn, runs [Bower](http://bower.io/), [Grunt](http://gruntjs.com/) and [Grunt](http://gruntjs.com/).

Additional programs are installed using [Node.js](http://nodejs.org/).
[Bower](http://bower.io/) is used to download dependencies.
Testing is performed with [Grunt](http://gruntjs.com/) which, in turn, executes [Jasmine](http://jasmine.github.io/) specs.
The rest of tasks is done with [Gulp](http://gulpjs.com/.

Running
-------

To run the application in development mode we need to start the [MongoDB](http://www.mongodb.org/) and run the application using SBT.

### MongoDB

We'll start [MongoDB](http://www.mongodb.org/) using default settings.

```bash
mongod
```

### SBT

The application is already configured to use [SBT Revolver](https://github.com/spray/sbt-revolver).
It is a plugin for SBT enabling a super-fast development turnaround for Scala applications.
Whenever any part of the code changes, [SBT Revolver](https://github.com/spray/sbt-revolver) will recompile that change and we'll see the result almost instantly.
There is no need for any additional task to be performed (packaging, deployment, etc).

```bash
sbt ~re-start
```

With [MongoDB](http://www.mongodb.org/) and [SBT Revolver](https://github.com/spray/sbt-revolver) up and running, we can see the application by opening [http://localhost:8080/](http://localhost:8080/).
The rest of instructions can be obtained from the application itself.


TODO Continue

Compilation
-----------

To compile front-end code (uglification, concatenation, etc) and execute all tests:

```bash
gulp
```

To compile and run tests continuously (on every change):

```bash
gulp watch
```


Unit Tests
----------

Front-end unit testing:

```bash
npm test
```

Alternative way of executing tests (without the installation of NPM and Bower dependencies):

```bash
cd assets
grunt jasmine
```

Tests can be executed continuously on every change to JS files:

```bash
cd assets
grunt watch
```

Production
----------

https://github.com/sbt/sbt-assembly


Presentation (AngularJS & Bootstrap CSS)
----------------------------------------

**TODO dynamic screens

### [Validation](http://localhost:8080/page/books)

Required (i.e. price), pattern (i.e. price), disabled (i.e. Save)...

[books.tmpl.html]
```html
<div class="form-group" ng-class="cssClass(bookForm.price)">
    <label for="bookPrice">Price</label>
    <input id="bookPrice" name="price" class="form-control" type="number" ng-model="book.price" placeholder="Book Price" required="true" ng-pattern="pricePattern()">
</div>
<div class="help-block" ng-show="bookForm.price.$error.pattern">
    Price must be any number of digits followed with dot and two digits (i.e. 1223.45)
</div>
<button class="btn btn-primary" id="saveBook" ng-class="cssClassButton(bookForm)" ng-disabled="!isValid(bookForm)" ng-click="saveBook()" type="button">Save</button>
```

[books.ctrl.js]
```javascript
$scope.pricePattern = function() {
    return (/^[\d]+\.*(\d)*$/);
};
$scope.isValid = function(ngModelController) {
    return ngModelController.$valid && !angular.equals($scope.book, $scope.originalBook);
};
```

[Book.scala}
```scala
case class Book(_id: Int, image: String, title: String, author: String, price: Double, link: String) {
  require(_id > 0)
}
```

**TODO Display the error modal**

### [Invocation of services](http://localhost:8080/page/books)

Async $http in books.ctrl.js (REST/JSON).

[books.ctrl.js]
```javascript
$scope.listBooks = function() {
    $http.get('/api/v1/books').then(function(response) {
        $scope.books = response.data;
    });
};
$scope.saveBook = function() {
    $http.put('/api/v1/books', $scope.book);
};
```

### [Personalization](http://localhost:8080/page/books)

Go to any page and choose any item from the Themes menu drop-down.
Themes are taken from [Bootswatch](http://bootswatch.com/).
More themes (and variation) can be found in [{wrap}bootstrap](https://wrapbootstrap.com/).

### [Search Engines Optimization (SSO)](http://localhost:8080/)

[config.ctrl.js]
```javascript
$locationProvider.html5Mode(true);
```

### [Multi channel](http://localhost:8080/page/books)

Bootstrap grid system...

[books.tmpl.html]
```javascript
<div class="container-fluid" ng-controller="booksCtrl">
    <div class="row">
        <div class="col-md-4">
            ...
        </div>
        <div class="col-md-8">
            ...
        </div>
    </div>
```

Data and Backend (Mongo DB)
---------------------------

### [Persistence](http://localhost:8080/page/books)

Mongo DB with Casbah and Salat

[Books.scala]
```scala
def list: List[DBObject] = {
  collection.find().toList
}
...
def list: List[BookReduced] = {
  bookDao.list.map(grater[BookReduced].asObject(_))
}
```

Integration (Akka / Spray)
--------------------------

### [Web Services](http://localhost:8080/page/books)

REST/JSON Web Services with Spray JSON

[Protocols.scala]
```scala
object Protocols extends DefaultJsonProtocol {
  implicit val bookFormat = jsonFormat6(Book)
  implicit val bookReducedFormat = jsonFormat3(BookReduced)
  ...
}
```

### [Messaging / (partial) Service Bus](http://localhost:8080/page/books)

Akka messages

[Books.scala]
```scala
onSuccess(booksActor ? BooksGet(id)) { extraction =>
  complete(extraction.asInstanceOf[Book])
}
```

### [Routing](http://localhost:8080/page/books)

Spray routing

[Books.scala]
```scala
pathPrefix("api" / "v1" / "books") {
  path(IntNumber) { id =>
    get {
      complete {
        bookRegistry.bookService.get(id)
      }
    } ~ delete {
    ...
```

Transversal Services
--------------------

### [Security](http://localhost:8080/page/books)

[Books.scala]
```scala
val auth = new Authentificator(actorRefFactory).basicAuth

val bookRoute = {
  pathPrefix("api" / "v1" / "books") {
    authenticate(auth) { userName =>
    ...
```

### [Properties management]

typesafe config

[Settings.scala]
```scala
class Settings(config: Config) {
  ...
  val dbHost = config.getString("sample-app.db.host")
  val dbPort = config.getInt("sample-app.db.port")
  ...
}
```

[Books.scala]
```scala
val client = MongoClient(settings.dbHost, settings.dbPort)
```

### [Exceptions management]

Spray routing

[RoutingService.scala]
```scala
implicit def routingExceptionHandler() = ExceptionHandler {
  case e: ArithmeticException => requestUri { uri =>
    complete(BadRequest, Message(s"Request $uri was NOT completed", "NOK"))
  }
}
```

[Books.scala]
```scala
  ...
  } ~ path("exception") {
    complete {
      throw new ArithmeticException
      Message("Request completed", "OK")
    }
    ...
```

[DbSupervisor.scala]
```scala
  override val supervisorStrategy = OneForOneStrategy(maxNrOfRetries = 10, withinTimeRange = 1 minute) {
    case e: MongoTimeoutException =>
      log.error(e, "Something terrible happened!!!!!!!!!!")
      log.error("Resuming the actor...")
      Resume
    case e: Exception =>
      log.error(e, "Something terrible happened and we don't even know what it is!!!!!!!!!")
      log.error("Escalating...")
      Escalate
  }
```

### Logging

[LogActor.scala]
```scala
class LogActor extends Actor with ActorLogging {
  def receive = {
    case LogDebugMessage(message)   => log.debug(message)
    case LogInfoMessage(message)    => log.info(message)
    ...
```

[Books.scala]
```scala
logActor ! LogDebugMessage(s"$userName has been authenticated")
```


TODO
----

**Presentation**
Office export
Signing
Visual components
Accessibility
Graphics

**Services**
Workflow motor
Batch
Reports
BAM
Rules engine
Services composition

**Data and Backend**
Email server
SMS Service
Documents management

**Transversal Services**
Internationalization
**TODO Continue**
Audit **TODO Delete old (Akka schedule); delete all**
Monitorization
Master data
Transactions
Context
Cache

**Development Tools**
User interface
Navigation "flujos"
Requirements management
Services development
Data modeling
Process development
"Registro de servicios"
Configuration management
Code generation

**Testing Tools**
Unit tests
Integration tests
Performance tests
Regression tests
Acceptance tests
Local emulation

**Templates**
Templates
Snippets
Reference application

**Documentation**
Application development guide
Automatic generation
Tests
FAQ
User manuals
Service development
Best practices
"Normativa de documentación"
"Entorno colaborativo"
"Guia de despliegue"

**"Formación**
"Proceso de formación"
"Material de formación"

**Quality Assurance**
"Normativa de calidad"
"Oficina de calidad"
Analysis tools
Continuous integration
"Encuestas nivel calidad"



**Random**
RequireJS
Installation
AngularJS Directives (example from https://gist.github.com/tleunen/5277011)
Try ReactiveMongo
SEO optimization (https://developers.google.com/webmasters/ajax-crawling/docs/html-snapshot and https://prerender.io/)
Move README.md to the site
Write Home Page