package com.technologyconversations.spraySample

import akka.actor.SupervisorStrategy._
import akka.actor.{Props, ActorLogging, OneForOneStrategy, Actor}
import com.mongodb.MongoTimeoutException
import scala.concurrent.duration._

class DbSupervisor extends Actor with ActorLogging {

  override val supervisorStrategy = OneForOneStrategy(maxNrOfRetries = 10, withinTimeRange = 1 minute) {
    case e: MongoTimeoutException =>
      log.error(e, "Something terrible happened!!!!!!!!!!")
      log.error("Resuming the actor...")
      Resume
    case e: Exception =>
      log.error(e, "Something terrible happened and we don't even know what it is!!!!!!!!!")
      log.error("Escalating...")
      Escalate
  }

  def receive = {
    case p: Props => sender ! context.actorOf(p)
  }

}
