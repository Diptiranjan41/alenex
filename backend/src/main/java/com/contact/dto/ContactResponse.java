package com.contact.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private String subject;
    private LocalDateTime createdAt;
    private boolean read;
    private boolean replied;
    private String status;
    private String messageType;
}
