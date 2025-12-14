package com.auth_service_api.service;

import com.auth_service_api.dto.LoginRequest;
import com.auth_service_api.dto.RegisterRequest;
import com.auth_service_api.exception.EmailAlreadyExistsException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * Service interface for authentication operations.
 * 
 * <p>Provides methods for user authentication and registration.
 * 
 * @author Auth Service Team
 * @version 1.0
 */
public interface AuthService {

    /**
     * Authenticates a user and returns a JWT token.
     * 
     * @param loginRequest the login request containing email and password
     * @return JWT token string
     * @throws UsernameNotFoundException if user is not found
     * @throws BadCredentialsException if credentials are invalid
     * @throws IllegalArgumentException if request is invalid
     */
    String login(LoginRequest loginRequest) 
            throws UsernameNotFoundException, BadCredentialsException, IllegalArgumentException;

    /**
     * Registers a new user in the system.
     * 
     * @param registerRequest the registration request containing user details
     * @return success message
     * @throws EmailAlreadyExistsException if email already exists
     * @throws IllegalArgumentException if request is invalid
     */
    String register(RegisterRequest registerRequest) 
            throws EmailAlreadyExistsException, IllegalArgumentException;

}