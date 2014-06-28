package com.technologyconversations.spraySample

import spray.json.DefaultJsonProtocol
import scala.slick.driver.H2Driver.simple._

case class BookReduced(id: Int, title: String, link: String)

case class Book(id: Int, image: String, title: String, author: String, price: Double, link: String)

object BookProtocol extends DefaultJsonProtocol {
  implicit val bookFormat = jsonFormat6(Book)
  implicit val bookReducedFormat = jsonFormat3(BookReduced)
}

object BookOperations {

  var booksMap: Map[Int, Book] = 10.to(99).map { n =>
    n -> Book(n, s"image$n", s"title$n", s"author$n", n.toDouble, s"/api/v1/books/$n")
  }.toMap

  def list: List[Book] = {
    booksMap.values.toList.sortWith(_.title < _.title)
  }

  def listReduced: List[BookReduced] = {
    list.map(book => BookReduced(book.id, book.title, book.link))
  }

  def save(book: Book) = {
    booksMap = booksMap + (book.id -> book)
    book
  }

  def delete(id: Int): Option[Book] = {
    val book = booksMap.get(id)
    booksMap -= id
    book
  }

  def deleteAll {
    booksMap = Map()
  }

  def get(id: Int): Option[Book] = {
    booksMap.get(id)
  }

}
