package com.service;


import org.springframework.stereotype.Service;

import com.model.Department;
import com.repository.DepartmentRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public Optional<Department> getDepartmentId(UUID id) {
         return departmentRepository.findById(id);
    }

    @Override
    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Override
    public Department updateDepartment(Department candidateDto, UUID id){
        Optional<Department> candidate = this.departmentRepository.findById(id);
        if (candidate.isPresent()) {
            candidateDto.setId(id);
            return this.departmentRepository.save(candidateDto);
        }
		return null; 
    }

    @Override
    public void deleteDepartment(UUID id) {
        departmentRepository.deleteById(id);
    }

	
}
