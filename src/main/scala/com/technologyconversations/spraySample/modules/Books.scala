package com.technologyconversations.spraySample.modules

import akka.actor.{Actor, ActorLogging, Props}
import akka.pattern.ask
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.commons.MongoDBObject
import com.novus.salat._
import com.novus.salat.global._
import com.technologyconversations.spraySample.{Authenticator, DbSettings, Message}
import spray.httpx.SprayJsonSupport._
import spray.json.DefaultJsonProtocol
import spray.routing.HttpService

//TODO Test
case class BookReduced(_id: Int, title: String, link: String)

//TODO Test
case class Book(_id: Int, image: String, title: String, author: String, price: Double, link: String) {
  require(!title.contains("Voldemort"))
}


// TODO Test
object BooksActor {
  object List
  case class Save(book: Book)
  case class Delete(id: Int)
  object DeleteAll
  case class Get(id: Int)
}
// TODO Test
class BooksActor extends Actor with ActorLogging with DbSettings {
  val collection = db(settings.dbCollectionBooks)
  def receive = {
    case BooksActor.List =>
      sender ! collection.find().toList.map(grater[BookReduced].asObject(_))
    case BooksActor.Save(book) =>
      val query = MongoDBObject("_id" -> book._id)
      val dbObject = grater[Book].asDBObject(book)
      sender ! collection.update(query, dbObject, upsert = true)
    case BooksActor.Delete(id) =>
      sender ! collection.findAndRemove(MongoDBObject("_id" -> id))
    case BooksActor.DeleteAll =>
      sender ! collection.remove(MongoDBObject.empty)
    case BooksActor.Get(id) =>
      val dbObject = collection.findOne(MongoDBObject("_id" -> id))
      sender ! grater[Book].asObject(dbObject.getOrElse(DBObject.empty))
    case _ =>
      log.error("This message is not supported")
  }
}

//TODO Test
trait BooksRouting extends HttpService with DefaultJsonProtocol {

  implicit def booksExecutionContext = actorRefFactory.dispatcher
  val auth = new Authenticator(actorRefFactory).basicAuth
  val booksActor = actorRefFactory.actorOf(Props[BooksActor], "booksActor")
  implicit val booksTimeout = defaultTimeout
  implicit val booksFormat = jsonFormat6(Book)
  implicit val booksReducedFormat = jsonFormat3(BookReduced)
  implicit val booksMessageFormat = jsonFormat2(Message)


  val bookRoute = {
    pathPrefix("api" / "v1" / "books") {
      authenticate(auth) { userName =>
        path(IntNumber) { id =>
          get {
            onSuccess(booksActor ? BooksActor.Get(id)) { extraction =>
              complete(extraction.asInstanceOf[Book])
            }
          } ~ delete {
            authorize(hasPermissionsToDeleteBook(userName)) {
              onSuccess(booksActor ? BooksActor.Delete(id)) { extraction =>
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
            onSuccess(booksActor ? BooksActor.List) { extraction =>
              complete(extraction.asInstanceOf[List[BookReduced]])
            }
          } ~ put {
            entity(as[Book]) { book =>
              onSuccess(booksActor ? BooksActor.Save(book)) { extraction =>
                complete(extraction.toString)
              }
            }
          } ~ delete {
            onSuccess(booksActor ? BooksActor.DeleteAll) { extraction =>
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