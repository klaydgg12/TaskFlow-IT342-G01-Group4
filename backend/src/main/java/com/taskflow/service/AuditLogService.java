package com.taskflow.service;

import com.taskflow.entity.AuditLog;
import com.taskflow.entity.User;
import com.taskflow.entity.UserRoleHistory;
import com.taskflow.repository.AuditLogRepository;
import com.taskflow.repository.UserRoleHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private UserRoleHistoryRepository userRoleHistoryRepository;

    public AuditLog logAction(User actor,
                              String action,
                              String entityType,
                              Long entityId,
                              String description,
                              String oldValue,
                              String newValue,
                              String sourceIp) {
        if (actor == null) {
            return null;
        }
        AuditLog auditLog = new AuditLog();
        auditLog.setUser(actor);
        auditLog.setAction(action);
        auditLog.setEntityType(entityType);
        auditLog.setEntityId(entityId);
        auditLog.setDescription(description);
        auditLog.setOldValue(oldValue);
        auditLog.setNewValue(newValue);
        auditLog.setSourceIp(sourceIp);
        auditLog.setCreatedAt(LocalDateTime.now());
        return auditLogRepository.save(auditLog);
    }

    public void recordRoleChange(User target, User actor, String oldRole, String newRole, String sourceIp) {
        if (target == null || actor == null) {
            return;
        }
        UserRoleHistory history = new UserRoleHistory();
        history.setUser(target);
        history.setOldRole(oldRole);
        history.setNewRole(newRole);
        history.setChangedByUserId(actor.getId());
        history.setChangedAt(LocalDateTime.now());
        userRoleHistoryRepository.save(history);

        logAction(actor,
                "ROLE_CHANGE",
                "USER",
                target.getId(),
                String.format("Changed %s's role from %s to %s", target.getFullName(), oldRole, newRole),
                oldRole,
                newRole,
                sourceIp);
    }

    public List<AuditLog> getRecentAuditLogs() {
        return auditLogRepository.findTop100ByOrderByCreatedAtDesc();
    }

    public List<AuditLog> getAllAuditLogs() {
        return auditLogRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<UserRoleHistory> getRecentRoleHistory() {
        return userRoleHistoryRepository.findTop100ByOrderByChangedAtDesc();
    }
}

