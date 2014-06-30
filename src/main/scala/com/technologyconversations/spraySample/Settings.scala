package com.technologyconversations.spraySample

import com.typesafe.config.{ConfigFactory, Config}

// TODO Test
class Settings(config: Config) {
  config.checkValid(ConfigFactory.defaultReference(), "sample-app")
  def this() {
    this(ConfigFactory.load())
  }
  val dbHost = config.getString("sample-app.db.host")
  val dbPort = config.getInt("sample-app.db.port")
  val dbName = config.getString("sample-app.db.name")
  val dbCollectionBooks = config.getString("sample-app.db.collections.books")
}

