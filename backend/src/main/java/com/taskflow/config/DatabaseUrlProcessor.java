package com.taskflow.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

public class DatabaseUrlProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        String databaseUrl = environment.getProperty("DATABASE_URL");
        String springDatasourceUrl = environment.getProperty("SPRING_DATASOURCE_URL");
        
        String jdbcUrl = null;
        
        // Check SPRING_DATASOURCE_URL first (from render.yaml)
        if (springDatasourceUrl != null && !springDatasourceUrl.isEmpty()) {
            // If it's already in JDBC format, use it
            if (springDatasourceUrl.startsWith("jdbc:")) {
                return; // Already correct format
            }
            // If it's in mysql:// format, convert it
            if (springDatasourceUrl.startsWith("mysql://")) {
                jdbcUrl = convertRenderUrlToJdbc(springDatasourceUrl);
            }
        }
        // Check DATABASE_URL (Render's standard env var)
        else if (databaseUrl != null && !databaseUrl.isEmpty() && databaseUrl.startsWith("mysql://")) {
            jdbcUrl = convertRenderUrlToJdbc(databaseUrl);
        }
        
        // If we have a converted URL, set it
        if (jdbcUrl != null) {
            Map<String, Object> properties = new HashMap<>();
            properties.put("spring.datasource.url", jdbcUrl);
            
            MapPropertySource propertySource = new MapPropertySource("databaseUrlProcessor", properties);
            environment.getPropertySources().addFirst(propertySource);
        }
    }

    private String convertRenderUrlToJdbc(String renderUrl) {
        try {
            // Render format: mysql://user:password@host:port/dbname
            // Convert to: jdbc:mysql://host:port/dbname
            String urlWithoutProtocol = renderUrl.replace("mysql://", "");
            int atIndex = urlWithoutProtocol.indexOf('@');
            
            if (atIndex > 0) {
                String userPass = urlWithoutProtocol.substring(0, atIndex);
                String hostDb = urlWithoutProtocol.substring(atIndex + 1);
                
                int slashIndex = hostDb.indexOf('/');
                String hostPort = slashIndex > 0 ? hostDb.substring(0, slashIndex) : hostDb;
                String dbName = slashIndex > 0 ? hostDb.substring(slashIndex + 1) : "taskflowdb";
                
                int colonIndex = hostPort.lastIndexOf(':');
                String host = colonIndex > 0 ? hostPort.substring(0, colonIndex) : hostPort;
                String port = colonIndex > 0 ? hostPort.substring(colonIndex + 1) : "3306";
                
                return String.format("jdbc:mysql://%s:%s/%s?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true",
                    host, port, dbName);
            }
        } catch (Exception e) {
            System.err.println("Error converting DATABASE_URL: " + e.getMessage());
        }
        
        // Fallback: try to add jdbc: prefix
        return renderUrl.startsWith("jdbc:") ? renderUrl : "jdbc:" + renderUrl;
    }
}

