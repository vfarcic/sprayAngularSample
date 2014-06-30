package com.technologyconversations.spraySample

import com.mongodb.casbah.MongoClient
import com.mongodb.casbah.commons.MongoDBObject
import com.technologyconversations.spraySample.MessageProtocol._
import com.typesafe.config.{Config, ConfigFactory}
import spray.json.DefaultJsonProtocol
import com.novus.salat._
import com.novus.salat.global._
import com.mongodb.casbah.Imports._

//TODO Test
case class BookReduced(_id: Int, title: String, link: String)

//TODO Test
case class Book(_id: Int, image: String, title: String, author: String, price: Double, link: String)

// TODO Test
trait BookDaoComponent {
  val bookDao: BookDao
  class BookDao(settings: Settings) {
    def this() {
      this(new Settings())
    }
    val client = MongoClient(settings.dbHost, settings.dbPort)
    val db = client(settings.dbName)
    val collection = db(settings.dbCollectionBooks)
    def list: List[DBObject] = {
      collection.find().toList
    }
    def save(book: DBObject) = {
      val query = MongoDBObject("_id" -> book.get("_id"))
      collection.update(query, book, upsert = true)
    }
    def delete(id: Int): Option[DBObject] = {
      collection.findAndRemove(MongoDBObject("_id" -> id))
    }
    def deleteAll() {
      collection.remove(MongoDBObject.empty)
    }
    def get(id: Int): Option[DBObject] = {
      collection.findOne(MongoDBObject("_id" -> id))
    }
  }
}

// TODO Test
trait BookServiceComponent { this: BookDaoComponent =>
  val bookService: BookService
  class BookService {
    def list: List[BookReduced] = {
      bookDao.list.map(grater[BookReduced].asObject(_))
    }
    def save(book: Book): Book = {
      bookDao.save(grater[Book].asDBObject(book))
      book
    }
    def delete(id: Int): Book = {
      grater[Book].asObject(bookDao.delete(id).getOrElse(DBObject.empty))
    }
    def deleteAll() {
      bookDao.deleteAll()
    }
    def get(id: Int): Book = {
      grater[Book].asObject(bookDao.get(id).getOrElse(DBObject.empty))
    }
  }
}

// TODO Test
class BookRegistry extends BookDaoComponent with BookServiceComponent {
  override val bookDao = new BookDao
  override val bookService = new BookService
}