package com.taskflow.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_role_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "old_role", nullable = false, length = 50)
    private String oldRole;

    @Column(name = "new_role", nullable = false, length = 50)
    private String newRole;

    @Column(name = "changed_by_user_id")
    private Long changedByUserId;

    @Column(name = "changed_at")
    private LocalDateTime changedAt;

    @PrePersist
    protected void onCreate() {
        if (changedAt == null) {
            changedAt = LocalDateTime.now();
        }
    }
}
