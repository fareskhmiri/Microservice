FROM  openjdk:11-slim
EXPOSE 8087
ADD /target/conge-service-0.0.1-SNAPSHOT.jar conge-service.jar
ENTRYPOINT ["java", "-jar", "conge-service.jar"]