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
@Table(name = "Strategies")
public class Strategy {

    @Id
    @Column(nullable = false, name = "strategy_id")
    private Integer id;

    private String name;

    private StrategyType strategyType;
}
