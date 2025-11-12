package com.bituan.push_notification_service.service;

import com.google.firebase.messaging.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class FirebaseFCMService {
    private final FirebaseMessaging firebaseMessaging;
    private final APIGatewayService apiGatewayService;

    @Autowired
    FirebaseFCMService (FirebaseMessaging firebaseMessaging, APIGatewayService apiGatewayService) {
        this.firebaseMessaging = firebaseMessaging;
        this.apiGatewayService = apiGatewayService;
    }

    @Async
    public  void pushNotification (String token, Notification notification, String notificationId) {
        Message message = Message.builder().setToken(token).setNotification(notification).build();
        try {
            firebaseMessaging.send(message);
        } catch (FirebaseMessagingException e) {
            if (e.getMessagingErrorCode() == MessagingErrorCode.UNREGISTERED) {
                //update user token to null
                apiGatewayService.updateUserToken("", null);
            }
            throw new RuntimeException(e);
        }
    }
}
