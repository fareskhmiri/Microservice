package com.esprit.conge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esprit.conge.entity.Conge;
import com.esprit.conge.repository.CongeRepository;

import java.util.List;

@Service
public class CongeService {
	
	@Autowired
	CongeRepository congeRepository;

    @Autowired
    public CongeService(CongeRepository congeRepository) {
        this.congeRepository = congeRepository;
    }

    public Conge ajouterConge(Conge conge) {
        return congeRepository.save(conge);
    }
    public Conge getCongeById(Long id) {
        return congeRepository.findById(id).orElse(null);
    }
    public List<Conge> afficherConges() {
        return congeRepository.findAll();
    }

    public void supprimerConge(Long id) {
        congeRepository.deleteById(id);
    }

    public Conge modifierConge(Long id, Conge conge) {
        Conge congexist = congeRepository.findById(id).orElse(null);
        if (congexist != null) {
            congexist.setDateDebut(conge.getDateDebut());
            congexist.setDateFin(conge.getDateFin());
            congexist.setStatut(conge.getStatut());
            return congeRepository.save(congexist);
        }
        return null;
    }
}

