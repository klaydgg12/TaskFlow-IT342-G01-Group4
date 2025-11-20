package com.taskflow.service;

import com.taskflow.dto.TaskRequest;
import com.taskflow.entity.Task;
import com.taskflow.entity.User;
import com.taskflow.repository.TaskRepository;
import com.taskflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogService auditLogService;

    public Task createTask(TaskRequest request, String sourceIp) {
        Task task = new Task();
        applyTaskRequest(task, request);
        if (task.getStatus() == null || task.getStatus().isBlank()) {
            task.setStatus("TODO");
        }
        if (task.getPriority() == null || task.getPriority().isBlank()) {
            task.setPriority("MEDIUM");
        }
        if (task.getAssignedUserId() == null || task.getCreatedById() == null) {
            throw new IllegalArgumentException("assignedUserId and createdById are required.");
        }
        Task saved = taskRepository.save(task);
        if (request.getCreatedById() != null) {
            userRepository.findById(request.getCreatedById()).ifPresent(user -> auditLogService.logAction(
                    user,
                    "TASK_CREATED",
                    "TASK",
                    saved.getId(),
                    "Created task: " + saved.getTitle(),
                    null,
                    saved.getStatus(),
                    sourceIp));
        }
        return saved;
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> getTasksByUser(Long userId) {
        return taskRepository.findByAssignedUserId(userId);
    }

    public List<Task> getTasksByCreator(Long creatorId) {
        return taskRepository.findByCreatedById(creatorId);
    }

    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task updateTask(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        applyTaskRequest(task, request);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getTasksByUserAndStatus(Long userId, String status) {
        return taskRepository.findByAssignedUserIdAndStatus(userId, status);
    }

    private void applyTaskRequest(Task task, TaskRequest request) {
        if (request.getTitle() != null) {
            task.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }
        if (request.getPriority() != null) {
            task.setPriority(request.getPriority());
        }
        if (request.getAssignedUserId() != null) {
            task.setAssignedUserId(request.getAssignedUserId());
        }
        if (request.getCreatedById() != null) {
            task.setCreatedById(request.getCreatedById());
        }
        if (request.getDueDate() != null) {
            task.setDueDate(parseDueDate(request.getDueDate()));
        }
    }

    private LocalDateTime parseDueDate(String dueDate) {
        if (dueDate == null || dueDate.isBlank()) {
            return null;
        }
        try {
            if (dueDate.length() == 10) {
                return LocalDate.parse(dueDate).atStartOfDay();
            }
            return LocalDateTime.parse(dueDate);
        } catch (DateTimeParseException ex) {
            throw new IllegalArgumentException("Invalid dueDate format. Use yyyy-MM-dd or ISO date-time.", ex);
        }
    }
}
