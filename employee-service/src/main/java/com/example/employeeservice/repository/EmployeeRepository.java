package com.example.employeeservice.repository;

import com.example.employeeservice.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
//    List<Employee> findByLastName(String lastName);
//
//    List<Employee> findByFirstName(String firstName);
//
//    List<Employee> findByEmail(String email);
}

