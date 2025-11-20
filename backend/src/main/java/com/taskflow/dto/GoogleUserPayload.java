package com.taskflow.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GoogleUserPayload {
    String email;
    String name;
    String googleId;
    String pictureUrl;
    String locale;
}

