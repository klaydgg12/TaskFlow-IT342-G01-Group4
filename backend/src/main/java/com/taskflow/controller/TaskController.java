package com.taskflow.controller;

import com.taskflow.entity.Task;
import com.taskflow.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody Map<String, Object> request) {
        try {
            String title = (String) request.get("title");
            String description = (String) request.get("description");
            String priority = (String) request.get("priority");
            Long assignedUserId = ((Number) request.get("assignedUserId")).longValue();
            Long createdById = ((Number) request.get("createdById")).longValue();

            Task task = taskService.createTask(title, description, priority, assignedUserId, createdById);
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
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            Task task = taskService.updateTask(id, request.get("title"), request.get("description"),
                    request.get("status"), request.get("priority"));
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
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
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
