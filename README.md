🏥 Hospital Inventory Management System – Client

A modern Hospital Inventory Management System (Frontend) built with React.js to manage medical inventory, departments, suppliers, compliance, and role-based workflows across hospitals, clinics, and associated stakeholders.

This project is designed to be scalable, role-driven, and enterprise-ready.

🚀 Features

🔐 Role-based dashboards

Hospital Admin

Manager

Employee

Client

Lawyer (case & document workflows)

📦 Inventory Management

Medical & surgical equipment tracking

Department-wise allocation

Expiry & recall management

Maintenance & calibration tracking

📊 Advanced Modules

AI Assistant (placeholder for future AI integrations)

Demand forecasting & planning

Supplier & vendor management

Emergency & critical care inventory

Audit & compliance monitoring

🧭 Structured UI

Reusable layouts

Protected routes

Modular page architecture

Centralized constants & utilities

🛠 Tech Stack

Frontend: React.js

Routing: React Router

Styling: CSS / Custom Theme

State Management: Context / Local utilities

Build Tooling: Create React App

Package Manager: npm

📂 Project Structure
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── hospital/
│   │   ├── client/
│   │   └── lawyer/
│   ├── pages/
│   │   ├── hospital/
│   │   ├── manager/
│   │   ├── employee/
│   │   ├── client/
│   │   └── lawyer/
│   ├── utils/
│   ├── styles/
│   └── index.js
├── package.json
├── package-lock.json
└── README.md

⚙️ Getting Started (Local Setup)
✅ Prerequisites

Make sure you have installed:

Node.js (v16+ recommended)

npm

Check versions:

node -v
npm -v

📥 Clone the Repository
git clone https://github.com/saurabhj-77/hopsital-inventory.git
cd hopsital-inventory/client

📦 Install Dependencies
npm install

▶️ Run the Application
npm start


The app will run on:

http://localhost:3000

🔐 Environment Variables

Create a .env file in the client directory if needed:

REACT_APP_API_BASE_URL=http://localhost:5000


⚠️ .env files are ignored via .gitignore for security reasons.

🧪 Available Scripts
Command	Description
npm start	Run app in development
npm run build	Create production build
npm test	Run tests
npm run eject	Eject CRA configuration
🔒 Git & Dependency Management

node_modules is not committed

Dependencies are managed via package.json & package-lock.json

New contributors just need:

npm install

📈 Future Enhancements

Backend API integration (Node.js / Express)

Authentication & authorization

Real-time inventory updates

AI-driven analytics

CI/CD pipeline

Docker support

🤝 Contributing

Fork the repository

Create a feature branch

git checkout -b feature/your-feature-name


Commit changes

git commit -m "feat: add new feature"


Push and create a Pull Request

📄 License

This project is currently private/internal use.
License can be added later if required.

👤 Author

Saurabh Jain
Frontend / Full-Stack Developer
GitHub: https://github.com/saurabhj-77