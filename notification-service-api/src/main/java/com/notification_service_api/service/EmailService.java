package com.notification_service_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.notification_service_api.dto.PaymentResponse;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Objects;

@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(PaymentResponse paymentResponse) throws MessagingException {
        String subject = "Your purchase has been successfully completed - Order #" + paymentResponse.getOrderId();

        String htmlMessage = """
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Purchase Confirmation</title>
                        <style>
                            body { font-family: Arial, sans-serif; color: #333; }
                            .container { width: 100%; max-width: 600px; margin: 0 auto; }
                            .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
                            .content { padding: 20px; }
                            .footer { background-color: #f1f1f1; color: #333; text-align: center; padding: 10px; font-size: 12px; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { text-align: left; padding: 8px; }
                            th { background-color: #f2f2f2; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Thank you for your purchase, {userName}!</h1>
                            </div>
                            <div class="content">
                                <p>Hello {userName},</p>
                                <p>We are pleased to inform you that your purchase has been successfully processed. Below are the details of your order:</p>
                                <table>
                                    <tr>
                                        <th>Order Number:</th>
                                        <td>{orderId}</td>
                                    </tr>
                                    <tr>
                                        <th>Order Date:</th>
                                        <td>{orderDate}</td>
                                    </tr>
                                    <tr>
                                        <th>Total Amount Paid:</th>
                                        <td>${totalAmount}</td>
                                    </tr>
                                    <tr>
                                        <th>Order Status:</th>
                                        <td>{orderStatus}</td>
                                    </tr>
                                </table>
                                <h3>Customer Details</h3>
                                <p>Address: {userAddress}</p>
                                <p>Phone: {userPhone}</p>
                            </div>
                            <div class="footer">
                                <p>Thank you for shopping with us.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                """;

        htmlMessage = htmlMessage
                .replace("{userName}", paymentResponse.getUserName())
                .replace("{orderId}", String.valueOf(paymentResponse.getOrderId()))
                .replace("{orderDate}", paymentResponse.getOrderDate().toString())
                .replace("{totalAmount}", String.format("%.2f", paymentResponse.getTotalAmount()))
                .replace("{orderStatus}", paymentResponse.getOrderStatus().name())
                .replace("{userAddress}", paymentResponse.getUserAddress())
                .replace("{userPhone}", paymentResponse.getUserPhone());

        sendOrderConfirmation(paymentResponse.getUserEmail(), subject, htmlMessage);
    }

    private void sendOrderConfirmation(String toEmail, String subject, String htmlContent) throws MessagingException {
        if (toEmail == null || toEmail.isBlank()) {
            throw new IllegalArgumentException("Recipient email cannot be null or blank");
        }
        if (subject == null || subject.isBlank()) {
            throw new IllegalArgumentException("Email subject cannot be null or blank");
        }
        if (htmlContent == null || htmlContent.isBlank()) {
            throw new IllegalArgumentException("Email content cannot be null or blank");
        }
        if (fromEmail == null || fromEmail.isBlank()) {
            throw new IllegalStateException("Sender email is not configured. Please set spring.mail.username");
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        String senderEmail = Objects.requireNonNull(fromEmail, "Sender email must not be null");
        helper.setTo(toEmail);
        helper.setFrom(senderEmail);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        mailSender.send(message);
    }

}