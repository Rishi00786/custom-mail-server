# Custom Mail Server 📧

## Setup Guide 🚀

### Prerequisites
- Node.js (recommended version 16+ or latest LTS)
- npm (Node Package Manager)
- A MySQL database (cloud service recommended)

### Installation Steps

1. **Clone the Repository**

   ```bash
   gh repo clone Rishi00786/custom-mail-server
   # Alternatively, download the ZIP file from GitHub

2. **Install Dependencies**

  npm install

3. **Configure Environment**

  Create a .env file in the project root
  Add your database connection string:

  DATABASE_URL="your_mysql_database_connection_string_here"

4. **Database Setup**

  # Generate Prisma client
  npx prisma generate

  # Push database schema
  npx prisma db push

  # Optional: Open Prisma Studio to view database
  npx prisma studio

5. **Start Development Server**

  npm run start:dev
