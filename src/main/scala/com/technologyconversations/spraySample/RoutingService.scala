package com.technologyconversations.spraySample

import java.io.File

import akka.actor.{Props, Actor}
import spray.routing.{ExceptionHandler, HttpService}
import spray.httpx.SprayJsonSupport._
import Protocols._
import spray.routing.authentication.{UserPass, BasicAuth}
import spray.http.StatusCodes._

import scala.concurrent.Future

//TODO Test
class RoutingServiceActor extends Actor with RoutingService {

  def actorRefFactory = context
  def receive = runRoute(handleExceptions(routingExceptionHandler)(route))
  implicit def routingExceptionHandler() = ExceptionHandler {
    case e: ArithmeticException => requestUri { uri =>
      complete(BadRequest, Message(s"Request $uri was NOT completed", "NOK"))
    }
  }
}

//TODO Test
trait RoutingService extends HttpService {

  implicit def executionContext = actorRefFactory.dispatcher
  val logActor = actorRefFactory.actorOf(Props[LogActor])
  val logActorJava = actorRefFactory.actorOf(Props[LogAkkaJava.LogActorJava])
  val applicationPath = new File("").getAbsolutePath
  val bookRegistry = new BookRegistry

  val route = {
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
            println("333")
            throw new ArithmeticException
            println("444")
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