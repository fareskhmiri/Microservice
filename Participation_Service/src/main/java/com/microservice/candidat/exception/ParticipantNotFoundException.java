package com.microservice.candidat.exception;


import java.util.UUID;

public class ParticipantNotFoundException extends Throwable {
    public ParticipantNotFoundException(UUID id) {
        super("Cannot found participant number [" + id + "]");
    }
}
