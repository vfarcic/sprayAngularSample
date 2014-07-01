package com.technologyconversations.spraySample

import java.io.File

import spray.routing.HttpService

trait AssetsRouting extends HttpService {

  val applicationPath = new File("").getAbsolutePath

  val assetsRoute = {
    pathPrefix("assets") {
      getFromDirectory(s"$applicationPath/assets/")
    } ~ pathPrefix("page") {
      getFromFile(s"$applicationPath/assets/html/index.html")
    } ~ pathSingleSlash {
      getFromFile(s"$applicationPath/assets/html/index.html")
    }
  }

}
