package com.taskflow.repository;

import com.taskflow.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedUserId(Long assignedUserId);

    List<Task> findByCreatedById(Long createdById);

    List<Task> findByStatus(String status);

    List<Task> findByAssignedUserIdAndStatus(Long assignedUserId, String status);
}
