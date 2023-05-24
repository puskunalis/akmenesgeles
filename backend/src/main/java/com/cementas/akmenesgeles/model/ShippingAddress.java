package com.cementas.akmenesgeles.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ShippingAddresses")
public class ShippingAddress implements Serializable {

    @Id
    @Column(name = "address_id")
    private UUID id;
    private String street;
    private String city;
    private String postalCode;
    private String houseNumber;
    private String apartmentNumber;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
}
