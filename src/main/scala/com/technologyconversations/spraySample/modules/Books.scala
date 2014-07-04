package com.technologyconversations.spraySample.modules

import akka.actor.{Actor, ActorLogging, Props}
import akka.pattern.ask
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.commons.MongoDBObject
import com.novus.salat._
import com.novus.salat.global._
import com.technologyconversations.spraySample.{Authentificator, DbSettings, Message}
import spray.httpx.SprayJsonSupport._
import spray.json.DefaultJsonProtocol
import spray.routing.HttpService

//TODO Test
case class BookReduced(_id: Int, title: String, link: String)

//TODO Test
case class Book(_id: Int, image: String, title: String, author: String, price: Double, link: String) {
  require(!title.contains("Voldemort"))
}

object BooksList
case class BooksSave(book: Book)
case class BooksDelete(id: Int)
object BooksDeleteAll
case class BooksGet(id: Int)
class BooksActor extends Actor with ActorLogging with DbSettings {
  val collection = db(settings.dbCollectionBooks)
  def receive = {
    case BooksList =>
      sender ! collection.find().toList.map(grater[BookReduced].asObject(_))
    case BooksSave(book) =>
      val query = MongoDBObject("_id" -> book._id)
      val dbObject = grater[Book].asDBObject(book)
      sender ! collection.update(query, dbObject, upsert = true)
    case BooksDelete(id) =>
      sender ! collection.findAndRemove(MongoDBObject("_id" -> id))
    case BooksDeleteAll =>
      sender ! collection.remove(MongoDBObject.empty)
    case BooksGet(id) =>
      val dbObject = collection.findOne(MongoDBObject("_id" -> id))
      sender ! grater[Book].asObject(dbObject.getOrElse(DBObject.empty))

  }
}

//TODO Test
trait BooksRouting extends HttpService with DefaultJsonProtocol {

  implicit def booksExecutionContext = actorRefFactory.dispatcher
  val auth = new Authentificator(actorRefFactory).basicAuth
  val logBookActor = actorRefFactory.actorOf(Props[LogActor])
  val booksActor = actorRefFactory.actorOf(Props[BooksActor])
  implicit val booksTimeout = defaultTimeout
  implicit val booksFormat = jsonFormat6(Book)
  implicit val booksReducedFormat = jsonFormat3(BookReduced)
  implicit val booksMessageFormat = jsonFormat2(Message)


  val bookRoute = {
    pathPrefix("api" / "v1" / "books") {
      authenticate(auth) { userName =>
        path(IntNumber) { id =>
          get {
            onSuccess(booksActor ? BooksGet(id)) { extraction =>
              complete(extraction.asInstanceOf[Book])
            }
          } ~ delete {
            authorize(hasPermissionsToDeleteBook(userName)) {
              onSuccess(booksActor ? BooksDelete(id)) { extraction =>
                complete(extraction.toString)
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
            onSuccess(booksActor ? BooksList) { extraction =>
              complete(extraction.asInstanceOf[List[BookReduced]])
            }
          } ~ put {
            entity(as[Book]) { book =>
              onSuccess(booksActor ? BooksSave(book)) { extraction =>
                complete(extraction.toString)
              }
            }
          } ~ delete {
            onSuccess(booksActor ? BooksDeleteAll) { extraction =>
              complete(extraction.toString)
            }
          }
        }
      }
    }
  }

  // TODO Change to DB
  def hasPermissionsToDeleteBook(userName: String) = userName == "administrator"

}