package com.esprit.conge.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import java.time.LocalDate;
@Entity
@Table(name = "conges")
public class Conge {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDate dateDebut;
	
    private LocalDate dateFin;
	
	private String statut;
	
	
	public Conge() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Conge(LocalDate dateDebut, LocalDate dateFin, String statut) {
		super();
		this.dateDebut = dateDebut;
		this.dateFin = dateFin;
		this.statut = statut;
	}

	public LocalDate getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(LocalDate dateDebut) {
		this.dateDebut = dateDebut;
	}

	public LocalDate getDateFin() {
		return dateFin;
	}

	public void setDateFin(LocalDate dateFin) {
		this.dateFin = dateFin;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	
	
}
