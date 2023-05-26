package com.cementas.akmenesgeles.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Interceptors")
public class Interceptor {

    @Id
    @Column(nullable = false, updatable = false, name = "interceptor_id")
    private Integer id;

    private String name;

    private Boolean enabled;
}
