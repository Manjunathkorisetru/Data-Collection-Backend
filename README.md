# Data-Collection-Backend

A Web App that is used for data collection from multiple users. This app will be used for image data collection to be formed as a dataset at the end. 
Each uploaded image contains a few features that will be annotated on the image.

## Features Implemented
- The main dashboard that represents a summary and statistics of the uploaded data records.
- The dashboard page provides the feature of downloading the collected datasets. Each user can download his/her own data. System admin can download individual data sets of all the users indvidually and also all together.
- The Upload page ( a CRUD page ) which provides the functionality of uploading the images and annotating the specified features for each. It also provides the preview of the images and their features.
- A login page that asks for authentication
- The user profile, which summarize the information of the user as well as the role of the user. The user information can also be updated.
- A Search field in the Dashboard to filter data sets by text features
- The web app is responsive across four breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

 

## Technologies Used

- **Frontend:** React.js, TypeScript, HTML, CSS, TailwindCSS
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Cloud (https://cloud.mongodb.com/)
- **Build Tools:** Vite
- **Package Manager:** npm
- **Version Control:** Git, GitHub

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js is installed
- MongoDB is accessible via a URL as shown in the configuration `Step 2` 
- Git (optional, but recommended for version control)

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/Manjunathkorisetru/Data-Collection-Backend.git

2. cd Data-Collection-Backend

3. npm install

## Configuration

1. Create a `.env` file in the root directory of the project
2. Add the following environment variables to the `.env` file:
    ( Please check your email for password )
   ```bash
   DATABASE_URL=mongodb+srv://korisetrudeveloper:`password`@cluster0.lmuunih.mongodb.net/dataCollection?retryWrites=true&w=majority
   ```
  

   
4. Generate token and add it as shown below
   ```bash
   ACCESS_TOKEN_SECRET=64e6d61449db24863210fedfd76cd5ff9178eda6f144a183f70bf420309d27186c53878b88934466e88d261acce1d487ee60e5df659ffb41a96e2d2bce096c06
   ```


## Access Token Generation ( If required )

1. In the terminal type `node` and press enter

2. Run the following command to generate token

   ```bash
   require('crypto').randomBytes(64).toString('hex')
   ```

## To Start Server
To start the development server. Run the following command : 

```bash
npm start
```

This will start the server, and will be accessible at http://localhost:3000.

## Database Schema

```bash
 {
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    role: {
      type: Number,
      default: 0,
    },
    datasets: [
      {
        id: String,
        image: String,
        features: [
          {
            value: { type: String, default: "" },
            type: { type: String, default: "" },
          },
        ],
      },
    ],
  },
```


