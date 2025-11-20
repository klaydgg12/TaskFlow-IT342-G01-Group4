package com.taskflow.controller;

import com.taskflow.service.AuditLogService;
import com.taskflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin(origins = "*")
public class AuditController {

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/logs")
    public ResponseEntity<?> getAuditLogs() {
        List<Map<String, Object>> logs = auditLogService.getRecentAuditLogs().stream()
                .map(log -> Map.<String, Object>of(
                        "id", log.getId(),
                        "action", log.getAction(),
                        "entityType", log.getEntityType(),
                        "entityId", log.getEntityId(),
                        "description", log.getDescription(),
                        "oldValue", log.getOldValue(),
                        "newValue", log.getNewValue(),
                        "sourceIp", log.getSourceIp(),
                        "createdAt", log.getCreatedAt(),
                        "user", Map.<String, Object>of(
                                "id", log.getUser().getId(),
                                "fullName", log.getUser().getFullName(),
                                "email", log.getUser().getEmail()
                        )
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(Map.of("success", true, "logs", logs));
    }

    @GetMapping("/role-history")
    public ResponseEntity<?> getRoleHistory() {
        List<Map<String, Object>> history = auditLogService.getRecentRoleHistory().stream()
                .map(entry -> {
                    Map<String, Object> changedByMap = null;
                    if (entry.getChangedByUserId() != null) {
                        changedByMap = userRepository.findById(entry.getChangedByUserId())
                                .map(user -> Map.<String, Object>of(
                                        "id", user.getId(),
                                        "fullName", user.getFullName(),
                                        "email", user.getEmail()
                                ))
                                .orElse(null);
                    }

                    Map<String, Object> response = new java.util.HashMap<>();
                    response.put("id", entry.getId());
                    response.put("user", Map.<String, Object>of(
                            "id", entry.getUser().getId(),
                            "fullName", entry.getUser().getFullName(),
                            "email", entry.getUser().getEmail()
                    ));
                    response.put("oldRole", entry.getOldRole());
                    response.put("newRole", entry.getNewRole());
                    response.put("changedBy", changedByMap);
                    response.put("changedAt", entry.getChangedAt());
                    return response;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(Map.of("success", true, "history", history));
    }
}

