package com.taskflow.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "userdb")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "google_id")
    private String googleId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String role; // ADMIN or USER

    @Column(name = "profile_pic")
    private String profilePic;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "status", nullable = false)
    private String status = "ACTIVE";

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (status == null) {
            status = "ACTIVE";
        }
    }

    @Transient
    public Boolean getIsActive() {
        if (status == null) {
            return null;
        }
        return "ACTIVE".equalsIgnoreCase(status);
    }

    public void setIsActive(Boolean active) {
        this.status = (active != null && active) ? "ACTIVE" : "DEACTIVATED";
    }
}
