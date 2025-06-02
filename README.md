# 🌐 Digital Banking Application (Spring Boot & Angular) 💰

Welcome to the **Digital Banking Application**, a comprehensive, full-stack web application designed to provide complete banking operations management. This project features a robust backend built with **Spring Boot** and a dynamic frontend developed with **Angular**, integrated with advanced security, audit systems, and data visualization capabilities.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [📽 Video Demonstration](#-video-demonstration)
- [🛠 Technologies Used](#-technologies-used)
- [🏗 Project Structure](#-project-structure)
- [📊 Diagrams](#-diagrams)
- [⚙️ Prerequisites](#-prerequisites)
- [🚀 Setup Instructions](#-setup-instructions)
- [🌍 Running the Application](#-running-the-application)
- [🔍 API Endpoints](#-api-endpoints)
- [🔐 Security & Authentication](#-security--authentication)
- [📊 Dashboard & Analytics](#-dashboard--analytics)
- [📂 Database Configuration](#-database-configuration)
- [🔍 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📞 Contact](#-contact)

---

## ✨ Features

This application provides a comprehensive set of features for modern digital banking:

### 🏦 **Core Banking Operations**
- **Account Management**
  - Create and manage Current Accounts and Savings Accounts
  - View detailed account information and balance tracking
  - Account status management (Active/Inactive)
  - Multi-account support per customer
  
- **Transaction Processing**
  - **DEBIT** operations with validation and limits
  - **CREDIT** operations with instant balance updates
  - **TRANSFER** operations between accounts (internal transfers)
  - Real-time transaction processing
  - Transaction history with detailed timestamps
  - Operation descriptions and categorization

### 👥 **Customer Management**
- **Complete CRUD Operations**
  - Create new customer profiles with validation
  - Update customer information (personal details, contact info)
  - Delete customer accounts with cascade operations
  - Advanced search functionality by name, email, or ID
  - Customer portfolio overview
  - Customer-account relationship management

### 🔐 **Security & Authentication**
- **Spring Security Integration**
  - JWT (JSON Web Token) based authentication
  - Secure session management
  - Role-based access control (RBAC)
  - Protected API endpoints
  
- **User Management System**
  - User registration and login
  - Password change functionality
  - User profile management
  - Account lockout protection
  - Session timeout handling

### 📊 **Audit & Compliance**
- **Complete Audit Trail**
  - Track user actions for every operation
  - Record authenticated user ID for all transactions
  - Timestamp logging for compliance
  - Operation history for customers and accounts
  - Data integrity tracking

### 📈 **Dashboard & Analytics**
- **Advanced Data Visualization**
  - Interactive charts using **Chart.js** and **ng-chart**
  - Account balance trends over time
  - Transaction volume analysis
  - Customer growth statistics
  - Financial performance indicators
  - Real-time dashboard updates

### 🌐 **Modern User Interface**
- **Responsive Angular Frontend**
  - Mobile-first responsive design
  - Intuitive navigation and user experience
  - Real-time data updates
  - Form validation and error handling
  - Modern Material Design components
  - Cross-browser compatibility

### 🔧 **Technical Features**
- **RESTful API Architecture**
  - Complete REST API with proper HTTP methods
  - Swagger/OpenAPI documentation
  - JSON data exchange
  - Error handling and status codes
  
- **Database Management**
  - MySQL integration with JPA/Hibernate
  - Automatic schema generation and updates
  - Database connection pooling
  - Transaction management

---

## 📽 Video Demonstration

https://github.com/user-attachments/assets/13a2996d-60a6-4003-b567-3fa595289dcd 

---

## 🛠 Technologies Used

### **Backend Technologies**
| **Component**      | **Technology**                     | **Version**        | **Purpose**                           |
|---------------------|------------------------------------|--------------------|---------------------------------------|
| **Framework**       | Spring Boot                        | 3.x                | Main backend framework                |
| **Security**        | Spring Security + JWT              | Latest             | Authentication & authorization        |
| **Database**        | MySQL                              | 8.x                | Primary data storage                  |
| **ORM**             | Spring Data JPA, Hibernate         | Latest             | Object-relational mapping             |
| **Build Tool**      | Maven                              | 3.x                | Dependency management & build         |
| **Documentation**   | Swagger/OpenAPI                    | 2.1.0              | API documentation                     |
| **Testing**         | JUnit, Mockito                     | Latest             | Unit & integration testing            |

### **Frontend Technologies**
| **Component**      | **Technology**                     | **Version**        | **Purpose**                           |
|---------------------|------------------------------------|--------------------|---------------------------------------|
| **Framework**       | Angular                            | 16.x+              | Frontend SPA framework                |
| **UI Components**   | Angular Material                   | Latest             | Modern UI components                  |
| **Charts**          | Chart.js + ng-chart               | Latest             | Data visualization                    |
| **HTTP Client**     | Angular HttpClient                 | Latest             | API communication                     |
| **Routing**         | Angular Router                     | Latest             | Navigation & routing                  |
| **Forms**           | Angular Reactive Forms             | Latest             | Form handling & validation            |

### **Development & Deployment**
| **Component**      | **Technology**                     | **Version**        | **Purpose**                           |
|---------------------|------------------------------------|--------------------|---------------------------------------|
| **Version Control** | Git                                | Latest             | Source code management                |
| **API Testing**     | Postman                            | Latest             | API endpoint testing                  |
| **Development**     | IntelliJ IDEA / VS Code            | Latest             | IDE for development                   |

---

## 🏗 Project Structure

```
Digital_Banking_Application/
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/digitalbanking/
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   │   ├── CustomerController.java
│   │   │   │   │   ├── AccountController.java
│   │   │   │   │   ├── OperationController.java
│   │   │   │   │   └── AuthController.java
│   │   │   │   ├── entity/          # JPA Entities
│   │   │   │   │   ├── Customer.java
│   │   │   │   │   ├── BankAccount.java
│   │   │   │   │   ├── CurrentAccount.java
│   │   │   │   │   ├── SavingAccount.java
│   │   │   │   │   ├── AccountOperation.java
│   │   │   │   │   └── User.java
│   │   │   │   ├── repository/      # Spring Data Repositories
│   │   │   │   │   ├── CustomerRepository.java
│   │   │   │   │   ├── BankAccountRepository.java
│   │   │   │   │   ├── AccountOperationRepository.java
│   │   │   │   │   └── UserRepository.java
│   │   │   │   ├── service/         # Business Logic Services
│   │   │   │   │   ├── BankAccountService.java
│   │   │   │   │   ├── CustomerService.java
│   │   │   │   │   └── UserService.java
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   │   ├── CustomerDTO.java
│   │   │   │   │   ├── BankAccountDTO.java
│   │   │   │   │   └── OperationDTO.java
│   │   │   │   ├── mapper/          # DTO-Entity Mappers
│   │   │   │   ├── security/        # Security Configuration
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   └── exception/       # Custom Exceptions
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── application-dev.properties
│   │   └── test/                   # Unit & Integration Tests
│   ├── pom.xml                     # Maven Dependencies
│   └── Dockerfile                  # Docker Configuration
├── frontend/                       # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── customer/       # Customer Management
│   │   │   │   ├── account/        # Account Management
│   │   │   │   ├── operation/      # Transaction Operations
│   │   │   │   ├── dashboard/      # Analytics Dashboard
│   │   │   │   ├── auth/           # Authentication
│   │   │   │   └── shared/         # Shared Components
│   │   │   ├── services/
│   │   │   │   ├── customer.service.ts
│   │   │   │   ├── account.service.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── dashboard.service.ts
│   │   │   ├── models/             # TypeScript Interfaces
│   │   │   ├── guards/             # Route Guards
│   │   │   ├── interceptors/       # HTTP Interceptors
│   │   │   └── pipes/              # Custom Pipes
│   │   ├── assets/                 # Static Assets
│   │   └── environments/           # Environment Configuration
│   ├── package.json                # NPM Dependencies
│   └── angular.json                # Angular Configuration
├── docs/                           # Documentation
│   ├── api-documentation.md
│   ├── user-guide.md
│   └── deployment-guide.md
└── README.md                       # This File
```

---

## 📊 Diagrams

### Sequence Diagram
![Sequence Diagram](https://github.com/user-attachments/assets/1ade4edc-1656-402f-a342-255c7ce67981)

### Class Diagram
![Class Diagram](https://github.com/user-attachments/assets/3f09e90d-d792-4a63-8cb6-c6daa8de0c49)

### Architecture Diagram
![Architecture Diagram](https://github.com/user-attachments/assets/6f965314-e451-461c-8dc3-6a678be57137)

---

## ⚙️ Prerequisites

Ensure you have the following installed:

### **Required Software**
- **Java**: JDK 17 or higher ☕
- **Maven**: 3.8.x or higher 🛠️
- **MySQL**: 8.x or higher 🗄️
- **Node.js**: 18.x or higher 📦
- **Angular CLI**: 16.x or higher 🌐
- **Git**: Latest version 📂

### **Optional Tools**
- **Docker**: For containerized deployment 🐳
- **Postman**: For API testing 📮
- **VS Code** or **IntelliJ IDEA**: For development 💻

---

## 🚀 Setup Instructions

### **Backend Setup (Spring Boot)**

1. **Clone the Repository** 📥
   ```bash
   git clone https://github.com/malakzaidi/Digital_Banking_application_Spring_Angular-_Backend.git
   cd Digital_Banking_application_Spring_Angular-_Backend
   ```

2. **Configure MySQL Database** 🗄️
   ```sql
   CREATE DATABASE bank;
   CREATE USER 'bank_user'@'localhost' IDENTIFIED BY 'bank_password';
   GRANT ALL PRIVILEGES ON bank.* TO 'bank_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Update Application Properties** ⚙️
   ```properties
   # Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/bank?createDatabaseIfNotExist=true
   spring.datasource.username=bank_user
   spring.datasource.password=bank_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   
   # JWT Configuration
   jwt.secret=mySecretKey
   jwt.expiration=86400000
   
   # Server Configuration
   server.port=8080
   
   # Swagger Configuration
   springdoc.api-docs.path=/api-docs
   springdoc.swagger-ui.path=/swagger-ui.html
   ```

4. **Build and Run Backend** 🛠️
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### **Frontend Setup (Angular)**

1. **Navigate to Frontend Directory** 📂
   ```bash
   cd frontend
   ```

2. **Install Dependencies** 📦
   ```bash
   npm install
   ```

3. **Configure Environment** 🌐
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     backendHost: 'http://localhost:8080',
     jwtTokenKey: 'jwt-token'
   };
   ```

4. **Run Frontend** 🚀
   ```bash
   ng serve
   ```

---

## 🌍 Running the Application

### **Development Mode**
1. Start MySQL database server
2. Run backend: `mvn spring-boot:run` (Port 8080)
3. Run frontend: `ng serve` (Port 4200)
4. Access application: `http://localhost:4200`

### **Production Mode**
1. Build frontend: `ng build --prod`
2. Build backend: `mvn clean package`
3. Deploy JAR file to server
4. Configure production database

---

## 🔍 API Endpoints

### **Authentication Endpoints**
| **Method** | **Endpoint**                       | **Description**                          |
|------------|------------------------------------|------------------------------------------|
| POST       | `/auth/login`                     | User authentication                      |
| POST       | `/auth/register`                  | User registration                        |
| POST       | `/auth/refresh`                   | Refresh JWT token                        |
| POST       | `/auth/logout`                    | User logout                              |

### **Customer Management**
| **Method** | **Endpoint**                       | **Description**                          |
|------------|------------------------------------|------------------------------------------|
| GET        | `/api/customers`                  | Retrieve all customers                   |
| GET        | `/api/customers/{id}`             | Retrieve customer by ID                  |
| POST       | `/api/customers`                  | Create new customer                      |
| PUT        | `/api/customers/{id}`             | Update customer                          |
| DELETE     | `/api/customers/{id}`             | Delete customer                          |
| GET        | `/api/customers/search`           | Search customers by keyword              |

### **Account Management**
| **Method** | **Endpoint**                       | **Description**                          |
|------------|------------------------------------|------------------------------------------|
| GET        | `/api/accounts`                   | Retrieve all accounts                    |
| GET        | `/api/accounts/{id}`              | Retrieve account by ID                   |
| POST       | `/api/accounts/current`           | Create current account                   |
| POST       | `/api/accounts/savings`           | Create savings account                   |
| PUT        | `/api/accounts/{id}`              | Update account                           |
| DELETE     | `/api/accounts/{id}`              | Delete account                           |

### **Transaction Operations**
| **Method** | **Endpoint**                       | **Description**                          |
|------------|------------------------------------|------------------------------------------|
| POST       | `/api/accounts/{id}/debit`        | Debit account                           |
| POST       | `/api/accounts/{id}/credit`       | Credit account                          |
| POST       | `/api/accounts/transfer`          | Transfer between accounts               |
| GET        | `/api/accounts/{id}/operations`   | Get transaction history                 |
| GET        | `/api/accounts/{id}/pageOperations` | Get paginated transactions            |

### **Dashboard & Analytics**
| **Method** | **Endpoint**                       | **Description**                          |
|------------|------------------------------------|------------------------------------------|
| GET        | `/api/dashboard/stats`            | Get dashboard statistics                 |
| GET        | `/api/dashboard/charts`           | Get chart data                          |
| GET        | `/api/reports/customers`          | Customer reports                        |
| GET        | `/api/reports/transactions`       | Transaction reports                     |

**Swagger Documentation**: `http://localhost:8080/swagger-ui.html`

---

## 🔐 Security & Authentication

### **JWT Implementation**
- Token-based authentication system
- Secure password hashing using BCrypt
- Role-based access control (Admin, User)
- Token expiration and refresh mechanism

### **Security Features**
- Protected API endpoints
- CORS configuration for frontend integration
- SQL injection prevention
- XSS protection
- Session management

### **User Roles & Permissions**
- **ADMIN**: Full access to all operations
- **USER**: Limited access to own accounts and operations
- **MANAGER**: Customer and account management access

---

## 📊 Dashboard & Analytics

### **Available Charts & Metrics**
- **Account Balance Trends**: Line charts showing balance evolution
- **Transaction Volume**: Bar charts for daily/monthly transactions
- **Customer Growth**: Growth metrics over time
- **Account Type Distribution**: Pie charts for account types
- **Operation Statistics**: Transaction type breakdowns

### **Real-time Updates**
- Live dashboard data refresh
- WebSocket integration for real-time notifications
- Instant balance updates after transactions

---

## 📂 Database Configuration

### **Entity Relationships**
```sql
Customer (1) -----> (*) BankAccount
BankAccount (1) -----> (*) AccountOperation
User (1) -----> (*) AuditLog
```

### **Key Tables**
- **customers**: Customer personal information
- **bank_accounts**: Account details (current/savings)
- **account_operations**: Transaction history
- **users**: Application users and authentication
- **audit_logs**: System audit trail

### **Database Indexes**
- Customer email (unique)
- Account number (unique)
- Operation date (for performance)
- User username (unique)

---

## 🔍 Testing

### **Backend Testing**
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=CustomerServiceTest

# Generate test coverage report
mvn jacoco:report
```

### **Frontend Testing**
```bash
# Run unit tests
ng test

# Run e2e tests
ng e2e

# Generate coverage report
ng test --code-coverage
```

### **API Testing**
- Postman collection available in `/docs/postman/`
- Automated API tests with Newman
- Integration tests for all endpoints

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### **Development Workflow**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### **Code Standards**
- Follow Java coding conventions for backend
- Use Angular style guide for frontend
- Write unit tests for new features
- Update documentation for API changes

### **Commit Message Format**
```
type(scope): description

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

### **Project Maintainer**
- **GitHub**: [malakzaidi](https://github.com/malakzaidi)
- **Email**: malakzaidi@example.com
- **LinkedIn**: [Malak Zaidi](https://linkedin.com/in/malakzaidi)

### **Support Channels**
- **Issues**: [GitHub Issues](https://github.com/malakzaidi/Digital_Banking_application_Spring_Angular-_Backend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/malakzaidi/Digital_Banking_application_Spring_Angular-_Backend/discussions)
- **Wiki**: [Project Wiki](https://github.com/malakzaidi/Digital_Banking_application_Spring_Angular-_Backend/wiki)

---

## 🎯 Roadmap

### **Upcoming Features**
- [ ] Mobile application (React Native)
- [ ] Advanced reporting system
- [ ] Multi-currency support
- [ ] Integration with external payment systems
- [ ] Machine learning for fraud detection
- [ ] Microservices architecture migration

### **Version History**
- **v1.0.0** - Initial release with core banking features
- **v1.1.0** - Added JWT authentication and dashboard
- **v1.2.0** - Enhanced security and audit trail
- **v2.0.0** - Complete UI/UX redesign and advanced analytics

---

🌟 **Thank you for exploring the Digital Banking Application!** 🌟

This comprehensive banking solution demonstrates modern full-stack development practices with enterprise-grade security, analytics, and user experience. We hope this project serves as a valuable reference for building secure, scalable financial applications.

**Happy Banking! 💰💻**
