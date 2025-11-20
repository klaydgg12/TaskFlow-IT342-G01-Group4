package com.taskflow.dto;

import lombok.Data;

/**
 * Request payload for creating or updating a task.
 * Accepts date strings so the frontend can send either yyyy-MM-dd or ISO datetime values.
 */
@Data
public class TaskRequest {
    private String title;
    private String description;
    private String status;
    private String priority;
    private String dueDate;
    private Long assignedUserId;
    private Long createdById;
}

