package com.technologyconversations.spraySample

import com.mongodb.casbah.MongoClient
import com.mongodb.casbah.commons.MongoDBObject
import spray.json._
import spray.routing.HttpService
import spray.httpx.SprayJsonSupport._
import spray.json.DefaultJsonProtocol

trait RoutingGeneral extends HttpService with DefaultJsonProtocol {

  val settings = new Settings()
  val client = MongoClient(settings.dbHost, settings.dbPort)
  val db = client(settings.dbName)

  // TODO If none, return empty json or error
  val generalRoute = {
    pathPrefix("api" / "v1" / "general") {
      path("list" / Segment) { collection =>
        get {
          // TODO Implement params
          // TODO Implement reduced list
          complete {
            db(collection).find().toList.mkString("[", ",", "]")
          }
        }
      } ~ path("get" / Segment / Segments) { (collection, params) =>
        get {
          // TODO Implement version without params
          // TODO Fail is params do not contain colon (:)
          complete {
            val q = params.map { keyValue =>
              val split = keyValue.split(":")
              val value = if (split(1) matches """\d+""") split(1).toInt else split(1)
              split(0) -> value
            }
            db("books").findOne(MongoDBObject(q)).getOrElse("{}").toString
          }
        }
      } ~ path(Segment) { collection =>
        put {
          entity(as[String]) { data =>
            complete {
              println(data)
              db(collection).find().toList.mkString("[", ",", "]")
            }
          }
        }
      }
    }
  }

}
