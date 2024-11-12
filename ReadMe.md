### Library Management System

The Library Management System is a backend application designed to manage the operations of a library. It includes features for managing books, authors, members, and borrow records.

## Live URL

[Live Deployment](https://library-management-server-lyart.vercel.app/)

### Technology Stack & Packages

- **Backend Framework**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **HTTP Status Codes**: http-status
- **Environment Variables**: dotenv
- **Error Handling**: Custom middleware
- **Development Tools**: TypeScript,Ts Node Dev

## Setup Instructions

#### Clone the repository:

```sh
git clone https://github.com/fai-sas/library-management-server.git
```

#### Navigate to the project directory:

```sh
cd library-management-system
```

#### Install dependencies:

```sh
cd npm install
```

#### Set up environment variables by creating a .env file in the root directory and adding the following:

```sh
DATABASE_URL="your_supabase_database_url"
DIRECT_URL="your_supabase_direct_url"
ENABLE_PRISMA_CACHING=false
```

#### Run database migrations:

```sh
npx prisma migrate dev
```

#### Start the development server:

```sh
npm run dev
```

### Key Features & Functionality

- Book Management: Create, read, update, and delete book records.

- Member Management: Handle library member registrations and information.

- Borrow Records: Track borrowed books and calculate overdue returns.

- Return Books: Return borrowed books.

- Error Handling: Global error handler with structured JSON responses.

### Known Issues/Bugs

- Currently, there is no established relationship between the Author Table and the Book Table. This is a planned enhancement for future versions

### Deployment

- vercel.json

```sh
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node",
      "config": { "includeFiles": ["prisma/schema.prisma"] }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```
