package com.cementas.akmenesgeles.dto.ShippingAddress;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShippingAddressDto {
    private String street;
    private String city;
    private String postalCode;
    private String houseNumber;
    private String apartmentNumber;
}
