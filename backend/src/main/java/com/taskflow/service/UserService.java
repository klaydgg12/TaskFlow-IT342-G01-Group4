package com.taskflow.service;

import com.taskflow.dto.GoogleUserPayload;
import com.taskflow.dto.UserUpdateRequest;
import com.taskflow.entity.User;
import com.taskflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private GoogleAuthService googleAuthService;

    @Autowired
    private AuditLogService auditLogService;

    public User createUser(String email, String password, String fullName, String role, String googleId) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setEmail(email);
        // Hash password before saving
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName);
        user.setRole(role); // ADMIN or USER
        if (googleId != null && !googleId.isBlank()) {
            user.setGoogleId(googleId.trim());
        }
        user.setStatus("ACTIVE");
        User saved = persist(user);
        if (saved.getGoogleId() == null) {
            saved.setGoogleId("G" + saved.getId());
            saved = persist(saved);
        }
        return saved;
    }

    public Optional<User> authenticate(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            ensureActive(user);
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public User authenticateWithGoogle(String idToken) {
        GoogleUserPayload payload = googleAuthService.verify(idToken);
        if (payload.getEmail() == null) {
            throw new IllegalArgumentException("Google account does not expose an email address");
        }
        Optional<User> existing = userRepository.findByEmail(payload.getEmail());
        User user = existing.orElseGet(User::new);
        user.setEmail(payload.getEmail());
        user.setFullName(payload.getName());
        if (user.getPassword() == null) {
            user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
        }
        if (user.getRole() == null) {
            user.setRole("USER");
        }
        if (user.getStatus() == null) {
            user.setStatus("ACTIVE");
        }
        user.setGoogleId(payload.getGoogleId());
        if (payload.getPictureUrl() != null) {
            user.setProfilePic(payload.getPictureUrl());
        }
        ensureActive(user);
        return persist(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        Objects.requireNonNull(id, "User id is required");
        return userRepository.findById(id);
    }

    public List<User> getAllAdmins() {
        return userRepository.findByRole("ADMIN");
    }

    public List<User> getAllUsers() {
        return userRepository.findByRole("USER");
    }

    public List<User> getAllAccounts() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, UserUpdateRequest request, Long actorId, String sourceIp) {
        Objects.requireNonNull(id, "User id is required");
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User actor = null;
        if (actorId != null) {
            actor = userRepository.findById(actorId).orElse(null);
        }

        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }

        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(request.getEmail());
        }

        if (request.getRole() != null) {
            String oldRole = user.getRole();
            String newRole = request.getRole().toUpperCase();
            if (!newRole.equalsIgnoreCase(oldRole)) {
                user.setRole(newRole);
                if (actor != null) {
                    auditLogService.recordRoleChange(user, actor, oldRole, newRole, sourceIp);
                }
            }
        }

        if (request.getIsActive() != null) {
            Boolean previousActive = user.getIsActive();
            user.setIsActive(request.getIsActive());
            Boolean updatedActive = user.getIsActive();
            if (actor != null && previousActive != null && updatedActive != null && !previousActive.equals(updatedActive)) {
                String action = updatedActive ? "USER_REACTIVATED" : "USER_DEACTIVATED";
                auditLogService.logAction(
                        actor,
                        action,
                        "USER",
                        user.getId(),
                        String.format("%s %s user %s", actor.getFullName(),
                                updatedActive ? "re-activated" : "deactivated", user.getFullName()),
                        previousActive ? "ACTIVE" : "DEACTIVATED",
                        updatedActive ? "ACTIVE" : "DEACTIVATED",
                        sourceIp);
            }
        } else if (request.getStatus() != null) {
            user.setStatus(request.getStatus());
        }

        return persist(user);
    }

    public void deleteUser(Long id) {
        Objects.requireNonNull(id, "User id is required");
        userRepository.deleteById(id);
    }

    private void ensureActive(User user) {
        if (user.getStatus() != null && !"ACTIVE".equalsIgnoreCase(user.getStatus())) {
            throw new IllegalStateException("Account is deactivated");
        }
    }

    @SuppressWarnings("null")
    private User persist(User user) {
        return userRepository.save(user);
    }
}
