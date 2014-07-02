package com.technologyconversations.spraySample

import java.io.File

import spray.routing.HttpService
import Protocols._
import spray.httpx.SprayJsonSupport._

trait AssetsRouting extends HttpService {

  val applicationPath = new File("").getAbsolutePath

  val assetsRoute = {
    pathPrefix("assets") {
      getFromDirectory(s"$applicationPath/assets/")
    } ~ pathPrefix("page") {
      getFromFile(s"$applicationPath/assets/html/index.html")
    } ~ path("translation" / Segment) { screen =>
      get {
        complete {
          Message(screen, "NOK")
        }
      }
    } ~ pathSingleSlash {
      getFromFile(s"$applicationPath/assets/html/index.html")
    }
  }

}
