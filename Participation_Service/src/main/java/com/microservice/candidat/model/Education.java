package com.microservice.candidat.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Education {
    @JsonProperty
    private String name;
    @JsonProperty
    private List<String> dates;
    @JsonProperty
    private String date_start;
    @JsonProperty
    private String date_end;
}
