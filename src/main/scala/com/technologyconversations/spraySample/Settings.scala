package com.technologyconversations.spraySample

import akka.actor.{ExtendedActorSystem, ExtensionIdProvider, ExtensionId, Extension}
import akka.util.Timeout
import com.mongodb.casbah.MongoClient
import com.typesafe.config.Config
import scala.concurrent.duration._

// TODO Test
class SettingsImpl(config: Config) extends Extension {
  val dbHost = config.getString("sample-app.db.host")
  val dbPort = config.getInt("sample-app.db.port")
  val dbName = config.getString("sample-app.db.name")
  val dbCollectionBooks = config.getString("sample-app.db.collections.books")
  val dbCollectionAudit = config.getString("sample-app.db.collections.audit")
  val client = MongoClient(dbHost, dbPort)
  val db = client(dbName)
  implicit val timeout = Timeout(5 seconds)
}

// TODO Test
object Settings extends ExtensionId[SettingsImpl] with ExtensionIdProvider {
  override def lookup = Settings
  override def createExtension(system: ExtendedActorSystem) = {
    new SettingsImpl(system.settings.config)
  }
}

