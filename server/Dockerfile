FROM gradle:8.5-jdk21 AS build

WORKDIR /app

COPY build.gradle.kts ./
COPY settings.gradle.kts ./
COPY src ./src
RUN gradle bootJar

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
COPY --from=build /app/src/main/resources /app/
EXPOSE 4040
CMD ["java", "-jar", "./app.jar"]
