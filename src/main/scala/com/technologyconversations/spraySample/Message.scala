package com.technologyconversations.spraySample

import spray.json.DefaultJsonProtocol

// TODO Test
case class Message(message: String, status: String)

// TODO Test
object MessageProtocols extends DefaultJsonProtocol {
  implicit val messageFormat = jsonFormat2(Message)
}
