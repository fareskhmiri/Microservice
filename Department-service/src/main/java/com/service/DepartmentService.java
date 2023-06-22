package com.service;

import com.model.Department;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DepartmentService {
    List<Department> getAllDepartments();

    Optional<Department> getDepartmentId(UUID id);

    Department createDepartment(Department department);

    Department updateDepartment(Department Department, UUID id) ;

    void deleteDepartment(UUID id);

}
