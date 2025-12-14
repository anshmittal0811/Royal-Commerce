package com.auth_service_api.service.impl;

import java.util.Collections;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auth_service_api.entity.User;
import com.auth_service_api.repository.UserRepository;
import com.auth_service_api.service.UserService;
import com.auth_service_api.exception.UserNotFoundException;

/**
 * Implementation of {@link UserService} providing user retrieval functionality.
 * 
 * <p>This service handles:
 * <ul>
 *   <li>Retrieving a user by ID</li>
 *   <li>Retrieving all users from the system</li>
 * </ul>
 * 
 * <p>All operations are logged for audit and debugging purposes.
 * 
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    /**
     * Retrieves a user by their unique identifier.
     * 
     * <p>This method:
     * <ol>
     *   <li>Validates the provided user ID</li>
     *   <li>Queries the database for the user</li>
     *   <li>Returns the user if found</li>
     * </ol>
     * 
     * @param id the unique identifier of the user
     * @return the user entity if found
     * @throws UserNotFoundException if no user exists with the provided ID
     * @throws IllegalArgumentException if the provided ID is null or invalid
     */
    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        log.debug("Retrieving user with ID: {}", id);

        // Validate input
        validateUserId(id);

        log.info("Fetching user with ID: {}", id);

        // Retrieve user from database
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("User not found with ID: {}", id);
                    return new UserNotFoundException(id);
                });

        log.info("Successfully retrieved user with ID: {}, email: {}, role: {}", 
                user.getId(), user.getEmail(), user.getRole());

        return user;
    }

    /**
     * Retrieves all users from the system.
     * 
     * <p>This method queries the database for all registered users and returns them as a list.
     * If no users exist, an empty list is returned.
     * 
     * <p>Note: This operation can be resource-intensive for large user bases.
     * Consider implementing pagination for production use.
     * 
     * @return a list of all users, or an empty list if no users exist
     */
    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        log.debug("Retrieving all users from database");

        try {
            List<User> users = userRepository.findAll();

            log.info("Successfully retrieved {} user(s) from database", users.size());

            if (users.isEmpty()) {
                log.debug("No users found in database");
                return Collections.emptyList();
            }

            return users;

        } catch (Exception e) {
            log.error("Error occurred while retrieving all users from database", e);
            throw new RuntimeException("Failed to retrieve users: " + e.getMessage(), e);
        }
    }

    /**
     * Validates the user ID to ensure it is not null and is a positive number.
     * 
     * @param id the user ID to validate
     * @throws IllegalArgumentException if the ID is null or invalid
     */
    private void validateUserId(Long id) {
        if (id == null) {
            log.error("User ID is null");
            throw new IllegalArgumentException("User ID cannot be null");
        }

        if (id <= 0) {
            log.error("Invalid user ID: {}", id);
            throw new IllegalArgumentException("User ID must be a positive number");
        }
    }
}