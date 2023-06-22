package com.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.model.Department;
import com.service.DepartmentService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

// @RestController

@RestController
@RequestMapping(value = "/department")
public class DepartmentController {

    DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }


    @GetMapping("/getAllDepartment")
    public ResponseEntity<List<Department>> getAllDepartments() {
        List<Department> departments = this.departmentService.getAllDepartments();
        if (departments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(departments, HttpStatus.OK);
        }
    }
    @GetMapping(value ="{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable("id") UUID id) {
        Optional<Department> department = this.departmentService.getDepartmentId(id);
      
            return new ResponseEntity<>(department.get(), HttpStatus.OK);
       
    }
    @PostMapping("/createDepartment")
    public ResponseEntity<Department> createDepartment(@RequestBody Department departmentDto) {
      
        Department department = this.departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(department, HttpStatus.CREATED);

    }

    @PutMapping(value ="updateDepartment/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable("id") UUID id, @RequestBody Department departmentDto) {
        
            return new ResponseEntity<>(this.departmentService.updateDepartment(departmentDto, id), HttpStatus.OK);
      
    }

    @DeleteMapping(value ="deleteDepartment/{id}")
    public ResponseEntity<HttpStatus> deleteDepartment(@PathVariable("id") UUID id) {
        try {
            this.departmentService.deleteDepartment(id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
