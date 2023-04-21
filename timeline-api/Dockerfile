FROM amazoncorretto:17.0.5
COPY target/timeline-api-0.0.1-SNAPSHOT.jar timeline-api.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=docker", "timeline-api.jar"]