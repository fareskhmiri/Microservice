package com.vermeg.VTest.services;

import com.vermeg.VTest.entities.Notification;

import java.util.List;

public interface INotificationService {

    Notification addNotification(Notification c);

    List<Notification> getNotifications();

    Notification getById(Long Id);
}
