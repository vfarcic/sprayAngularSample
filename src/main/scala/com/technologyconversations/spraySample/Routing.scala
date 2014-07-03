package com.technologyconversations.spraySample

import akka.actor.{Actor, Props, ActorSystem}
import akka.io.IO
import spray.can.Http
import spray.http.StatusCodes._
import spray.routing.ExceptionHandler
import Protocols._
import spray.httpx.SprayJsonSupport._

// TODO Test
object Routing extends App {
  implicit val system = ActorSystem("routingSystem")
  val service = system.actorOf(Props[RoutingGeneralServiceActor], "routingService")
  IO(Http) ! Http.Bind(service, "localhost", port = 8080)
}

// TODO Test
class RoutingGeneralServiceActor extends Actor with BookRouting with AssetsRouting with LogsRouting {

  def actorRefFactory = context
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
