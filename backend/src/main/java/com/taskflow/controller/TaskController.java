package com.taskflow.controller;

import com.taskflow.dto.TaskRequest;
import com.taskflow.entity.Task;
import com.taskflow.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    @Autowired
    private TaskService taskService;

    private String getClientIp(HttpServletRequest request) {
        String header = request.getHeader("X-Forwarded-For");
        if (header != null && !header.isBlank()) {
            return header.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody TaskRequest request, HttpServletRequest httpServletRequest) {
        try {
            Task task = taskService.createTask(request, getClientIp(httpServletRequest));
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Task created successfully",
                    "task", task));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "total", tasks.size(),
                "tasks", tasks));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "task", task.get()));
        }
        return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Task not found"));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getTasksByUser(@PathVariable Long userId) {
        List<Task> tasks = taskService.getTasksByUser(userId);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "total", tasks.size(),
                "tasks", tasks));
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<?> getTasksByUserAndStatus(@PathVariable Long userId, @PathVariable String status) {
        List<Task> tasks = taskService.getTasksByUserAndStatus(userId, status);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "total", tasks.size(),
                "tasks", tasks));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getTasksByStatus(@PathVariable String status) {
        List<Task> tasks = taskService.getTasksByStatus(status);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "total", tasks.size(),
                "tasks", tasks));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskRequest request, HttpServletRequest httpServletRequest) {
        try {
            Task task = taskService.updateTask(id, request, getClientIp(httpServletRequest));
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Task updated successfully",
                    "task", task));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, HttpServletRequest httpServletRequest) {
        try {
            // Extract userId from request body or header if needed
            // For now, we'll try to get it from the request body if sent
            Long userId = null;
            try {
                String userIdStr = httpServletRequest.getHeader("X-User-Id");
                if (userIdStr != null) {
                    userId = Long.parseLong(userIdStr);
                }
            } catch (Exception e) {
                // If not provided, we'll try to get from task's createdById
            }
            
            // If userId not in header, get from task before deletion
            if (userId == null) {
                var taskOpt = taskService.getTaskById(id);
                if (taskOpt.isPresent()) {
                    userId = taskOpt.get().getCreatedById();
                }
            }
            
            taskService.deleteTask(id, userId, getClientIp(httpServletRequest));
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Task deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }
}
