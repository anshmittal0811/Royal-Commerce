package com.auth_service_api.exception;

/**
 * Exception thrown when attempting to register a user with an email that already exists in the system.
 * This exception indicates a business rule violation where email uniqueness is required.
 */
public class EmailAlreadyExistsException extends RuntimeException {

    /**
     * Constructs a new EmailAlreadyExistsException with the specified email.
     *
     * @param email the email address that already exists
     */
    public EmailAlreadyExistsException(String email) {
        super(String.format("Email '%s' is already registered", email));
    }

    /**
     * Constructs a new EmailAlreadyExistsException with the specified email and cause.
     *
     * @param email the email address that already exists
     * @param cause the cause of this exception
     */
    public EmailAlreadyExistsException(String email, Throwable cause) {
        super(String.format("Email '%s' is already registered", email), cause);
    }
}

