package com.technologyconversations

import akka.util.Timeout
import scala.concurrent.duration._

package object spraySample {

  val defaultTimeout = Timeout(5 seconds)

}
