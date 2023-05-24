package com.cementas.akmenesgeles.dto.ShippingAddress;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShippingAddressDto {
    private String fullName;
    private String city;
    private String postalCode;
    private String address;
    private UUID userId;
}
