package com.technologyconversations.spraySample

import org.specs2.mutable.Specification
import spray.testkit.Specs2RouteTest
import spray.httpx.SprayJsonSupport._
import BookProtocol._
import spray.http._
import StatusCodes._

class RoutingServiceSpec extends Specification with Specs2RouteTest with RoutingService {

  def actorRefFactory = system
  val testBookId = 34
  val testBook = BookOperations.get(testBookId)

  "GET request to /api/v1/books/[BOOK_ID]" should {

    "return a book" in {
      Get("/api/v1/books/" + testBookId) ~> route ~> check {
        status must be equalTo OK
        responseAs[Book] must be equalTo testBook
      }
    }

  }

}
