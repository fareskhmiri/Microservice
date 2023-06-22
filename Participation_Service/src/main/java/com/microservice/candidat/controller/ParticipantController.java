package com.microservice.candidat.controller;

import com.microservice.candidat.exception.ParticipantNotFoundException;
import com.microservice.candidat.model.Participant;
import com.microservice.candidat.service.ParticipantService;
import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/participant")
@Api(value = "Participant API")
@AllArgsConstructor
public class ParticipantController {

    ParticipantService participantService;

    @GetMapping
    public ResponseEntity<List<Participant>> getAllParticipants() {
        List<Participant> participants = this.participantService.getAllParticipants();
        if (participants.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(participants, HttpStatus.OK);
        }
    }

    @GetMapping(value ="/{id}")
    public ResponseEntity<Participant> getParticipantById(@PathVariable("id") UUID id) {
        Optional<Participant> participant = this.participantService.getParticipantById(id);
        if (participant.isPresent()) {
            return new ResponseEntity<>(participant.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Participant> createParticipant(@RequestBody Participant participantDto) {
        Participant participant = this.participantService.createParticipant(participantDto);
        return new ResponseEntity<>(participant, HttpStatus.CREATED);

    }

    @PutMapping(value ="/{id}")
    public ResponseEntity<Participant> updateParticipant(@PathVariable("id") UUID id, @RequestBody Participant participantDto) {
        try {
            return new ResponseEntity<>(this.participantService.updateParticipant(participantDto, id), HttpStatus.OK);
        }catch (ParticipantNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteParticipant(@PathVariable("id") UUID id) {
        try {
            this.participantService.deleteParticipant(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
