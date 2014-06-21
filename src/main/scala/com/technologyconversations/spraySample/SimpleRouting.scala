package com.technologyconversations.spraySample

import spray.routing.SimpleRoutingApp
import akka.actor.ActorSystem

object SimpleRouting extends App with SimpleRoutingApp {
  implicit val system = ActorSystem("simpleRoutingSystem")

  startServer(interface = "localhost", port = 8080) {
    path("simpleRouting") {
      get {
        complete {
          <h1>This is simple routing GET example</h1>
        }
      } ~
      post {
        complete {
          <h1>This is simple routing POST example</h1>
        }
      }
    } ~
    path("routingWithIntegerParam" / IntNumber) { param1 =>
      get {
        complete {
          s"Routing with integer param $param1 GET example"
        }
      }
    } ~
    path("routingWithPipeOperator") {
      (get | put) { ctx =>
        ctx.complete {
          s"Routing with pipe operator ${ctx.request.method} example"
        }
      }
    } ~
    get {
      complete {
        <h1>This is Catch All example</h1>
      }
    }
  }

}
