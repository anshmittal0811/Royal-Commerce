package com.auth_service.exception;

/**
 * Exception thrown when attempting to retrieve a user that does not exist in the system.
 * This exception indicates that the requested user ID does not correspond to any registered user.
 */
public class UserNotFoundException extends RuntimeException {

    /**
     * Constructs a new UserNotFoundException with the specified user ID.
     *
     * @param userId the user ID that was not found
     */
    public UserNotFoundException(Long userId) {
        super(String.format("User not found with ID: %d", userId));
    }

    /**
     * Constructs a new UserNotFoundException with the specified user ID and cause.
     *
     * @param userId the user ID that was not found
     * @param cause the cause of this exception
     */
    public UserNotFoundException(Long userId, Throwable cause) {
        super(String.format("User not found with ID: %d", userId), cause);
    }

}