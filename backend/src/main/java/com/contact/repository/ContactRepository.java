package com.contact.repository;

import com.contact.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByReadFalse();
    List<Contact> findByEmail(String email);
    Page<Contact> findAllByOrderByCreatedAtDesc(Pageable pageable);
    long countByReadFalse();
}
