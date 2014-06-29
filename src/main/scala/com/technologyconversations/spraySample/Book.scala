package com.technologyconversations.spraySample

import com.mongodb.casbah.MongoClient
import com.mongodb.casbah.commons.MongoDBObject
import spray.json.DefaultJsonProtocol
import com.novus.salat._
import com.novus.salat.annotations._
import com.novus.salat.global._

//TODO Test
case class BookReduced(id: Int, title: String, link: String)

//TODO Test
case class Book(id: Int, image: String, title: String, author: String, price: Double, link: String)

//TODO Test
object BookProtocol extends DefaultJsonProtocol {
  implicit val bookFormat = jsonFormat6(Book)
  implicit val bookReducedFormat = jsonFormat3(BookReduced)
}

//TODO Test
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

// TODO Test
trait BookDaoComponent {
  val bookDao: BookDao
  class BookDao {
    val client = MongoClient("localhost", 27017)
    val db = client("sprayAngularSample")
    val collection = db("books")
    def save(book: Book): Book = {
      val dbBook = grater[Book].asDBObject(book)
      val query = MongoDBObject("id" -> book.id)
      collection.update(query, dbBook, upsert = true)
      book
    }
  }
}

// TODO Test
class BookRegistry extends BookDaoComponent {
  override val bookDao = new BookDao
}