package com.taskflow.config;

import com.taskflow.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private UserService userService;

    @Autowired
    private com.taskflow.repository.UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin user exists
        if (!userRepository.existsByEmail("admin@taskflow.com")) {
            // Use service so password is hashed
            userService.createUser("admin@taskflow.com", "admin123", "Admin User", "ADMIN", null);
            System.out.println("✓ Admin account created: admin@taskflow.com");
        } else {
            System.out.println("✓ Admin account already exists");
        }
    }
}
