package com.technologyconversations.spraySample.modules

import java.io.File

import com.technologyconversations.spraySample.Message
import spray.json.DefaultJsonProtocol
import spray.routing.HttpService

trait AssetsRouting extends HttpService with DefaultJsonProtocol {

  val applicationPath = new File("").getAbsolutePath
  implicit val assetsMessageFormat = jsonFormat2(Message)

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
