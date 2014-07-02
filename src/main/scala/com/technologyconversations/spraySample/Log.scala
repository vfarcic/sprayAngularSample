package com.technologyconversations.spraySample

import java.io.File

import akka.actor.{Actor, ActorLogging}
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoClient
import com.novus.salat._
import com.novus.salat.global._
import spray.routing.HttpService
import Protocols._
import spray.httpx.SprayJsonSupport._


case class LogDebugMessage(message: String)
case class LogInfoMessage(message: String)
case class LogErrorMessage(message: String)
case class AuditMessage(message: String)

class LogActor extends Actor with ActorLogging {

  val logRegistry = new LogRegistry()

  override def preStart() = {
    log.debug("Started logging")
  }

  override def preRestart(reason: Throwable, message: Option[Any]) = {
    log.error(
      reason,
      s"Restarting due to ${reason.getMessage} when processing ${message.getOrElse("")}"
    )
  }

  def receive = {
    case LogDebugMessage(message)   => log.debug(message)
    case LogInfoMessage(message)    => log.info(message)
    case LogErrorMessage(message)   => log.error(message)
    case auditMessage: AuditMessage => {
      log.info(auditMessage.message)
      logRegistry.logDao.save(auditMessage)
    }
    case _                          => log.error("This message is not supported")
  }

}

trait LogDaoComponent {
  val logDao: LogDao
  class LogDao(settings: Settings) {
    def this() {
      this(new Settings())
    }
    val client = MongoClient(settings.dbHost, settings.dbPort)
    val db = client(settings.dbName)
    val collection = db(settings.dbCollectionAudit)
    def save(auditMessage: AuditMessage): AuditMessage = {
      println("11111111")
      val dbObject = grater[AuditMessage].asDBObject(auditMessage)
      collection.insert(dbObject)
      auditMessage
    }
    def list(): List[AuditMessage] = {
      collection.find().toList.map(grater[AuditMessage].asObject(_))
    }
  }
}

// TODO Test
class LogRegistry extends LogDaoComponent {
  override val logDao = new LogDao
}

trait LogsRouting extends HttpService {

  val logRegistry = new LogRegistry

  val logsRoute = {
    path("logs" / "audit") {
      get {
        complete {
          logRegistry.logDao.list()
        }
      }
    }
  }

}
