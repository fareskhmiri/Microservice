package com.esprit.conge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.esprit.conge.entity.Conge;

@Repository
public interface CongeRepository extends JpaRepository<Conge, Long> {

}
