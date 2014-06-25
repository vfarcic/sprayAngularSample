package com.technologyconversations.spraySample

import org.specs2.mutable.{Before, Specification}

class BookSpec extends Specification {

  "BookOperations#list" should {

    "return an instance of List[Book]" in new beforeTests() {
      val books = BookOperations.list
      books must beAnInstanceOf[List[Book]]
      books.head must beAnInstanceOf[Book]
    }

    "return all books" in new beforeTests() {
      val books = BookOperations.list
      books must haveSize(mockedBooks.size)
      books must be equalTo mockedBooks
    }

  }

  "BookOperations#listReduced" should {

    "return an instance of List[BookReduced]" in new beforeTests() {
      val books = BookOperations.listReduced
      books must beAnInstanceOf[List[BookReduced]]
      books.head must beAnInstanceOf[BookReduced]
    }

    "return all books" in new beforeTests() {
      val books = BookOperations.list
      books must haveSize(mockedBooks.size)
    }

  }

  "BookOperations#save" should {

    "return an instance of Book" in new beforeTests() {
      BookOperations.save(mockedBook1) must beAnInstanceOf[Book]
    }

    "insert book when new" in new beforeTests() {
      val newBook = Book(123, "new image", "new title", "new author", 123, "new link")
      val expectedSize = BookOperations.list.size + 1
      BookOperations.save(newBook)
      BookOperations.list must haveSize(expectedSize)
      BookOperations.get(newBook.id).get must be equalTo newBook
    }

    "update book when existing" in new beforeTests() {
      val updatedBook = mockedBook1.copy(title = "updated title")
      val expectedSize = BookOperations.list.size
      BookOperations.save(updatedBook)
      BookOperations.get(updatedBook.id) must be equalTo Option(updatedBook)
      BookOperations.list must haveSize(expectedSize)
    }

  }

  "BookOperations#delete" should {

    "return an instance of Book" in new beforeTests() {
      BookOperations.delete(mockedBook1.id) must beAnInstanceOf[Option[Book]]
    }

    "return deleted book" in new beforeTests() {
      BookOperations.delete(mockedBook1.id).get must be equalTo mockedBook1
    }

    "delete book" in new beforeTests() {
      val expectedSize = BookOperations.list.size - 1
      BookOperations.delete(mockedBook1.id)
      BookOperations.list must haveSize(expectedSize)
      BookOperations.get(mockedBook1.id) must be equalTo None
    }

    "return None when book does NOT exist" in new beforeTests() {
      BookOperations.delete(12345) must be equalTo None
    }

  }

  "BookOperations#deleteAll" should {

    "delete all books" in new beforeTests() {
      BookOperations.deleteAll
      BookOperations.list must have size 0
    }

  }

  trait beforeTests extends Before {
    val mockedBook1 = Book(1, "image 1", "title 1", "author 1", 123.45, "link 1")
    val mockedBook2 = Book(2, "image 2", "title 2", "author 2", 543.21, "link 2")
    val mockedBooks = List(mockedBook1, mockedBook2)
    val bookOperations = BookOperations
    def before = {
      BookOperations.deleteAll
      BookOperations.save(mockedBooks(0))
      BookOperations.save(mockedBooks(1))
    }
  }


}
