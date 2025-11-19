package com.taskflow.controller;

import com.taskflow.entity.User;
import com.taskflow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            String fullName = request.get("fullName");
            String role = request.getOrDefault("role", "USER");

            User user = userService.createUser(email, password, fullName, role);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "User created successfully",
                    "user", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllAccounts();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "total", users.size(),
                "users", users));
    }

    @GetMapping("/admins")
    public ResponseEntity<?> getAllAdmins() {
        List<User> admins = userService.getAllAdmins();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "total", admins.size(),
                "admins", admins));
    }

    @GetMapping("/regular-users")
    public ResponseEntity<?> getAllRegularUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "total", users.size(),
                "users", users));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "user", user.get()));
        }
        return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "User not found"));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "user", user.get()));
        }
        return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "User not found"));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        try {
            Optional<User> user = userService.authenticate(email, password);
            if (user.isPresent()) {
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "user", user.get()));
            }
            return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Invalid credentials"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    // Development helper: hash a password (DO NOT expose in production)
    @PostMapping("/dev/hash")
    public ResponseEntity<?> hashPassword(@RequestBody Map<String, String> request) {
        String raw = request.get("password");
        if (raw == null)
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "password required"));
        String hashed = passwordEncoder.encode(raw);
        return ResponseEntity.ok(Map.of("success", true, "hash", hashed));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            User user = userService.updateUser(id, request.get("fullName"), request.get("email"));
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "User updated successfully",
                    "user", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }
}
