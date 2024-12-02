
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
   ```
   Alternatively, download the ZIP file from GitHub and extract it.

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add your database URL:
   ```env
   DATABASE_URL=<Your_Database_URL>
   ```
   Replace `<Your_Database_URL>` with the connection string of your MySQL database.

4. **Set Up the Database**
   Run the following commands to initialize and inspect your database:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma studio
   ```
   - **`npx prisma generate`**: Generates the Prisma client for database access.
   - **`npx prisma db push`**: Synchronizes the Prisma schema with your database.
   - **`npx prisma studio`**: Opens a web-based interface to explore your database.

5. **Start the Development Server**
   Launch the application in development mode:
   ```bash
   npm run start:dev
   ```

---

## Contributing 🤝

Contributions are welcome! Follow these steps to contribute:

1. Fork this repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request to this repository.

---

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author 👨‍💻

**Rishi Dhingra**  
- [GitHub](https://github.com/Rishi00786)  
- [Portfolio](https://rishi-dhingra-portfolio.vercel.app/)

---

Happy coding! 🚀