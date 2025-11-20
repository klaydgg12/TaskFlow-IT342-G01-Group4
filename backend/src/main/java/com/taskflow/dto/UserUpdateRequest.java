package com.taskflow.dto;

import lombok.Data;

/**
 * Request payload for updating existing users (admin panel).
 */
@Data
public class UserUpdateRequest {
    private String fullName;
    private String email;
    private String role;
    private Boolean isActive;
    private String status;
    private Long updatedById;
}

