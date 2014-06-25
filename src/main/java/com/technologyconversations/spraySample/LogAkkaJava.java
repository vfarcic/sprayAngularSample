package com.technologyconversations.spraySample;

import akka.actor.UntypedActor;

import java.io.Serializable;

public class LogAkkaJava {

    public static class LogMessageJava implements Serializable {
        public final String messageText;
        public LogMessageJava(String messageText) {
            this.messageText = messageText;
        }
    }

    public static class LogActorJava extends UntypedActor {
        @Override
        public void onReceive(Object message) {
            if (message instanceof LogMessageJava) {
                LogMessageJava logMessage = (LogMessageJava) message;
                System.out.println("Following message has been logged from the Java actor: " + logMessage.messageText);
            } else {
                System.out.println("This message is not supported by the Java actor");
            }
        }
    }

}
