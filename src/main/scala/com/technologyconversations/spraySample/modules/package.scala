package com.technologyconversations.spraySample

import akka.util.Timeout
import scala.concurrent.duration._

package object modules {

  val defaultTimeout = Timeout(5 seconds)

}
