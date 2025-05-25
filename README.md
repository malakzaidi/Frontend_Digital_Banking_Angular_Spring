# 🌐 Digital Banking Application (Spring Boot & Angular) 💰

Welcome to the **Digital Banking Application**, a modern, full-stack web application designed to manage customers, bank accounts, and transactions. This project features a robust backend built with **Spring Boot** and a dynamic frontend developed with **Angular**. It provides a secure and user-friendly platform for performing banking operations such as customer management, account handling, and transaction processing.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [📽 Video Demonstration](#-video-demonstration)
- [🛠 Technologies Used](#-technologies-used)
- [🏗 Project Structure](#-project-structure)
- [📊 Diagrams](#-diagrams)
  - [Use Case Diagram](#use-case-diagram)
  - [Sequence Diagram](#sequence-diagram)
  - [Class Diagram](#class-diagram)
  - [Architecture Diagram](#architecture-diagram)
- [⚙️ Prerequisites](#-prerequisites)
- [🚀 Setup Instructions](#-setup-instructions)
  - [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
  - [Frontend Setup (Angular)](#frontend-setup-angular)
- [🌍 Running the Application](#-running-the-application)
- [🔍 API Endpoints](#-api-endpoints)
- [📂 Database Configuration](#-database-configuration)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📞 Contact](#-contact)

---

## ✨ Features

This application provides a comprehensive set of features for digital banking:

- **Customer Management** 🧑‍💼
  - Create, read, update, and delete (CRUD) customer profiles.
  - Search customers by keyword.
- **Account Management** 🏦
  - Create and manage current and savings accounts.
  - View account details and transaction history.
- **Transaction Processing** 💸
  - Perform debit, credit, and transfer operations.
  - Track transaction history with timestamps and descriptions.
- **Secure APIs** 🔒
  - RESTful APIs secured with Spring Security (optional configuration).
- **Responsive Frontend** 📱
  - Angular-based UI for a seamless user experience across devices.
- **Database Integration** 🗄️
  - Supports MySQL for persistent data storage.

---

## 📽 Video Demonstration

https://github.com/user-attachments/assets/13a2996d-60a6-4003-b567-3fa595289dcd 



## 🛠 Technologies Used

The project leverages modern technologies to ensure scalability, performance, and maintainability:

| **Component**      | **Technology**                     | **Version**        |
|---------------------|------------------------------------|--------------------|
| **Backend**         | Spring Boot                        | 3.x                |
| **Database**        | MySQL                              | 8.x                |
| **ORM**             | Spring Data JPA, Hibernate         | Latest             |
| **Build Tool**      | Maven                              | 3.x                |
| **Frontend**        | Angular                            | 16.x or higher     |
| **API Testing**     | Postman/Swagger (optional)         | -                  |
| **Version Control** | Git                                | -                  |

---

## 🏗 Project Structure

The project is divided into two main parts: the **backend** (Spring Boot) and the **frontend** (Angular). Below is the high-level structure:

```
Digital_Banking_application_Spring_Angular-_Backend/
├── src/                        # Backend source code (Spring Boot)
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/digitalbanking/
│   │   │       ├── controller/   # REST controllers for API endpoints
│   │   │       ├── entity/       # JPA entities (Customer, Account, etc.)
│   │   │       ├── repository/   # Spring Data JPA repositories
│   │   │       ├── service/      # Business logic and services
│   │   │       ├── dto/          # Data Transfer Objects
│   │   │       └── mapper/       # Mappers for DTO-to-Entity conversion
│   │   └── resources/
│   │       └── application.properties  # Backend configuration
├── frontend/                   # Angular frontend source code
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Angular components (e.g., customer, account)
│   │   │   ├── services/      # Angular services for HTTP requests
│   │   │   └── models/        # TypeScript interfaces (Customer, Account, etc.)
│   │   └── environments/      # Environment configuration (API endpoints)
├── pom.xml                    # Maven dependencies for backend
├── package.json               # Node.js dependencies for frontend
└── README.md                  # This file
```


## 📊 Diagrams

Below are placeholders for the diagrams you have prepared. Please insert the images or links to the respective diagrams in the designated sections.

### Sequence Diagram

![image](https://github.com/user-attachments/assets/1ade4edc-1656-402f-a342-255c7ce67981)


### Class Diagram

![Image](https://github.com/user-attachments/assets/3f09e90d-d792-4a63-8cb6-c6daa8de0c49)

### Architecture Diagram

![Image](https://github.com/user-attachments/assets/6f965314-e451-461c-8dc3-6a678be57137)


## ⚙️ Prerequisites

Before setting up the project, ensure you have the following installed:

- **Java**: JDK 17 or higher ☕
- **Maven**: 3.8.x or higher 🛠️
- **MySQL**: 8.x or higher 🗄️
- **Node.js**: 18.x or higher 📦
- **Angular CLI**: 16.x or higher 🌐
- **Git**: For cloning the repository 📂

---

## 🚀 Setup Instructions

### Backend Setup (Spring Boot)

1. **Clone the Repository** 📥
   ```bash
   git clone https://github.com/malakzaidi/Digital_Banking_application_Spring_Angular-_Backend.git
   cd Digital_Banking_application_Spring_Angular-_Backend
   ```

2. **Configure MySQL Database** 🗄️
   - Create a MySQL database named `bank`.
   - Update the `application.properties` file in `src/main/resources/` with your database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/bank?createDatabaseIfNotExist=true
     spring.datasource.username=root
     spring.datasource.password=your_password
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
     ```

3. **Build the Backend** 🛠️
   ```bash
   mvn clean install
   ```

4. **Run the Backend** 🚀
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

### Frontend Setup (Angular)

1. **Navigate to the Frontend Directory** 📂
   ```bash
   cd frontend
   ```

2. **Install Dependencies** 📦
   ```bash
   npm install
   ```

3. **Configure API Endpoint** 🌐
   - Update the `environment.ts` file in `frontend/src/environments/` to point to the backend API:
     ```typescript
     export const environment = {
       production: false,
       backendHost: 'http://localhost:8080'
     };
     ```

4. **Run the Frontend** 🚀
   ```bash
   ng serve
   ```
   The frontend will start on `http://localhost:4200`.

---

## 🌍 Running the Application

1. Ensure the MySQL database is running.
2. Start the Spring Boot backend (`mvn spring-boot:run`).
3. Start the Angular frontend (`ng serve`).
4. Open your browser and navigate to `http://localhost:4200` to access the application.

---

## 🔍 API Endpoints

The backend exposes RESTful APIs for managing banking operations. Below are key endpoints:

| **Method** | **Endpoint**                       | **Description**                          |
|------------|------------------------------------|------------------------------------------|
| GET        | `/customers`                      | Retrieve all customers                   |
| GET        | `/customers/{id}`                 | Retrieve a customer by ID                |
| POST       | `/customers`                      | Create a new customer                    |
| PUT        | `/customers/{id}`                 | Update an existing customer              |
| DELETE     | `/customers/{id}`                 | Delete a customer                        |
| GET        | `/accounts/{id}`                  | Retrieve account details                 |
| POST       | `/accounts/debit`                 | Debit an account                        |
| POST       | `/accounts/credit`                | Credit an account                       |
| POST       | `/accounts/transfer`              | Transfer funds between accounts          |

For a complete API documentation, you can integrate **Swagger** by adding the following dependency to `pom.xml`:
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.1.0</version>
</dependency>
```
Then access Swagger UI at `http://localhost:8080/swagger-ui.html`.

---

## 📂 Database Configuration

The application uses **MySQL** as the primary database. Key entities include:

- **Customer**: Stores customer information (ID, name, email).
- **BankAccount**: Represents accounts (ID, type, balance, status, etc.).
- **AccountOperation**: Tracks transactions (ID, operation date, amount, type).

The database schema is automatically created/updated via **Spring Data JPA** (`spring.jpa.hibernate.ddl-auto=update`).

---

## 🤝 Contributing

Contributions are welcome! 🚀 Follow these steps to contribute:

1. Fork the repository 🍴
2. Create a new branch (`git checkout -b feature/your-feature`) 🌿
3. Commit your changes (`git commit -m "Add your feature"`) 📝
4. Push to the branch (`git push origin feature/your-feature`) 🚀
5. Open a Pull Request 📬

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

For questions or support, feel free to reach out:

- **GitHub**: [malakzaidi](https://github.com/malakzaidi)
- **Email**: malakzaidi@example.com (replace with actual email)
- **Issues**: Open an issue on this repository 📢

---

🌟 **Thank you for exploring the Digital Banking Application!** 🌟  
We hope this project inspires you to build innovative banking solutions. Happy coding! 💻
