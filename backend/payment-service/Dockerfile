FROM eclipse-temurin:21.0.4_7-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and the source code to the working directory
COPY . .

# Run the Spring Boot application with DevTools enabled
CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.profiles=dev", \
     "-Dspring.devtools.restart.enabled=true", \
     "-Dspring.devtools.livereload.enabled=true", \
     "-Dspring.devtools.remote.secret=mysecret"]