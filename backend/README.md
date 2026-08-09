# Backend API for Contact Page

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contacts/submit` | Submit contact form |
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/{id}` | Get single contact |
| PATCH | `/api/contacts/{id}/read` | Mark as read |
| DELETE | `/api/contacts/{id}` | Delete contact |
| GET | `/api/contacts/unread-count` | Get unread count |

## Setup
1. Update `application.properties` with DB credentials
2. Run `mvn clean install`
3. Run `mvn spring-boot:run`
4. API at `http://localhost:8080`
