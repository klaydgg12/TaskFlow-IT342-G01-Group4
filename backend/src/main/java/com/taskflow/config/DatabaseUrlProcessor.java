package com.taskflow.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Iterator;

public class DatabaseUrlProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        // Log all database-related environment variables for debugging
        System.out.println("=== Database URL Processor STARTING ===");
        System.out.println("Checking environment variables...");
        
        String databaseUrl = environment.getProperty("DATABASE_URL");
        String springDatasourceUrl = environment.getProperty("SPRING_DATASOURCE_URL");
        
        System.out.println("DATABASE_URL: " + (databaseUrl != null ? maskPassword(databaseUrl) : "null"));
        System.out.println("SPRING_DATASOURCE_URL: " + (springDatasourceUrl != null ? maskPassword(springDatasourceUrl) : "null"));
        
        String jdbcUrl = null;
        String username = null;
        String password = null;
        
        // Check DATABASE_URL first (Render's standard env var - most reliable)
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            if (databaseUrl.startsWith("jdbc:")) {
                System.out.println("DATABASE_URL already in JDBC format, using as-is");
                jdbcUrl = databaseUrl;
            } else if (databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("postgres://")) {
                System.out.println("Converting DATABASE_URL from postgresql:// to jdbc:postgresql://");
                Map<String, String> result = convertPostgresUrlToJdbc(databaseUrl);
                jdbcUrl = result.get("url");
                username = result.get("username");
                password = result.get("password");
            }
        }
        // Fallback to SPRING_DATASOURCE_URL if DATABASE_URL not available
        else if (springDatasourceUrl != null && !springDatasourceUrl.isEmpty()) {
            // If it's already in JDBC format, use it
            if (springDatasourceUrl.startsWith("jdbc:")) {
                System.out.println("SPRING_DATASOURCE_URL already in JDBC format");
                jdbcUrl = springDatasourceUrl;
            }
            // If it's in postgresql:// format, convert it
            else if (springDatasourceUrl.startsWith("postgresql://") || springDatasourceUrl.startsWith("postgres://")) {
                System.out.println("Converting SPRING_DATASOURCE_URL from postgresql:// to jdbc:postgresql://");
                Map<String, String> result = convertPostgresUrlToJdbc(springDatasourceUrl);
                jdbcUrl = result.get("url");
                username = result.get("username");
                password = result.get("password");
            }
        }
        
        // If we have a converted URL, set it
        if (jdbcUrl != null) {
            Map<String, Object> properties = new HashMap<>();
            properties.put("spring.datasource.url", jdbcUrl);
            
            // Only set username/password if they were extracted from URL
            // Otherwise, use the separate env vars (SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD)
            if (username != null && !username.isEmpty()) {
                properties.put("spring.datasource.username", username);
            }
            if (password != null && !password.isEmpty()) {
                properties.put("spring.datasource.password", password);
            }
            
            System.out.println("Setting spring.datasource.url: " + maskPassword(jdbcUrl));
            System.out.println("Setting spring.datasource.username: " + username);
            
            MapPropertySource propertySource = new MapPropertySource("databaseUrlProcessor", properties);
            environment.getPropertySources().addFirst(propertySource);
        } else {
            System.out.println("No database URL conversion needed");
        }
    }

    private Map<String, String> convertPostgresUrlToJdbc(String renderUrl) {
        Map<String, String> result = new HashMap<>();
        
        try {
            // Render format: postgresql://user:password@host:port/dbname
            // Convert to: jdbc:postgresql://host:port/dbname
            String urlWithoutProtocol = renderUrl.replace("postgresql://", "").replace("postgres://", "");
            int atIndex = urlWithoutProtocol.indexOf('@');
            
            if (atIndex > 0) {
                // Extract username and password
                String userPass = urlWithoutProtocol.substring(0, atIndex);
                int colonIndex = userPass.indexOf(':');
                String user = colonIndex > 0 ? userPass.substring(0, colonIndex) : userPass;
                String pass = colonIndex > 0 ? userPass.substring(colonIndex + 1) : "";
                
                // URL decode in case of special characters
                try {
                    user = URLDecoder.decode(user, StandardCharsets.UTF_8.name());
                    pass = URLDecoder.decode(pass, StandardCharsets.UTF_8.name());
                } catch (Exception e) {
                    // If decoding fails, use original
                }
                
                // Extract host, port, and database name
                String hostDb = urlWithoutProtocol.substring(atIndex + 1);
                int slashIndex = hostDb.indexOf('/');
                String hostPort = slashIndex > 0 ? hostDb.substring(0, slashIndex) : hostDb;
                String dbName = slashIndex > 0 ? hostDb.substring(slashIndex + 1) : "taskflowdb";
                
                // Handle query parameters if any
                int questionMarkIndex = dbName.indexOf('?');
                if (questionMarkIndex > 0) {
                    dbName = dbName.substring(0, questionMarkIndex);
                }
                
                int portColonIndex = hostPort.lastIndexOf(':');
                String host = portColonIndex > 0 ? hostPort.substring(0, portColonIndex) : hostPort;
                String port = portColonIndex > 0 ? hostPort.substring(portColonIndex + 1) : "5432";
                
                // Construct JDBC URL for PostgreSQL
                String jdbcUrl = String.format("jdbc:postgresql://%s:%s/%s",
                    host, port, dbName);
                
                result.put("url", jdbcUrl);
                result.put("username", user);
                result.put("password", pass);
                
                System.out.println("Converted PostgreSQL URL - Host: " + host + ", Port: " + port + ", DB: " + dbName);
            } else {
                // No @ symbol, might be a different format
                System.err.println("Warning: Could not parse database URL format: " + maskPassword(renderUrl));
                result.put("url", renderUrl.startsWith("jdbc:") ? renderUrl : "jdbc:" + renderUrl);
            }
        } catch (Exception e) {
            System.err.println("Error converting DATABASE_URL: " + e.getMessage());
            e.printStackTrace();
            // Fallback: try to add jdbc: prefix
            result.put("url", renderUrl.startsWith("jdbc:") ? renderUrl : "jdbc:" + renderUrl);
        }
        
        return result;
    }
    
    private String maskPassword(String url) {
        if (url == null) return "null";
        // Mask password in URL for logging
        return url.replaceAll(":([^:@/]+)@", ":****@");
    }
}

