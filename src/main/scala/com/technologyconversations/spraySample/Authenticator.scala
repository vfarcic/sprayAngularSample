package com.technologyconversations.spraySample

import akka.actor.{Props, ActorRefFactory}
import com.technologyconversations.spraySample.modules.{LogActor, AuditMessage}
import spray.routing.authentication.{BasicAuth, UserPass}

import scala.concurrent.Future

// TODO Test
class Authenticator(actorRefFactory: ActorRefFactory) {

  implicit def executionContext = actorRefFactory.dispatcher
  val logActor = actorRefFactory.actorOf(Props[LogActor])
  // TODO Switch to DB
  def userPassAuthenticator(userPass: Option[UserPass]): Future[Option[String]] = Future {
    if (userPass.exists(up => up.user == "administrator" && up.pass == "welcome")) {
      logActor ! LogActor.SaveAudit(AuditMessage("User has been authenticated"))
      Some("administrator")
    }
    else if (userPass.exists(up => up.user == "john" && up.pass == "doe")) {
      logActor ! LogActor.SaveAudit(AuditMessage("User has been authenticated"))
      Some("john")
    }
    else {
      logActor ! LogActor.SaveAudit(AuditMessage("User has NOT been authenticated"))
      None
    }
  }

  def basicAuth = BasicAuth(userPassAuthenticator _, realm = "secure site")

}
