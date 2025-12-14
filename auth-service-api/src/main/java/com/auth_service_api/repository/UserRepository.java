package com.auth_service_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.auth_service_api.entity.User;
import java.util.Optional;

/**
 * Repository interface for User entity operations.
 * 
 * <p>This repository extends JpaRepository, providing standard CRUD operations
 * and custom query methods for User entities.
 * 
 * <p>Provides methods for:
 * <ul>
 *   <li>Standard CRUD operations (inherited from JpaRepository)</li>
 *   <li>Finding users by email address</li>
 * </ul>
 * 
 * @see User
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Finds a user by their email address.
     * 
     * <p>Email addresses are unique in the system, so this method will return
     * at most one user. Used primarily for authentication and duplicate checking.
     * 
     * @param email the email address to search for
     * @return an Optional containing the User if found, empty otherwise
     */
    Optional<User> findByEmail(String email);
}