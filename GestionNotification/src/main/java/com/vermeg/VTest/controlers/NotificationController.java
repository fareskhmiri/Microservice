package com.vermeg.VTest.controlers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vermeg.VTest.entities.Notification;
import com.vermeg.VTest.services.INotificationService;

//http://localhost:8086/API/GestionNotification/getAll
@RestController
@RequestMapping(value = "API/GestionNotification")
public class NotificationController {
	@Autowired
	INotificationService canService;
		@PostMapping("/AddNotification")
	public Notification addNotification(@RequestBody Notification c)
	{
		return canService.addNotification(c); }
	@GetMapping("/getOne/{id}")
	public Notification getOne(@PathVariable("id") Long id){
		return canService.getById(id);	}
	@GetMapping("/getAll")
	public List<Notification> getAll(){
		return canService.getNotifications();
	}


}