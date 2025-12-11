package com.taskflow.controller;

import com.taskflow.entity.User;
import com.taskflow.repository.UserRepository;
import com.taskflow.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // Endpoint to generate JWT after OAuth login
    @GetMapping("/login/{googleId}")
    public ResponseEntity<?> login(@PathVariable String googleId) {
        try {
            User user = userRepository.findByGoogleId(googleId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Check if user is active
            if (user.getStatus() != null && !"ACTIVE".equalsIgnoreCase(user.getStatus())) {
                return ResponseEntity.status(403).body(Map.of(
                        "success", false,
                        "message", "Account is deactivated"));
            }
            
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "token", token,
                    "user", user));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "An error occurred: " + e.getMessage()));
        }
    }
}
