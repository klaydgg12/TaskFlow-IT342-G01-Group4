package com.taskflow.config;

import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.ConfigurableEnvironment;

public class DatabaseConfigLogger implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {

    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
        ConfigurableEnvironment environment = event.getEnvironment();
        
        System.out.println("========================================");
        System.out.println("DATABASE CONFIGURATION CHECK");
        System.out.println("========================================");
        System.out.println("DATABASE_URL: " + environment.getProperty("DATABASE_URL", "NOT SET"));
        System.out.println("SPRING_DATASOURCE_URL: " + environment.getProperty("SPRING_DATASOURCE_URL", "NOT SET"));
        System.out.println("SPRING_DATASOURCE_USERNAME: " + environment.getProperty("SPRING_DATASOURCE_USERNAME", "NOT SET"));
        System.out.println("SPRING_DATASOURCE_PASSWORD: " + (environment.getProperty("SPRING_DATASOURCE_PASSWORD") != null ? "***SET***" : "NOT SET"));
        System.out.println("spring.datasource.url: " + environment.getProperty("spring.datasource.url", "NOT SET"));
        System.out.println("spring.datasource.username: " + environment.getProperty("spring.datasource.username", "NOT SET"));
        System.out.println("spring.datasource.password: " + (environment.getProperty("spring.datasource.password") != null ? "***SET***" : "NOT SET"));
        System.out.println("PORT: " + environment.getProperty("PORT", "NOT SET"));
        System.out.println("========================================");
    }
}

