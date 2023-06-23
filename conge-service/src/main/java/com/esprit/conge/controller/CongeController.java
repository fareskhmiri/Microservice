package com.esprit.conge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.esprit.conge.entity.Conge;
import com.esprit.conge.service.CongeService;

import java.util.List;

@RestController
@RequestMapping("/api/conges")
public class CongeController {
    private final CongeService congeService;

    @Autowired
    public CongeController(CongeService congeService) {
        this.congeService = congeService;
    }

    @PostMapping
    public Conge ajouterConge(@RequestBody Conge conge) {
        return congeService.ajouterConge(conge);
    }

    @GetMapping
    public List<Conge> afficherConges() {
        return congeService.afficherConges();
    }

    @DeleteMapping("/{id}")
    public void supprimerConge(@PathVariable Long id) {
        congeService.supprimerConge(id);
    }

    @PutMapping("/{id}")
    public Conge modifierConge(@PathVariable Long id, @RequestBody Conge conge) {
        return congeService.modifierConge(id, conge);
    }
}

