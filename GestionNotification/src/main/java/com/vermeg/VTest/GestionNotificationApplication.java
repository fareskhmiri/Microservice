package com.vermeg.VTest;

import com.vermeg.VTest.entities.Notification;
import com.vermeg.VTest.repository.INotificationRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Date;
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
            Stream.of(new Notification("aaaaaaaaaaa", "lu" ,"mtrabelsi@gmail.com", LocalDate.now()),
                    new Notification("bbbbbbbbbb", "non lu", "atajouri@gmail.com", LocalDate.now())).forEach(
                    Notification -> {
                        repo.save(Notification);
                    });
            repo.findAll().forEach(System.out::println);
        };
    }
}
