package com.technologyconversations.spraySample

import akka.actor.{Actor, Props, ActorSystem}
import akka.io.IO
import spray.can.Http
import spray.http.StatusCodes._
import spray.json.DefaultJsonProtocol
import spray.routing.ExceptionHandler
import spray.httpx.SprayJsonSupport._

// TODO Test
object Routing extends App {
  implicit val system = ActorSystem("routingSystem")
  val service = system.actorOf(Props[RoutingGeneralServiceActor], "routingService")
  IO(Http) ! Http.Bind(service, "localhost", port = 8080)
}

// TODO Test
class RoutingGeneralServiceActor extends Actor
  with DefaultJsonProtocol with BooksRouting with AssetsRouting with LogsRouting {

  def actorRefFactory = context
  implicit val routingMessageFormat = jsonFormat2(Message)
  def receive = runRoute(
    handleExceptions(routingExceptionHandler)
      (assetsRoute ~ logsRoute ~ bookRoute)
  )
  implicit def routingExceptionHandler() = ExceptionHandler {
    case e: IllegalArgumentException => requestUri { uri =>
      complete(BadRequest, Message(s"Request $uri was NOT completed", "NOK"))
    }
    case e: ArithmeticException => requestUri { uri =>
      complete(BadRequest, Message(s"Request $uri was NOT completed", "NOK"))
    }
  }
}
