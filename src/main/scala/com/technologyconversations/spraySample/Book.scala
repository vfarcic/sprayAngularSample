package com.technologyconversations.spraySample

import java.io.File

import akka.actor.Props
import com.mongodb.casbah.MongoClient
import com.mongodb.casbah.commons.MongoDBObject
import com.novus.salat._
import com.novus.salat.global._
import com.mongodb.casbah.Imports._
import spray.routing.HttpService
import Protocols._
import spray.httpx.SprayJsonSupport._

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
    def list: List[BookReduced] = {
      collection.find().toList.map(grater[BookReduced].asObject(_))
    }
    def save(book: Book): Book = {
      val query = MongoDBObject("_id" -> book._id)
      val dbObject = grater[Book].asDBObject(book)
      collection.update(query, dbObject, upsert = true)
      book
    }
    def delete(id: Int): Book = {
      val dbObject = collection.findAndRemove(MongoDBObject("_id" -> id))
      grater[Book].asObject(dbObject.getOrElse(DBObject.empty))
    }
    def deleteAll() {
      collection.remove(MongoDBObject.empty)
    }
    def get(id: Int): Book = {
      val dbObject = collection.findOne(MongoDBObject("_id" -> id))
      grater[Book].asObject(dbObject.getOrElse(DBObject.empty))
    }
  }
}

// TODO Test
class BookRegistry extends BookDaoComponent {
  override val bookDao = new BookDao
}

//TODO Test
trait BookRouting extends HttpService {

  implicit def executionContext = actorRefFactory.dispatcher
  val logActor = actorRefFactory.actorOf(Props[LogActor])
  val logActorJava = actorRefFactory.actorOf(Props[LogAkkaJava.LogActorJava])
  val applicationPath = new File("").getAbsolutePath
  val bookRegistry = new BookRegistry
  val auth = new Authentificator(actorRefFactory).basicAuth

  val bookRoute = {
    pathPrefix("api" / "v1" / "books") {
      authenticate(auth) { userName =>
        logActor ! LogMessage(s"$userName has been authenticated")
        logActorJava ! new LogAkkaJava.LogMessageJava(userName + "  has been authenticated")
        path(IntNumber) { id =>
          get {
            complete {
              bookRegistry.bookDao.get(id)
            }
          } ~ delete {
            authorize(hasPermissionsToDeleteBook(userName)) {
              complete {
                bookRegistry.bookDao.delete(id)
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
              bookRegistry.bookDao.list
            }
          } ~ put {
            entity(as[Book]) { book =>
              complete {
                bookRegistry.bookDao.save(book)
              }
            }
          } ~ delete {
            complete {
              bookRegistry.bookDao.deleteAll()
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

  // TODO Change to DB
  def hasPermissionsToDeleteBook(userName: String) = userName == "administrator"

}