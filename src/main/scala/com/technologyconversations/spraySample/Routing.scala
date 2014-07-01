package com.technologyconversations.spraySample

import akka.actor.{Actor, Props, ActorSystem}
import akka.io.IO
import spray.can.Http
import spray.http.StatusCodes._
import spray.json.DefaultJsonProtocol
import spray.routing.ExceptionHandler
import Protocols._
import spray.httpx.SprayJsonSupport._

object Routing extends App {
  implicit val system = ActorSystem("routingSystem")
  val service = system.actorOf(Props[RoutingServiceActor], "routingService")
  IO(Http) ! Http.Bind(service, "localhost", port = 8080)
}

class RoutingServiceActor extends Actor with BookRouting with AssetsRouting with LogsRouting {

  def actorRefFactory = context
  def receive = runRoute(
    handleExceptions(routingExceptionHandler)
      (assetsRoute ~ logsRoute ~ bookRoute)
  )
  implicit def routingExceptionHandler() = ExceptionHandler {
    case e: ArithmeticException => requestUri { uri =>
      complete(BadRequest, Message(s"Request $uri was NOT completed", "NOK"))
    }
  }
}
