package com.vermeg.VTest.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.vermeg.VTest.entities.Notification;

@Repository
public interface INotificationRepository extends CrudRepository<Notification, Long> {

}
