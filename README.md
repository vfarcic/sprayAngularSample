Spray & Angular sample
======================

TODO
----

Skip creating Scala object in some Book cases


Prerequisites
-------------

### Back-end

**Scala**
**Play**
**SBT**

### Front-end

**[NodeJS with NPM](http://nodejs.org/)**

**[Grunt](http://gruntjs.com/)**

```bash
npm install -g grunt-cli
```


Dependencies
------------

Front-end dependencies can be installed by running following

```bash
cd assets
npm install
```

Running
-------

Make sure that MongoDB is up and running on localhost on port 27017.

To run the application execute:

```bash
sbt run
```

Application can be run in "triggered restart" mode.
Your application starts up and SBT watches for changes in your source (or resource) files.
If a change is detected SBT recompiles the required classes and sbt-revolver automatically restarts your application.
When you press <ENTER> SBT leaves "triggered restart" and returns to the normal prompt keeping your application running.

```bash
sbt ~re-start
```


Unit Tests
----------

Front-end unit testing

```bash
cd public
npm test
```

Presentation (AngularJS & Bootstrap CSS)
----------------------------------------

### [Navigation](http://localhost:8080/)

Navigation bar on top that adapts to the size of the screen

[menu.tmpl.html]
```html
<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav">
        <li><a href="/page/books">Books</a></li>
        <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Themes <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
                <li ng-repeat="theme in themes"><a href="#" ng-click="changeTheme(theme.css)">{{theme.title}}</a></li>
                <li class="divider"></li>
                <li><a href="http://bootswatch.com/">Bootswatch (free)</a></li>
                <li><a href="https://wrapbootstrap.com/">{wrap}bootstrap (paid)</a></li>
            </ul>
        </li>
    </ul>
</div>
```

**TODO Navigation map (routeProvider)**

### [Validation](http://localhost:8080/page/books)

Required (i.e. priece), pattern (i.e. price), disabled (i.e. Save)...

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
```
  ...
  } ~ path("exception") {
    complete {
      throw new ArithmeticException
      Message("Request completed", "OK")
    }
    ...
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
Revolver
Paths (including root)
[Akka Cluster](http://doc.akka.io/docs/akka/snapshot/scala/cluster-usage.html) & [Spray Cluster](https://github.com/ograycode/akka-spray-cluster-example)
Bower
