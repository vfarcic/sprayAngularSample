package com.technologyconversations.spraySample

import spray.routing._

class MyHttpService extends HttpServiceActor {
   def receive = runRoute {
     path("ping") {
       get {
         complete("PONG")
       }
     }
   }
 }