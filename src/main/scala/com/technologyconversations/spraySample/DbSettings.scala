package com.technologyconversations.spraySample

import akka.util.Timeout
import com.mongodb.casbah.MongoClient
import scala.concurrent.duration._

trait DbSettings {
  val settings = new Settings()
  val client = MongoClient(settings.dbHost, settings.dbPort)
  val db = client(settings.dbName)
  implicit val timeout = Timeout(5 seconds)
}
