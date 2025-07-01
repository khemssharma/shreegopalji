![Diagram](./Diagram.jpg)
# Documentation Of Work

**Date:** 28-06-2025  
**Author:** Ayush Sharma  
**Project:** Shree-Gopal-ji — Centralized System + Website 

---

## Successfully Integrated API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` – Sign up a new user  
- `POST /api/auth/login` – Login a user  
- `POST /api/auth/logout` – Logout user  
- `GET /api/auth/profile` – Get user details  

### 📁 Project Management
- `POST /api/project/` – Create a new project  
- `GET /api/project` – Get all projects' details
- `GET /api/project/:id` – Get any project's details

### 🧱Material Management
- `POST /api/materials/dumped` - Add a new Material to Site
- `GET /api/materials/` - Get details of all dumped Material
- `POST /dumped/:id/usage` - Update Material Usage

### 🏗️ Machine Management
- `POST /api/machines/create` – Add a new machine  
- `POST /api/machines/assign` – Assign a machine to a project  
- `GET /api/machines` – Get all machine's details  
- `POST /api/machines/:<machineId>/usage` – Update any machine's usage  

### 👷 Employee Management
- `POST /api/users` – Add a new user  
- `GET /api/users` – Get all users' details  
- `POST /api/users/assign` – Assign a user to a site  
- `POST /api/users/attendance` – Take user attendance  
- `GET /api/users/attendance` – Get user attendance  

---

## 🚀 Future Scope
1. **Automated Material Order Generation** when stock is empty.  
2. Weekly target & progress tracking / milestone setting  
3. **Detection systems** for:
  - Payment fraud  
  - Fake machine usage  
  - False attendance  
4. **Site-wise expense & ledger management** with cost/profit calculation  
5. Impovement in styles and content of the website.
6. Domain Needs to be purchased.
7. Free Tier server is slow. Upgrading to a better Plan is recommended.
8. Android App needs to be published on Google Play Store (Optional)

---
