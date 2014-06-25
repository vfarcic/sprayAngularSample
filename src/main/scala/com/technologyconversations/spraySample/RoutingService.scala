package com.technologyconversations.spraySample

import java.io.File

import akka.actor.{Props, Actor}
import spray.routing.HttpService
import spray.httpx.SprayJsonSupport._
import BookProtocol._
import spray.routing.authentication.{UserPass, BasicAuth}

import scala.concurrent.Future

class RoutingServiceActor extends Actor with RoutingService {

  def actorRefFactory = context
  def receive = runRoute(route)

}

trait RoutingService extends HttpService {

  implicit def executionContext = actorRefFactory.dispatcher
  val logActor = actorRefFactory.actorOf(Props[LogActor])
  val logActorJava = actorRefFactory.actorOf(Props[LogAkkaJava.LogActorJava])
  val applicationPath = new File("").getAbsolutePath

  val route = {
    pathPrefix("api" / "v1" / "books") {
      authenticate(BasicAuth(myUserPassAuthenticator _, realm = "secure site")) { userName =>
        logActor ! LogMessage(s"$userName has been authenticated")
        logActorJava ! new LogAkkaJava.LogMessageJava(userName + "  has been authenticated")
        path(IntNumber) { id =>
          get {
            complete {
              BookOperations.get(id)
            }
          } ~ delete {
            authorize(hasPermissionsToDeleteBook(userName)) {
              complete {
                BookOperations.delete(id)
              }
            }
          }
        } ~ pathEnd {
          get {
            complete {
              BookOperations.listReduced
            }
          } ~ put {
            entity(as[Book]) { book =>
              complete {
                BookOperations.save(book)
              }
            }
          }
        }
      }
    } ~ pathPrefix("assets") {
      getFromDirectory(s"$applicationPath/assets/")
    }
  }

  def myUserPassAuthenticator(userPass: Option[UserPass]): Future[Option[String]] = Future {
    if (userPass.exists(up => up.user == "administrator3" && up.pass == "welcome")) Some("Administrator")
    else if (userPass.exists(up => up.user == "vfarcic2" && up.pass == "welcome")) Some("Viktor Farcic")
    else None
  }

  def hasPermissionsToDeleteBook(userName: String) = userName == "administrator"

}
