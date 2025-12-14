package com.order_service_api.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Application configuration class for bean definitions.
 * 
 * <p>This configuration class provides:
 * <ul>
 *   <li>ModelMapper bean for object mapping between DTOs and entities</li>
 * </ul>
 * 
 */
@Configuration
public class ApplicationConfig {

    /**
     * Creates and configures a ModelMapper bean.
     * 
     * <p>The ModelMapper is configured with:
     * <ul>
     *   <li>Field matching enabled for automatic property mapping</li>
     *   <li>Private field access level for mapping private fields</li>
     * </ul>
     * 
     * @return configured ModelMapper instance
     */
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Enable field matching and allow access to private fields
        modelMapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);

        return modelMapper;
    }

}
