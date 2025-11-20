package com.taskflow.service;

import com.taskflow.dto.GoogleUserPayload;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Objects;

@Service
public class GoogleAuthService {

    private final RestTemplate restTemplate;
    private final String clientId;

    public GoogleAuthService(RestTemplateBuilder restTemplateBuilder,
                             @Value("${google.oauth.client-id:}") String clientId) {
        this.restTemplate = restTemplateBuilder.build();
        this.clientId = clientId;
    }

    public GoogleUserPayload verify(String idToken) {
        if (!StringUtils.hasText(idToken)) {
            throw new IllegalArgumentException("Google idToken is required");
        }
        if (!StringUtils.hasText(clientId) || "YOUR_GOOGLE_CLIENT_ID".equals(clientId)) {
            throw new IllegalStateException("Google OAuth client ID is not configured");
        }

        try {
            String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" +
                    URLEncoder.encode(idToken, StandardCharsets.UTF_8);
            URI uri = Objects.requireNonNull(URI.create(url), "Invalid Google token URL");
            RequestEntity<Void> request = RequestEntity.get(uri).build();
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    request,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    });
            Map<String, Object> body = response.getBody();
            if (body == null) {
                throw new IllegalArgumentException("Invalid Google token response");
            }
            String audience = (String) body.get("aud");
            if (!clientId.equals(audience)) {
                throw new IllegalArgumentException("Google token audience mismatch");
            }
            return GoogleUserPayload.builder()
                    .email((String) body.get("email"))
                    .name((String) body.getOrDefault("name", "Google User"))
                    .googleId((String) body.get("sub"))
                    .pictureUrl((String) body.get("picture"))
                    .locale((String) body.get("locale"))
                    .build();
        } catch (RestClientException ex) {
            throw new IllegalArgumentException("Failed to verify Google token: " + ex.getMessage(), ex);
        }
    }
}

