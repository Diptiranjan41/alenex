package com.contact.service;

import com.contact.dto.ContactRequest;
import com.contact.dto.ContactResponse;
import com.contact.model.Contact;
import com.contact.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {
    private final ContactRepository contactRepository;
    private final EmailService emailService;

    @Transactional
    public ContactResponse saveContact(ContactRequest request) {
        try {
            Contact contact = new Contact();
            contact.setName(request.getName());
            contact.setEmail(request.getEmail());
            contact.setPhone(request.getPhone());
            contact.setMessage(request.getMessage());
            contact.setSubject(request.getSubject());
            contact.setRead(false);
            contact.setReplied(false);

            Contact savedContact = contactRepository.save(contact);
            log.info("Contact saved with ID: {}", savedContact.getId());
            emailService.sendContactNotification(savedContact);

            return convertToResponse(savedContact, "SUCCESS", "Contact form submitted successfully");
        } catch (Exception e) {
            log.error("Error saving contact: {}", e.getMessage());
            ContactResponse errorResponse = new ContactResponse();
            errorResponse.setStatus("ERROR");
            errorResponse.setMessageType("error");
            return errorResponse;
        }
    }

    public Page<ContactResponse> getAllContacts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return contactRepository.findAll(pageable)
                .map(contact -> convertToResponse(contact, "SUCCESS", null));
    }

    public ContactResponse getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
        return convertToResponse(contact, "SUCCESS", null);
    }

    @Transactional
    public ContactResponse markAsRead(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        contact.setRead(true);
        Contact updated = contactRepository.save(contact);
        return convertToResponse(updated, "SUCCESS", "Contact marked as read");
    }

    @Transactional
    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact not found with id: " + id);
        }
        contactRepository.deleteById(id);
        log.info("Contact deleted with ID: {}", id);
    }

    public long getUnreadCount() {
        return contactRepository.countByReadFalse();
    }

    private ContactResponse convertToResponse(Contact contact, String status, String message) {
        ContactResponse response = new ContactResponse();
        response.setId(contact.getId());
        response.setName(contact.getName());
        response.setEmail(contact.getEmail());
        response.setPhone(contact.getPhone());
        response.setMessage(contact.getMessage());
        response.setSubject(contact.getSubject());
        response.setCreatedAt(contact.getCreatedAt());
        response.setRead(contact.isRead());
        response.setReplied(contact.isReplied());
        response.setStatus(status);
        response.setMessageType(status.equals("SUCCESS") ? "success" : "error");
        return response;
    }
}
