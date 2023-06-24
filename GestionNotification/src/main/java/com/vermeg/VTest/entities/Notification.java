package com.vermeg.VTest.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
public class Notification implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idNotification;
    private String description;
    private String satus;
//    @Temporal(TemporalType.DATE)
//    private Date dateF;
    private String email;
//    private String password;
    private LocalDate date;
//    private int jobID;


    public Notification() {
        super();
        // TODO Auto-generated constructor stub
    }


    public Notification(String description, String satus, String email, LocalDate date) {
        super();
        this.description = description;
        this.satus = satus;
        this.email = email;
        this.date = date;
    }
}