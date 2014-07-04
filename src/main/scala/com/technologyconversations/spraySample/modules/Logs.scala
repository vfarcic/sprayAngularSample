package com.technologyconversations.spraySample.modules

import akka.actor.{Actor, ActorLogging, Props}
import akka.pattern.ask
import com.novus.salat._
import com.novus.salat.global._
import com.technologyconversations.spraySample.DbSettings
import spray.json.DefaultJsonProtocol
import spray.routing.HttpService
import spray.httpx.SprayJsonSupport._
import com.mongodb.casbah.Imports._

case class AuditMessage(message: String, date: Long = System.currentTimeMillis())

case class LogDebugMessage(message: String)
case class LogInfoMessage(message: String)
case class LogErrorMessage(message: String)
case class AuditMessageSave(message: AuditMessage)
object AuditMessageList

class LogActor extends Actor with ActorLogging with DbSettings {

  override def preStart() = {
    log.debug("Started logging")
  }

  override def preRestart(reason: Throwable, message: Option[Any]) = {
    log.error(
      reason,
      s"Restarting due to ${reason.getMessage} when processing ${message.getOrElse("")}"
    )
  }

  val collection = db(settings.dbCollectionAudit)

  def receive = {
    case LogDebugMessage(message)   => log.debug(message)
    case LogInfoMessage(message)    => log.info(message)
    case LogErrorMessage(message)   => log.error(message)
    case AuditMessageSave(message)  =>
      log.info(message.message)
      val dbObject = grater[AuditMessage].asDBObject(message)
      sender ! collection.insert(dbObject)
    case AuditMessageList           =>
      sender ! collection.find().toList.map(grater[AuditMessage].asObject(_))
    case _                          => log.error("This message is not supported")
  }

}

trait LogsRouting extends HttpService with DefaultJsonProtocol {

  val logActor = actorRefFactory.actorOf(Props[LogActor])
  implicit def logsExecutionContext = actorRefFactory.dispatcher
  implicit val logsTimeout = defaultTimeout
  implicit val auditMessage = jsonFormat2(AuditMessage)

  val logsRoute = {
    path("logs" / "audit") {
      get {
        onSuccess(logActor ? AuditMessageList) { extraction =>
          complete {
            extraction.asInstanceOf[List[AuditMessage]]
          }
        }
      }
    }
  }

}
