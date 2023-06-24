FROM openjdk:11-slim
EXPOSE 8081
ADD /target/GestionNotification-0.0.1-SNAPSHOT.jar GestionNotification.jar
ENTRYPOINT ["java","-jar","GestionNotification.jar","-web -webAllowOthers -tcp -tcpAllowOthers -browser"]