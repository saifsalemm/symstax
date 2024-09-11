# Employees Management Dashboard

A simple web-based dashboard for managing employee data using Firebase, React, Jotai for state management, and React Query for data fetching. The app provides functionality for authentication (login), listing employees, and creating/editing/deleting employee records. Protected routes ensure that only authenticated users can access the main dashboard and employee management pages.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)

## Features
- User authentication using Firebase.
- Protected routes that restrict access to certain pages.
- List employees in a table view.
- Add new employees or edit existing employee data.
- Manage employee data (name, role, department).
- Global state management with Jotai.
- Data fetching using React Query.

## Technologies
- **React** - Frontend UI library
- **Firebase Authentication** - For user login/logout
- **Firebase Firestore** - Database for employee data
- **Jotai** - Global state management
- **React Query** - For data fetching and caching
- **React Router** - For handling routes
- **Material UI** - For styling
- **Zod** - For form validation

## Usage
Clone the repo
```bash
git clone https://github.com/saifsalemm/symstax.git
```

Install the packages
```bash
sudo npm install
```

Run the app
```bash
npm run dev
```