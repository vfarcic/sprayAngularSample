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
class RoutingServiceActor extends Actor with BookRouting {

  def actorRefFactory = context
  def receive = runRoute(handleExceptions(routingExceptionHandler)(bookRoute))
  implicit def routingExceptionHandler() = ExceptionHandler {
    case e: ArithmeticException => requestUri { uri =>
      complete(BadRequest, Message(s"Request $uri was NOT completed", "NOK"))
    }
  }
}