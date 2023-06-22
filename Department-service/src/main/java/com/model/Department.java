package com.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="TBL_DEPARTMENTS")
public class Department implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String nomDepartment;
    private double nombreEmplyoye;
    private String Categorie;
    private String profession;
    private String description;
	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getNomDepartment() {
		return nomDepartment;
	}
	public void setNomDepartment(String nomDepartment) {
		this.nomDepartment = nomDepartment;
	}
	public double getNombreEmplyoye() {
		return nombreEmplyoye;
	}
	public void setNombreEmplyoye(double nombreEmplyoye) {
		this.nombreEmplyoye = nombreEmplyoye;
	}
	public String getCategorie() {
		return Categorie;
	}
	public void setCategorie(String categorie) {
		Categorie = categorie;
	}
	public String getProfession() {
		return profession;
	}
	public void setProfession(String profession) {
		this.profession = profession;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
