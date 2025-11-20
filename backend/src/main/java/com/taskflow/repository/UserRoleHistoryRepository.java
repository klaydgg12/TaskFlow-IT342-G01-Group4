package com.taskflow.repository;

import com.taskflow.entity.UserRoleHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleHistoryRepository extends JpaRepository<UserRoleHistory, Long> {
    List<UserRoleHistory> findTop100ByOrderByChangedAtDesc();
}

