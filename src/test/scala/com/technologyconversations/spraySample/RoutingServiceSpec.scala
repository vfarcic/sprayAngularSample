package com.technologyconversations.spraySample

import org.specs2.mutable.{Before, Specification}
import spray.routing.AuthenticationFailedRejection
import org.specs2.mock._
import spray.testkit.Specs2RouteTest
import spray.httpx.SprayJsonSupport._
import BookProtocol._
import spray.http._

class RoutingServiceSpec extends Specification with Specs2RouteTest with RoutingService with Mockito {

  def actorRefFactory = system
  val testBookId = BookOperations.listReduced(0).id
  val testBook = BookOperations.get(testBookId).get
  val validCredentials = BasicHttpCredentials("administrator", "welcome")

  "Authentication" should {

    "return unauthorized status when credentials are not provided" in {
      Get("/api/v1/books") ~> route ~> check {
        handled must beFalse
        rejection must beAnInstanceOf[AuthenticationFailedRejection]
      }
    }

    "return unauthorized status when invalid credentials are provided" in {
      val invalidCredentials = BasicHttpCredentials("invalid", "credentials")
      Get("/api/v1/books") ~> addCredentials(invalidCredentials) ~> route ~> check {
        handled must beFalse
        rejection must beAnInstanceOf[AuthenticationFailedRejection]
      }
    }

    "return OK status when valid credentials are provided" in {
      Get("/api/v1/books") ~> addCredentials(validCredentials) ~> route ~> check {
        status must be equalTo StatusCodes.OK
      }
    }

    "applies to all /api/v1/books routes" in {
      Get("/api/v1/books") ~> route ~> check {
        handled must beFalse
        rejection must beAnInstanceOf[AuthenticationFailedRejection]
      }
      Get("/assets/html/index.html") ~> route ~> check {
        handled must beTrue
        status must be equalTo StatusCodes.OK
      }
    }

  }

  "GET request to /api/v1/books/[BOOK_ID]" should {

    "return the book" in {
      Get("/api/v1/books/" + testBookId) ~> addCredentials(validCredentials) ~> route ~> check {
        status must be equalTo StatusCodes.OK
        responseAs[Book] must be equalTo testBook
      }
    }

  }

  "DELETE request to /api/v1/books/[BOOK_ID]" should {

    val bookToDelete = Book(12345, "Test image", "Test title", "Test author", 123.45, "Test link")

    "return the book" in {
      BookOperations.save(bookToDelete)
      Delete("/api/v1/books/" + bookToDelete.id) ~> addCredentials(validCredentials) ~> route ~> check {
        status must be equalTo StatusCodes.OK
        responseAs[Book] must be equalTo bookToDelete
      }
    }

    "delete the book" in {
      BookOperations.save(bookToDelete)
      Delete("/api/v1/books/" + bookToDelete.id) ~> addCredentials(validCredentials) ~> route ~> check {
        status must be equalTo StatusCodes.OK
        BookOperations.get(bookToDelete.id) must be equalTo Option.empty
      }
    }

    "reject non-authorized users" in {
      val validNonAuthorizedCredentials = BasicHttpCredentials("john", "doe")
      Delete("/api/v1/books/" + bookToDelete.id) ~> addCredentials(validNonAuthorizedCredentials) ~> route ~> check {
        handled must beFalse
      }
    }

  }

  "GET request to /api/v1/books" should {

    "return the reduced list of books" in {
      Get("/api/v1/books") ~> addCredentials(validCredentials) ~> route ~> check {
        status must be equalTo StatusCodes.OK
        responseAs[List[BookReduced]] must beAnInstanceOf[List[BookReduced]]
      }
    }

  }

  "PUT request to /api/v1/books" should {

    "return the book" in new beforePut {
      Put("/api/v1/books", bookToPut) ~> addCredentials(validCredentials) ~> route ~> check {
        status must be equalTo StatusCodes.OK
        responseAs[Book] must be equalTo bookToPut
      }
    }

    "save new book" in new beforePut {
      Put("/api/v1/books", bookToPut) ~> addCredentials(validCredentials) ~> route ~> check {
        status must be equalTo StatusCodes.OK
        BookOperations.get(bookToPut.id).get must be equalTo bookToPut
      }
    }

    "update existing book" in new beforePut {
      BookOperations.save(bookToPut)
      val modifiedBookToPut = bookToPut.copy(title = "This is modified title")
      Put("/api/v1/books", modifiedBookToPut) ~> addCredentials(validCredentials) ~> route ~> check {
        status must be equalTo StatusCodes.OK
        BookOperations.get(modifiedBookToPut.id).get must be equalTo modifiedBookToPut
      }
    }

    trait beforePut extends Before {
      val bookToPut = Book(12345, "Test image", "Test title", "Test author", 123.45, "Test link")
      def before = {
        BookOperations.delete(bookToPut.id)
      }
    }

  }

}
