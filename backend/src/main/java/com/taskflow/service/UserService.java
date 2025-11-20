package com.taskflow.service;

import com.taskflow.entity.User;
import com.taskflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

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
        User saved = userRepository.save(user);
        if (saved.getGoogleId() == null) {
            saved.setGoogleId("G" + saved.getId());
            saved = userRepository.save(saved);
        }
        return saved;
    }

    public Optional<User> authenticate(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
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

    public User updateUser(Long id, String fullName, String email) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User u = user.get();
            u.setFullName(fullName);
            u.setEmail(email);
            return userRepository.save(u);
        }
        throw new RuntimeException("User not found");
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
