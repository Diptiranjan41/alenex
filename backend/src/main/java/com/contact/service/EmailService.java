package com.contact.service;

import com.contact.model.Contact;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.admin.email}")
    private String adminEmail;

    private static final String BRAND_NAME = "ALENEX";
    private static final String BRAND_COLOR = "#E63946";
    private static final String DARK_BG = "#0A0A0A";
    private static final String CARD_BG = "#141414";
    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    @Async
    public void sendContactNotification(Contact contact) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, BRAND_NAME + " Website");
            helper.setTo(adminEmail);
            helper.setSubject("New Contact Form Submission — " + contact.getName());
            helper.setText(buildAdminNotificationHtml(contact), true);

            mailSender.send(message);
            log.info("Notification email sent for contact ID: {}", contact.getId());

            sendAutoReply(contact);
        } catch (Exception e) {
            log.error("Failed to send email notification: {}", e.getMessage());
        }
    }

    @Async
    public void sendAutoReply(Contact contact) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, BRAND_NAME);
            helper.setTo(contact.getEmail());
            helper.setSubject("Thanks for reaching out to " + BRAND_NAME);
            helper.setText(buildAutoReplyHtml(contact), true);

            mailSender.send(message);
            log.info("Auto-reply sent to: {}", contact.getEmail());
        } catch (Exception e) {
            log.error("Failed to send auto-reply: {}", e.getMessage());
        }
    }

    // ---------- HTML TEMPLATES ----------

    private String buildAdminNotificationHtml(Contact contact) {
        String createdAt = contact.getCreatedAt() != null
                ? contact.getCreatedAt().format(DATE_FORMAT)
                : "";

        return """
            <!DOCTYPE html>
            <html>
            <head><meta charset="UTF-8"></head>
            <body style="margin:0;padding:0;background-color:%s;font-family:'Segoe UI',Arial,sans-serif;">
              <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="background-color:%s;padding:32px 16px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="100%%" style="max-width:560px;background-color:%s;border:1px solid #4A1A1F;border-radius:16px;overflow:hidden;">
                      <tr>
                        <td style="background-color:%s;padding:20px 28px;">
                          <span style="color:#ffffff;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">%s</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:28px;">
                          <h2 style="margin:0 0 4px 0;color:#ffffff;font-size:20px;">New Contact Form Submission</h2>
                          <p style="margin:0 0 24px 0;color:#9A9A9A;font-size:13px;">Received on %s</p>

                          <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                            <tr>
                              <td style="padding:8px 0;color:#9A9A9A;font-size:13px;width:100px;">Name</td>
                              <td style="padding:8px 0;color:#ffffff;font-size:14px;font-weight:600;">%s</td>
                            </tr>
                            <tr>
                              <td style="padding:8px 0;color:#9A9A9A;font-size:13px;">Email</td>
                              <td style="padding:8px 0;"><a href="mailto:%s" style="color:%s;font-size:14px;text-decoration:none;">%s</a></td>
                            </tr>
                            <tr>
                              <td style="padding:8px 0;color:#9A9A9A;font-size:13px;">Phone</td>
                              <td style="padding:8px 0;color:#ffffff;font-size:14px;">%s</td>
                            </tr>
                            <tr>
                              <td style="padding:8px 0;color:#9A9A9A;font-size:13px;">Subject</td>
                              <td style="padding:8px 0;color:#ffffff;font-size:14px;">%s</td>
                            </tr>
                          </table>

                          <div style="background-color:#0A0A0A;border:1px solid #4A1A1F;border-radius:10px;padding:16px 18px;">
                            <p style="margin:0 0 6px 0;color:#9A9A9A;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
                            <p style="margin:0;color:#D0D0D0;font-size:14px;line-height:1.6;white-space:pre-wrap;">%s</p>
                          </div>

                          <div style="text-align:center;margin-top:28px;">
                            <a href="mailto:%s" style="display:inline-block;background-color:%s;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:999px;">Reply to %s</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:16px 28px;border-top:1px solid #4A1A1F;">
                          <p style="margin:0;color:#6A6A6A;font-size:11px;text-align:center;">This is an automated notification from your %s website contact form.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """.formatted(
                DARK_BG, DARK_BG, CARD_BG, BRAND_COLOR, BRAND_NAME,
                createdAt,
                escape(contact.getName()),
                contact.getEmail(), BRAND_COLOR, escape(contact.getEmail()),
                contact.getPhone() != null && !contact.getPhone().isBlank() ? escape(contact.getPhone()) : "—",
                contact.getSubject() != null && !contact.getSubject().isBlank() ? escape(contact.getSubject()) : "—",
                escape(contact.getMessage()),
                contact.getEmail(), BRAND_COLOR, contact.getName().split(" ")[0],
                BRAND_NAME
        );
    }

    private String buildAutoReplyHtml(Contact contact) {
        String firstName = contact.getName() != null && !contact.getName().isBlank()
                ? contact.getName().split(" ")[0]
                : "there";

        return """
            <!DOCTYPE html>
            <html>
            <head><meta charset="UTF-8"></head>
            <body style="margin:0;padding:0;background-color:%s;font-family:'Segoe UI',Arial,sans-serif;">
              <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="background-color:%s;padding:32px 16px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="100%%" style="max-width:560px;background-color:%s;border:1px solid #4A1A1F;border-radius:16px;overflow:hidden;">
                      <tr>
                        <td style="background-color:%s;padding:24px 28px;text-align:center;">
                          <span style="color:#ffffff;font-size:16px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">%s</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:32px 28px;">
                          <h2 style="margin:0 0 16px 0;color:#ffffff;font-size:22px;">Hi %s, thanks for reaching out! 👋</h2>
                          <p style="margin:0 0 16px 0;color:#D0D0D0;font-size:15px;line-height:1.7;">
                            We've received your message and appreciate you taking the time to contact us.
                            Our team typically responds within <strong style="color:#ffffff;">24–48 hours</strong>.
                          </p>

                          <div style="background-color:#0A0A0A;border:1px solid #4A1A1F;border-radius:10px;padding:16px 18px;margin:20px 0;">
                            <p style="margin:0 0 6px 0;color:#9A9A9A;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Your message</p>
                            <p style="margin:0;color:#D0D0D0;font-size:14px;line-height:1.6;white-space:pre-wrap;">%s</p>
                          </div>

                          <p style="margin:0 0 4px 0;color:#D0D0D0;font-size:15px;line-height:1.7;">
                            In the meantime, feel free to reply directly to this email if you have anything to add.
                          </p>

                          <p style="margin:28px 0 0 0;color:#D0D0D0;font-size:15px;">
                            Best regards,<br/>
                            <strong style="color:#ffffff;">The %s Team</strong>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:16px 28px;border-top:1px solid #4A1A1F;">
                          <p style="margin:0;color:#6A6A6A;font-size:11px;text-align:center;">This is an automated confirmation — you don't need to reply unless you want to add more details.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """.formatted(
                DARK_BG, DARK_BG, CARD_BG, BRAND_COLOR, BRAND_NAME,
                escape(firstName),
                escape(contact.getMessage()),
                BRAND_NAME
        );
    }

    // Basic HTML-escaping to avoid broken markup or injection from user input
    private String escape(String input) {
        if (input == null) return "";
        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;");
    }
}