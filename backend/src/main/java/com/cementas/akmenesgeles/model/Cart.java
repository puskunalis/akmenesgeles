package com.cementas.akmenesgeles.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode
public class Cart implements Serializable {

    @Id
    @Column(name = "cart_id")
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @OneToMany(mappedBy = "cart")
    private List<CartItem> items;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    //Doesn't update
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Cart(UUID id, List<CartItem> items) {
        this.id = id;
        this.items = items;
    }

    public Cart(UUID id, User user, List<CartItem> items) {
        this.id = id;
        this.user = user;
        this.items = items;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
