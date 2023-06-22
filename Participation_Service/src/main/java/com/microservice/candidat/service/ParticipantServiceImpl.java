package com.microservice.candidat.service;

import com.microservice.candidat.exception.ParticipantNotFoundException;
import com.microservice.candidat.model.Participant;
import com.microservice.candidat.repository.ParticipantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor

public class ParticipantServiceImpl implements ParticipantService {

    ParticipantRepository participantRepository;

    @Override
    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    @Override
    public Optional<Participant> getParticipantById(UUID id) {
        return participantRepository.findById(String.valueOf(id));
    }

    @Override
    public Participant createParticipant(Participant participant) {
        return participantRepository.save(participant);
    }

    @Override
    public Participant updateParticipant(Participant participantDto, UUID id) throws ParticipantNotFoundException {
        Optional<Participant> participant = this.participantRepository.findById(String.valueOf(id));
        if (participant.isPresent()) {
            return this.participantRepository.save(participantDto);
        } else {
            throw new ParticipantNotFoundException(id);
        }
    }

    @Override
    public void deleteParticipant(UUID id) {
        participantRepository.deleteById(String.valueOf(id));
    }
}
