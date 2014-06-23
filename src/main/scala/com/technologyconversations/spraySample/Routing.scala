package com.technologyconversations.spraySample

import akka.actor.{Props, ActorSystem}
import akka.io.IO
import spray.can.Http

object Routing extends App {

  implicit val system = ActorSystem("routingSystem")

  val service = system.actorOf(Props[RoutingServiceActor], "routingService")

  IO(Http) ! Http.Bind(service, "localhost", port = 8080)

}
