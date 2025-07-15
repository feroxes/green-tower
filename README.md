# Green Tower - Smart Indoor Farming System

A comprehensive smart indoor farming management system built with modern web technologies. This application helps farmers and agricultural businesses manage their indoor farming operations, including plant management, planting cycles, harvest tracking, and customer relationships.

## 🚧 Development Status

**⚠️ Important Notice:** This application is currently in active development. Not all planned functionality has been implemented yet. This is a demonstration project for educational and portfolio purposes.

**🌐 Live Demo:** The application is deployed and available at [https://green-tower-dev.net.ua/](https://green-tower-dev.net.ua/)

**⚠️ Legal Notice:** This software is proprietary and confidential. Unauthorized copying, distribution, modification, public display, or public performance of this software is strictly prohibited. All rights reserved.

## 📊 Development Progress

### ✅ Backend (Complete)

- **🟢 Authentication System** - Login, registration, email confirmation
- **🟢 Plant Management** - CRUD operations for plant types
- **🟢 Planting Management** - Planting cycles with automated state transitions
- **🟢 Harvest Management** - Harvest tracking and weight management
- **🟢 Customer Management** - Customer database and relationships
- **🟢 Order Management** - Order processing and tracking
- **🟢 User Management** - User profiles and permissions
- **🟢 Email Notifications** - Automated email system
- **🟢 Database Design** - Complete PostgreSQL schema with TypeORM
- **🟢 API Endpoints** - Full REST API with validation
- **🟢 Testing** - Comprehensive unit and integration tests

### 🔄 Frontend (In Progress)

- **🟢 Authentication Pages** - Login and registration forms
- **🟢 Plants Route** - ✅ **Ready for testing** - Complete plant management interface
- **🟡 Plantings Route** - Not yet implemented
- **🟡 Customers Route** - Partially implemented
- **🟡 Dashboard** - Not yet implemented
- **🟡 Orders Route** - Not yet implemented
- **🟡 Settings Route** - Not yet implemented
- **🟢 UI Components** - Reusable Material-UI components
- **🟢 State Management** - React Query integration
- **🟢 Multi-language Support** - Ukrainian and English interface

## 🌱 Features

### Core Functionality

- **Plant Management**: Create and manage different plant types with growth parameters
- **Planting Cycles**: Track planting batches with automated state transitions
- **Harvest Management**: Record and manage harvest entries with weight tracking
- **Customer Management**: Maintain customer database and relationships
- **User Authentication**: Secure login/registration system with email confirmation
- **Dashboard**: Overview of farming operations and key metrics

### Technical Features

- **Real-time Updates**: Automated state transitions for planting cycles
- **Multi-language Support**: Ukrainian and English interface
- **Responsive Design**: Works on desktop and mobile devices
- **Role-based Access**: Different permission levels for users
- **Email Notifications**: Automated email confirmations and notifications

## 🛠️ Tech Stack

### Backend

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with refresh tokens
- **Email**: Nodemailer for email notifications
- **Validation**: Class-validator with DTOs

### Frontend

- **Framework**: React 19 with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query for server state
- **Forms**: React Hook Form with Yup validation
- **Routing**: React Router DOM

### Infrastructure

- **Containerization**: Docker
- **Web Server**: AWS, Nginx
- **Environment**: Support for development, testing, and production

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v22 or higher)
- **npm** (v10 or higher)
- **PostgreSQL** (v17 or higher)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd green-tower
git checkout dev
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. Create a PostgreSQL database (green_tower_db, green_tower_test)
2. Note down the database credentials (host, port, username, password, database name)

### 4. Environment Configuration

#### Backend Environment (.env/.env.local)

Create the `.env` folder in the `green-tower-server` directory and add a file named `.env.local`:

```env
# Database Configuration
HOST=localhost
PORT=5432
USERNAME=your_username
PASSWORD=your_password
DB_NAME=green_tower_db

# Application Settings
AUTO_LOAD_ENTITIES=true
SYNCHRONIZE=true

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here (could be generated here: https://jwtsecrets.com/)

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password // for gmail account it could be generated here: https://myaccount.google.com/apppasswords
SMTP_FROM=your_email@gmail.com

# Application URL
APP_URL=http://localhost:3000
```

#### Test Environment (.env/.env.test)

You can use the same file from the previous step, just update DB_NAME and db credentials.

#### Frontend Environment (.env)

Create a `.env` file in the `green-tower-client` directory:

```env
PORT=3001
REACT_APP_API_URL=http://localhost:3000/
```

### 5. Start the Application

```bash
npm run start
```

## 🧪 Testing

### Backend Tests

```bash
cd green-tower-server
npm run test          # Test
npm run test:cov      # Test coverage
```

## 📁 Project Structure

```
green-tower/
├── green-tower-client/          # React frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── core/                # Main application features
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API services
│   │   ├── store/               # State management
│   │   └── types/               # TypeScript type definitions
│   └── public/                  # Static assets
├── green-tower-server/          # NestJS backend
│   ├── src/
│   │   ├── api/                 # API modules and controllers
│   │   ├── entities/            # Database entities
│   │   ├── services/            # Business logic services
│   │   └── utils/               # Utility functions
│   └── test/                    # Test files
└── nginx/                       # Nginx configuration
```

## 🔧 Development

### Code Quality

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Type safety and better development experience

### Available Scripts

#### Backend

- `npm run start:dev` - Start in development mode with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

#### Frontend

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## 📄 License & Legal

### Copyright Notice

© 2025 Green Tower. All rights reserved.

### Proprietary Software

This software is proprietary and confidential. The source code, design, and functionality are the exclusive property of the developer. Unauthorized use, reproduction, distribution, or modification of this software is strictly prohibited.

### Permitted Use

- **Portfolio Display**: You may view the live demo for portfolio evaluation purposes
- **Educational Review**: Code review for learning purposes is permitted
- **Interview Demonstration**: Use during technical interviews is allowed

### Prohibited Use

- Commercial use or monetization without explicit permission
- Copying, forking, or redistributing the source code
- Creating derivative works based on this software
- Reverse engineering or attempting to replicate functionality
- Using this software as a template for other projects

### Contact

For licensing inquiries or commercial use requests, please contact the developer directly.

---

## 📞 Support

For questions or issues related to this project, please refer to the project documentation or create an issue in the repository.
