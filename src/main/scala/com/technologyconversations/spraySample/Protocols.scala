package com.technologyconversations.spraySample

import spray.json.DefaultJsonProtocol

object Protocols extends DefaultJsonProtocol {
  implicit val bookFormat = jsonFormat6(Book)
  implicit val bookReducedFormat = jsonFormat3(BookReduced)
  implicit val messageFormat = jsonFormat2(Message)
  implicit val auditMessage = jsonFormat2(AuditMessage)
}
