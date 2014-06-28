Spray & Angular sample
======================

Running
-------

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


TODO
----

**Presentation**
Office export
Signing
Visual components
Accessibility
Graphics

**Desktop presentation**
Sessions management
Remote control
Search
Collaboration
Notifications
Alarms

**Services**
Workflow motor
Batch
Reports
BAM
Rules engine
Services composition

**Data and Backend**
Persistence
Email server
SMS Service
Documents management

**Integration**
Web Services
Messaging
Service Bus
Routing

**Transversal Services**
Security
Properties management
Internationalization
Exceptions management
"Trazas"
Logging
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