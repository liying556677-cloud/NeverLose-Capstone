# NeverLose
This is a full-stack NeverLose application built using React on the frontend and Node.js + Express on the backend.
The application helps users register, track, and manage lost items securely.

Table of Contents:
-Overview
-Features
-Tech stack
-Project Structure
-Description
-Installation
-Environment Variables
-Running the Application
-API Endpoints
-Future Enhancement
---------------------------------------------------------------------------------

## Overview:
The project is structured as a single repository with two separate folders:
Client : for the frontend
Server : for the backend
The backend is deployed on Render, and the frontend is deployed on Vercel.
---------------------------------------------------------------------------------

## Features implemented:

You can
-Create new items
-Add item description and upload photo
-Set security verification question
-Review item before submitting
-View item details
-Edit existing items
-Delete items
-Update item status (Lost / Found / Safe)
-Submit reports for items

To make the application user-friendly:
-Step-by-step item creation flow
-Clean UI with consistent layout
-Responsive design using Bootstrap
--------------------------------------------------------------------------------

## Tech stack:

### Frontend
-React
-React Router
-Bootstrap
-Axios for API calls

### Backend
-Node.js
-Express
-REST API
-Modular structure (routes, controllers)
---------------------------------------------------------------------------------

## Project structure:
NeverLose/
├── client/
│   ├── cypress/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│
├── Server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── DB/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── server.js
│
├── README.md
-----------------------------------------------------------------------------------

## Description:
-The frontend communicates with the backend using REST APIs 
-API calls are handled using Axios 
-Backend follows a structured flow: 
  routes → controllers → services 
-The application includes a multi-step wizard for item creation 
-Users can manage items (edit, delete, update status) 
-Labels can be downloaded for physical tagging 
----------------------------------------------------------------------------------- 

## Installation:
1.Clone the repository
git clone https://github.com/drayapati1998/NeverLose.git  
cd NeverLose 

2.Start the server
cd Server  
npm install  
npm run dev  
Server runs on port 5000  

3.Start the client
cd client  
npm install  
npm start  
Frontend runs on: http://localhost:3000
Note: The backend uses nodemon for automatic server restarting during development.

4.Environment Variables:

4.1. Firebase Setup
Create a new firebase account and new project. 
Go to settings->Service Account Generate private key. 
Save  private key generated file from firebase service account, into configuration folder with name FireBaseAdminConfig.json
This project is using encryption so go to terminal and traverse to src-> configuration folder and run command 

\src\configuration> node encrypt.js
carefully copy Encrypted Credentials, key and IV
** Important Notes **
- carefully copy Encrypted Credentials, key and IV into .env file without any quotes or spaces

Create a .env file in the server directory and add the following: 
FIREBASE_ENCRYPTED=your newly generated Credentials
FIREBASE_KEY=your newly generated key
FIREBASE_IV=your newly generated IV
PORT=5000 you can change it to available port
HOST_URL=Environment where the front end is running for e.g http://localhost:3000

4.2. Cloudinary Setup: 
Go to https://cloudinary.com/ then signup and login.
From the dashboard, generate API key from API keys menu and then copy Cloud Name, API Key and API Secret 
Add following keys into .env file 
CLOUDINARY_CLOUD=your cloud name
CLOUDINARY_KEY=API key
CLOUDINARY_SECRET=API secret

4.3. SendGrid for Mails 
Go to https://sendgrid.com then signup and login.
Navigate to Settings → API Keys and Create API key
We are using a single sender so a complete verification process for the sender. 
Add following keys into .env file 
SENDGRID_API_KEY=API key for sendgrid
EMAIL_USER= email for which verification is done

4.4. Gemini AI for generating the description from image
Go to: https://aistudio.google.com
Sign in with your Google account
Click “Get API Key”
Add following keys into .env file 


4.5. Other Keys
MAX_EMAIL_ATTEMPT=number of retries for emails
MAX_FOUNDER_ATTEMPTS = number of attempts finder is allowed to reach out to sender

5.Creating Client side configuration 
Firebase web App setup
Create a new web app under the firebase project. Then under the section SDK setup and configuration
Select the config radio button and then copy the firebase config keys. 
Create a .env file under the client folder and add following keys. 

REACT_APP_API_KEY=API key
REACT_APP_AUTHDOMAIN=Auth Domain
REACT_APP_PROJECTID=Project Id.
REACT_APP_STORAGEBUCKET=Storage Bucket
REACT_APP_MESSAGING_SENDERID=Sender Id
REACT_APP_APPID=App Id
REACT_APP_MEASUREMENTID=App Measurement Id
REACT_APP_API_URL=Your API url with port number for e.g http://localhost:5000



** Important Notes **
- carefully copy Encrypted Credentials, key and IV into .env file without any quotes or spaces


-------------------------------------------------------------------------------------- 

## Running the Application:
1.Start the backend server  
cd Server  
npm run dev  

2.Start the frontend client  
cd client  
npm start  

3.Open the application in browser  
http://localhost:3000  

4.Perform actions like creating, editing, and managing items and downloading the labels
----------------------------------------------------------------------------------------

## API Endpoints:
The Server folder includes an API.html file that provides details of all API endpoints.
Access it here:https://neverlose-8oya.onrender.com/api-docs
-----------------------------------------------------------------------------------------

## Future Enhancements:
1.GPS tracking for real-time location:
 Enables tracking of an item’s live location for quicker recovery.
2.SMS notification to the owner: 
 Sends instant SMS alerts to the owner when an item is found or scanned.
3.Multi-owner items (Family items, company items):
 Allows multiple users to manage and access the same item.
4.Video or multiple images upload: 
 Supports uploading videos or multiple images for better item identification.
5.QR code customization:
 Allows users to personalize QR codes with different styles and formats.
6.Admin dashboard:
 Provides a centralized interface to monitor, manage users, and oversee system activities.
-----------------------------------------------------------------------------------------


## Extra Features
1.View item log history:
 Tracks all actions performed on an item from creation to updates.
2.Edit & delete item:
 Allows users to modify or remove items when needed.
3.Image preview for QR code download:
 Provides a preview of the QR code before downloading.
4.Landing page:
 Offers a user-friendly introduction and onboarding experience for new users.
5.Dashboard pagination, filter, and sorting:
 Improves data navigation with paging, filtering, and sorting options.
6.AI-powered image recognition:
 Identifies items and automatically updates their descriptions using AI.




