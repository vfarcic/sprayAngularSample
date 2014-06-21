package com.technologyconversations.spraySample

import spray.json.DefaultJsonProtocol

case class Book(id: Int, title: String, image: String)

object BookProtocol extends DefaultJsonProtocol {
  implicit val contentFormat = jsonFormat3(Book)
}
