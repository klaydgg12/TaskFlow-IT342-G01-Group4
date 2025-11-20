package com.taskflow.service;

import com.taskflow.entity.Task;
import com.taskflow.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(String title, String description, String priority,
            Long assignedUserId, Long createdById) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);
        task.setStatus("TODO");
        task.setAssignedUserId(assignedUserId);
        task.setCreatedById(createdById);
        return taskRepository.save(task);
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

    public Task updateTask(Long id, String title, String description, String status, String priority) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            Task t = task.get();
            t.setTitle(title);
            t.setDescription(description);
            t.setStatus(status);
            t.setPriority(priority);
            return taskRepository.save(t);
        }
        throw new RuntimeException("Task not found");
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getTasksByUserAndStatus(Long userId, String status) {
        return taskRepository.findByAssignedUserIdAndStatus(userId, status);
    }
}
