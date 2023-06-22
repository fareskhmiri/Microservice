package com.microservice.candidat.service;

import com.microservice.candidat.exception.ParticipantNotFoundException;
import com.microservice.candidat.model.Participant;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public interface ParticipantService {
     List<Participant> getAllParticipants();
     Optional<Participant> getParticipantById(UUID id);
     Participant createParticipant(Participant participant);
     Participant updateParticipant(Participant participant, UUID id) throws ParticipantNotFoundException;
     void deleteParticipant(UUID id);
}
