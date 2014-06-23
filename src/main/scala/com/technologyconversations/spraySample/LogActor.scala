package com.technologyconversations.spraySample

import akka.actor.Actor

case class LogMessage(message: String)

class LogActor extends Actor {

  def receive = {
    case LogMessage(message) => println(s"Following message has been logged: $message")
    case _                   => println("This message is not supported")
  }

}
