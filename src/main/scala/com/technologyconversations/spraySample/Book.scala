package com.technologyconversations.spraySample

import java.io.File

import akka.actor.Props
import com.mongodb.casbah.MongoClient
import com.mongodb.casbah.commons.MongoDBObject
import com.technologyconversations.spraySample.MessageProtocol._
import com.typesafe.config.{Config, ConfigFactory}
import spray.json.DefaultJsonProtocol
import com.novus.salat._
import com.novus.salat.global._
import com.mongodb.casbah.Imports._
import spray.routing.HttpService
import spray.routing.PathMatchers.IntNumber
import spray.routing.authentication.{UserPass, BasicAuth}

import scala.concurrent.Future

//TODO Test
case class BookReduced(_id: Int, title: String, link: String)

//TODO Test
case class Book(_id: Int, image: String, title: String, author: String, price: Double, link: String)

// TODO Test
trait BookDaoComponent {
  val bookDao: BookDao
  class BookDao(settings: Settings) {
    def this() {
      this(new Settings())
    }
    val client = MongoClient(settings.dbHost, settings.dbPort)
    val db = client(settings.dbName)
    val collection = db(settings.dbCollectionBooks)
    def list: List[DBObject] = {
      collection.find().toList
    }
    def save(book: DBObject) = {
      val query = MongoDBObject("_id" -> book.get("_id"))
      collection.update(query, book, upsert = true)
    }
    def delete(id: Int): Option[DBObject] = {
      collection.findAndRemove(MongoDBObject("_id" -> id))
    }
    def deleteAll() {
      collection.remove(MongoDBObject.empty)
    }
    def get(id: Int): Option[DBObject] = {
      collection.findOne(MongoDBObject("_id" -> id))
    }
  }
}

// TODO Test
trait BookServiceComponent { this: BookDaoComponent =>
  val bookService: BookService
  class BookService {
    def list: List[BookReduced] = {
      bookDao.list.map(grater[BookReduced].asObject(_))
    }
    def save(book: Book): Book = {
      bookDao.save(grater[Book].asDBObject(book))
      book
    }
    def delete(id: Int): Book = {
      grater[Book].asObject(bookDao.delete(id).getOrElse(DBObject.empty))
    }
    def deleteAll() {
      bookDao.deleteAll()
    }
    def get(id: Int): Book = {
      grater[Book].asObject(bookDao.get(id).getOrElse(DBObject.empty))
    }
  }
}

// TODO Test
class BookRegistry extends BookDaoComponent with BookServiceComponent {
  override val bookDao = new BookDao
  override val bookService = new BookService
}

//TODO Test
trait BookRouting extends HttpService {

  implicit def executionContext = actorRefFactory.dispatcher
  val logActor = actorRefFactory.actorOf(Props[LogActor])
  val logActorJava = actorRefFactory.actorOf(Props[LogAkkaJava.LogActorJava])
  val applicationPath = new File("").getAbsolutePath
  val bookRegistry = new BookRegistry

  val bookRoute = {
    pathPrefix("api" / "v1" / "books") {
      authenticate(BasicAuth(userPassAuthenticator _, realm = "secure site")) { userName =>
        logActor ! LogMessage(s"$userName has been authenticated")
        logActorJava ! new LogAkkaJava.LogMessageJava(userName + "  has been authenticated")
        path(IntNumber) { id =>
          get {
            complete {
              bookRegistry.bookService.get(id)
            }
          } ~ delete {
            authorize(hasPermissionsToDeleteBook(userName)) {
              complete {
                bookRegistry.bookService.delete(id)
              }
            }
          }
        } ~ path("exception") {
          complete {
            throw new ArithmeticException
            Message("Request completed", "OK")
          }
        } ~ pathEnd {
          get {
            complete {
              bookRegistry.bookService.list
            }
          } ~ put {
            entity(as[Book]) { book =>
              complete {
                bookRegistry.bookService.save(book)
              }
            }
          } ~ delete {
            complete {
              bookRegistry.bookService.deleteAll()
              List[Book]()
            }
          }
        }
      }
    } ~ pathPrefix("assets") {
      getFromDirectory(s"$applicationPath/assets/")
    } ~ pathPrefix("page") {
      getFromFile(s"$applicationPath/assets/html/index.html")
    } ~ pathSingleSlash {
      getFromFile(s"$applicationPath/assets/html/index.html")
    }
  }

  // TODO Switch to DB
  def userPassAuthenticator(userPass: Option[UserPass]): Future[Option[String]] = Future {
    if (userPass.exists(up => up.user == "administrator" && up.pass == "welcome")) Some("administrator")
    else if (userPass.exists(up => up.user == "john" && up.pass == "doe")) Some("john")
    else None
  }

  def hasPermissionsToDeleteBook(userName: String) = userName == "administrator"

}