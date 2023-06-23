package com.esprit.conge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableFeignClients
@ComponentScan("com.esprit.conge")
@EnableJpaRepositories("com.esprit.conge.repository")
@EntityScan(basePackages = {"com.esprit.conge.entity"})
public class CongeServicesApplication {
 
	public static void main(String[] args) {
		SpringApplication.run(CongeServicesApplication.class, args);
	}

}
