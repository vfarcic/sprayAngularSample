package com.technologyconversations.spraySample

import akka.actor.ActorRefFactory
import spray.routing.authentication.{BasicAuth, UserPass}

import scala.concurrent.Future

// TODO Test
class Authentificator(actorRefFactory: ActorRefFactory) {

  implicit def executionContext = actorRefFactory.dispatcher
  // TODO Switch to DB
  def userPassAuthenticator(userPass: Option[UserPass]): Future[Option[String]] = Future {
    if (userPass.exists(up => up.user == "administrator" && up.pass == "welcome")) Some("administrator")
    else if (userPass.exists(up => up.user == "john" && up.pass == "doe")) Some("john")
    else None
  }

  def basicAuth = BasicAuth(userPassAuthenticator _, realm = "secure site")

}
