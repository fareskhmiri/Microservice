FROM  openjdk:11
EXPOSE 8087
ADD /target/Department-service-0.0.1-SNAPSHOT Department-service.jar
ENTRYPOINT ["java", "-jar", "Department-service.jar"]