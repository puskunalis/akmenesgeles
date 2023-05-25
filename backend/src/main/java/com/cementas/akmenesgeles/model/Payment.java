package com.cementas.akmenesgeles.model;


import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    private String cardHolder;
    private String cardNumber;
    private String expiryDate;
    private String cvv;
}
