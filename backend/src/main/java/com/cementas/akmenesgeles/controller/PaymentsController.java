package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.model.Payment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pay")
public class PaymentsController {

    @PostMapping
    public ResponseEntity pay(@RequestBody Payment payment) throws InterruptedException {
        Payment correctPayment = Payment.builder()
                .cardHolder("Vardas Pavarde")
                .cardNumber("1234 1234 1234 1234")
                .expiryDate("12/23")
                .cvv("123")
                .build();
        Thread.sleep(2000);
        if (correctPayment.equals(payment)){
            return ResponseEntity.ok().build();
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}
