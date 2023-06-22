FROM openjdk:11
EXPOSE 8084
ADD target/participation-service-0.0.1-SNAPSHOT.jar participation-service.jar
ENTRYPOINT ["java" , "-jar" , "participation-service.jar"]