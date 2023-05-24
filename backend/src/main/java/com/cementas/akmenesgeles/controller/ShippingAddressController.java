package com.cementas.akmenesgeles.controller;

import com.cementas.akmenesgeles.dto.ShippingAddress.ShippingAddressDto;
import com.cementas.akmenesgeles.model.ShippingAddress;
import com.cementas.akmenesgeles.service.ShippingAddressService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/address")
@AllArgsConstructor
public class ShippingAddressController {

    private final ShippingAddressService shippingAddressService;

    @GetMapping("/user/{userId}")
    public List<ShippingAddress> getAllByUserId(@PathVariable UUID userId) {
        return shippingAddressService.getAllByUserId(userId);
    }

    @GetMapping("/{id}")
    public ShippingAddress getById(@PathVariable UUID id) {
        return shippingAddressService.getById(id);
    }

    @PostMapping
    public ResponseEntity<ShippingAddress> addShippingAddress(@RequestBody ShippingAddressDto shippingAddressDto) {
        ShippingAddress shippingAddress = shippingAddressService.add(shippingAddressDto);
        if(shippingAddress != null) {
            return ResponseEntity.ok(shippingAddress);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        shippingAddressService.delete(id);
    }
}
