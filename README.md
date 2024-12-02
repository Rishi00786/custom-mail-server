# Custom Mail Server 📧

## Setup Guide 🚀

### Prerequisites
- Node.js (recommended version 16+ or latest LTS)
- npm (Node Package Manager)
- A MySQL database (cloud service recommended)

### Installation Steps

Clone the Repository

```bash
gh repo clone Rishi00786/custom-mail-server
# Alternatively, download the ZIP file from GitHub

Install Dependencies

npm install

Configure Environment

Create a .env file in the project root
Add your database connection string:

DATABASE_URL="your_mysql_database_connection_string_here"

Database Setup

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Optional: Open Prisma Studio to view database
npx prisma studio

Start Development Server

npm run start:dev


