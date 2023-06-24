package com.vermeg.VTest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vermeg.VTest.entities.Notification;
import com.vermeg.VTest.repository.INotificationRepository;

@Service
public class NotificationService implements INotificationService {

	@Autowired
	INotificationRepository candRepo;
	@Override
	public Notification addNotification(Notification c) {
		return candRepo.save(c);	}
	@Override
	public List<Notification> getNotifications() {
		return (List<Notification>) candRepo.findAll();
	}	
	@Override
	public Notification getById(Long Id) {
	    
		return candRepo.findById(Id).get();
	}


}
