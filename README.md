# Text to PDF Microservices Project

## Architecture

Client → API Gateway → Document Service → PDF Service

## Tech Stack

- Spring Boot 3.5.x
- Spring Cloud 2025.x
- Eureka Service Discovery
- Spring Cloud Gateway (Reactive - Netty)
- OpenPDF
- Maven

## Services

- eureka-server (8761)
- api-gateway (8080)
- document-service (8081)
- pdf-service (8082)

## Flow

1. Upload .txt file
2. Document service extracts text
3. Calls PDF service via Eureka
4. PDF generated and returned

## How to Run

1. Start Eureka
2. Start PDF Service
3. Start Document Service
4. Start API Gateway
5. Call: POST http://localhost:8080/documents/upload
