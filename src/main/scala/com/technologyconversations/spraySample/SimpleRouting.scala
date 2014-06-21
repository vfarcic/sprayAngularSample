package com.technologyconversations.spraySample

import spray.routing._
import akka.actor.ActorSystem
import spray.httpx.SprayJsonSupport._
import spray.json._

import BookProtocol._

object SimpleRouting extends App with SimpleRoutingApp {
  implicit val system = ActorSystem("simpleRoutingSystem")

  startServer(interface = "localhost", port = 8080) {
    path("json") {
      get {
        complete {
//          val source = """{ "some": "JSON source" }"""
//          println(source)
//          val jsonAst = source.parseJson // or JsonParser(source)
//          println(jsonAst.prettyPrint)

//          val json = Book(123, "My Book", "My Image").toJson
//          println(json)
//          val book = json.convertTo[Book]
//          println(book)

          Book(123, "My Book", "My Image")
        }
      }
    } ~
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
