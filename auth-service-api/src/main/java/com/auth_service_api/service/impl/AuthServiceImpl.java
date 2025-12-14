package com.auth_service_api.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.auth_service_api.dto.LoginRequest;
import com.auth_service_api.dto.RegisterRequest;
import com.auth_service_api.entity.User;
import com.auth_service_api.repository.UserRepository;
import com.auth_service_api.util.JwtUtil;
import com.auth_service_api.service.AuthService;
import com.auth_service_api.exception.EmailAlreadyExistsException;
import org.modelmapper.ModelMapper;

/**
 * Implementation of {@link AuthService} providing authentication and registration functionality.
 * 
 * <p>This service handles:
 * <ul>
 *   <li>User login with email and password authentication</li>
 *   <li>User registration with email uniqueness validation</li>
 *   <li>JWT token generation upon successful authentication</li>
 * </ul>
 * 
 * <p>All operations are logged for audit and debugging purposes.
 * 
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private static final String REGISTRATION_SUCCESS_MESSAGE = "User registered successfully";

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    /**
     * Authenticates a user with email and password, and returns a JWT token upon success.
     * 
     * <p>This method:
     * <ol>
     *   <li>Validates the login request</li>
     *   <li>Retrieves the user by email</li>
     *   <li>Verifies the provided password</li>
     *   <li>Generates and returns a JWT token</li>
     * </ol>
     * 
     * @param loginRequest the login request containing email and password
     * @return JWT token string for authenticated user
     * @throws UsernameNotFoundException if no user exists with the provided email
     * @throws BadCredentialsException if the provided password is incorrect
     * @throws IllegalArgumentException if the login request is null or contains invalid data
     */
    @Override
    public String login(LoginRequest loginRequest) {
        // Validate input first to avoid null pointer access
        validateLoginRequest(loginRequest);

        String email = loginRequest.getEmail();
        log.debug("Login request received for email: {}", email);
        log.info("Processing login attempt for email: {}", email);

        // Retrieve user from database
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("Login failed: User not found with email: {}", email);
                    return new UsernameNotFoundException(
                            String.format("User not found with email: %s", email));
                });

        log.debug("User found with ID: {} and role: {}", user.getId(), user.getRole());

        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            log.warn("Login failed: Invalid password for email: {}", email);
            throw new BadCredentialsException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole()
        );

        log.info("Login successful for email: {} with user ID: {} and role: {}", 
                email, user.getId(), user.getRole());

        return token;
    }

    /**
     * Registers a new user in the system after validating email uniqueness.
     * 
     * <p>This method:
     * <ol>
     *   <li>Validates the registration request</li>
     *   <li>Checks if the email already exists</li>
     *   <li>Encodes the password using BCrypt</li>
     *   <li>Maps the request to a User entity</li>
     *   <li>Persists the user to the database</li>
     * </ol>
     * 
     * <p>This method is transactional, ensuring data consistency.
     * 
     * @param registerRequest the registration request containing user details
     * @return success message indicating successful registration
     * @throws EmailAlreadyExistsException if the email is already registered
     * @throws IllegalArgumentException if the registration request is null or contains invalid data
     */
    @Override
    @Transactional
    public String register(RegisterRequest registerRequest) {
        // Validate input first to avoid null pointer access
        validateRegisterRequest(registerRequest);

        String email = registerRequest.getEmail();
        log.debug("Registration request received for email: {}", email);
        log.info("Processing registration for email: {}", email);

        // Check if email already exists
        if (userRepository.findByEmail(email).isPresent()) {
            log.warn("Registration failed: Email already exists: {}", email);
            throw new EmailAlreadyExistsException(email);
        }

        // Map request to entity and encode password
        User user = modelMapper.map(registerRequest, User.class);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        log.debug("Creating user entity for email: {} with role: {}", email, user.getRole());

        // Save user to database
        User savedUser = userRepository.save(user);

        log.info("User successfully registered with email: {}, user ID: {}, and role: {}", 
                email, savedUser.getId(), savedUser.getRole());

        return REGISTRATION_SUCCESS_MESSAGE;
    }

    /**
     * Validates the login request to ensure it contains required fields.
     * 
     * @param loginRequest the login request to validate
     * @throws IllegalArgumentException if the request is null or contains invalid data
     */
    private void validateLoginRequest(LoginRequest loginRequest) {
        if (loginRequest == null) {
            log.error("Login request is null");
            throw new IllegalArgumentException("Login request cannot be null");
        }

        if (!StringUtils.hasText(loginRequest.getEmail())) {
            log.error("Login request missing email");
            throw new IllegalArgumentException("Email is required");
        }

        if (!StringUtils.hasText(loginRequest.getPassword())) {
            log.error("Login request missing password");
            throw new IllegalArgumentException("Password is required");
        }
    }

    /**
     * Validates the registration request to ensure it contains required fields.
     * 
     * @param registerRequest the registration request to validate
     * @throws IllegalArgumentException if the request is null or contains invalid data
     */
    private void validateRegisterRequest(RegisterRequest registerRequest) {
        if (registerRequest == null) {
            log.error("Registration request is null");
            throw new IllegalArgumentException("Registration request cannot be null");
        }

        if (!StringUtils.hasText(registerRequest.getEmail())) {
            log.error("Registration request missing email");
            throw new IllegalArgumentException("Email is required");
        }

        if (!StringUtils.hasText(registerRequest.getPassword())) {
            log.error("Registration request missing password");
            throw new IllegalArgumentException("Password is required");
        }

        if (!StringUtils.hasText(registerRequest.getName())) {
            log.error("Registration request missing name");
            throw new IllegalArgumentException("Name is required");
        }

        if (registerRequest.getRole() == null) {
            log.error("Registration request missing role");
            throw new IllegalArgumentException("User role is required");
        }
    }
}