package com.auth_service_api.configuration;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Application-level configuration class for general application beans.
 * 
 * <p>This configuration class provides:
 * <ul>
 *   <li>ModelMapper bean for object-to-object mapping</li>
 * </ul>
 * 
 * <p>The ModelMapper is used throughout the application for converting between
 * DTOs (Data Transfer Objects) and entity objects, providing a clean separation
 * between the API layer and the domain layer.
 * 
 */
@Configuration
@Slf4j
public class ApplicationConfig {

    /**
     * Creates a ModelMapper bean for object-to-object mapping.
     * 
     * <p>ModelMapper is a library that automatically maps objects based on
     * convention-over-configuration. It matches source and destination properties
     * by name and type, reducing boilerplate mapping code.
     * 
     * <p>This bean is used for:
     * <ul>
     *   <li>Converting DTOs to entity objects (e.g., RegisterRequest to User)</li>
     *   <li>Converting entity objects to DTOs</li>
     *   <li>Mapping between different object types with similar structures</li>
     * </ul>
     * 
     * <p>The default configuration uses convention-based mapping, which works
     * well when source and destination properties have matching names.
     * 
     * @return a configured ModelMapper instance
     */
    @Bean
    public ModelMapper modelMapper() {
        log.debug("Creating ModelMapper bean");
        
        ModelMapper modelMapper = new ModelMapper();
        
        // Configure ModelMapper if needed (e.g., skip null values, strict mapping, etc.)
        // modelMapper.getConfiguration().setSkipNullEnabled(true);
        
        log.info("ModelMapper bean created successfully");
        
        return modelMapper;
    }
}