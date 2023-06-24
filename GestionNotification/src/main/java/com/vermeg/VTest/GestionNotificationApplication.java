package com.vermeg.VTest;

import com.vermeg.VTest.entities.Notification;
import com.vermeg.VTest.repository.INotificationRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@EnableEurekaClient
@SpringBootApplication
public class GestionNotificationApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionNotificationApplication.class, args);
    }

    @Bean
    ApplicationRunner start(INotificationRepository repo) {
        return args ->
        {
            Stream.of(new Notification("Mustapha", "TRABELSI", "mtrabelsi@gmail.com"),
                    new Notification("Azza", "TAJOURI", "atajouri@gmail.com")).forEach(
                    Notification -> {
                        repo.save(Notification);
                    });
            repo.findAll().forEach(System.out::println);
        };
    }
}
