package com.auth_service_api.service;

import java.util.List;
import com.auth_service_api.entity.User;
import com.auth_service_api.exception.UserNotFoundException;

/**
 * Service interface for user retrieval operations.
 * 
 * <p>Provides methods for retrieving user information from the system.
 * 
 */
public interface UserService {

    /**
     * Retrieves a user by their unique identifier.
     * 
     * @param id the unique identifier of the user
     * @return the user entity if found
     * @throws UserNotFoundException if no user exists with the provided ID
     * @throws IllegalArgumentException if the provided ID is null or invalid
     */
    User getUserById(Long id) throws UserNotFoundException, IllegalArgumentException;

    /**
     * Retrieves all users from the system.
     * 
     * @return a list of all users, or an empty list if no users exist
     */
    List<User> getAllUsers();

}