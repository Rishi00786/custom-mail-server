
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

## API Documentation

### 1. **User Signup**
**Endpoint**: `/user/signup`  
**Method**: `POST`  
**Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "appPassword": "xxxx xxxx xxxx xxxx"
}
```

**Description**: Registers a new user. The `appPassword` is required for 2-step verification enabled accounts. Go to your google account and get it from there.  

---

### 2. **User Login**
**Endpoint**: `/auth/login`  
**Method**: `POST`  
**Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "access_token": "your-access-token"
}
```

**Description**: Logs in the user and returns a JWT token. This token must be included in the `Authorization` header for other endpoints.

---

### 3. **Send Mail**
**Endpoint**: `/mails/send`  
**Method**: `POST`  
**Headers**:
```
Authorization: Bearer <access_token>
```
**Body**:
```json
{
  "to": "recipient@example.com",
  "subject": "Subject of Email",
  "body": "Body of Email"
}
```

**Description**: Sends an email to the specified recipient.

---

### 4. **Get Inbox**
**Endpoint**: `/mails/inbox`  
**Method**: `GET`  
**Headers**:
```
Authorization: Bearer <access_token>
```

**Description**: Retrieves emails received by the logged-in user.

---

## Features

- User authentication with JWT.
- Secure handling of email app passwords for 2-step verification.
- Ability to send emails via an SMTP server.
- Fetch inbox emails using imap for authenticated users.
- Emails are transmitted securely using encryption protocols like STARTTLS or SSL/TLS.

---

# Security Features

This custom mail server prioritizes security at every stage of its functionality. Below is a summary of the key security features implemented:

## 1. JWT Authentication
- Uses JSON Web Tokens (JWT) for secure user authentication.
- Tokens are signed and validated to ensure that only authorized users can access protected routes.

## 2. Password Hashing
- User passwords are hashed using bcrypt before storage, ensuring that sensitive data is never stored in plain text.

## 3. Secure Email Transmission
- Email sending is secured using SSL/TLS encryption via nodemailer to prevent unencrypted email transmission.

## 4. Role-based Authorization
- AuthGuard ensures that only users with a valid JWT token can access specific routes like sending emails or fetching inbox data.

## 5. Email Credentials Security
- Email services use app-specific passwords (e.g., for Gmail) rather than user account passwords to improve security.

## 6. Secure IMAP Email Fetching
- IMAP email fetching uses TLS encryption to securely connect to email servers.

## 7. Custom Error Handling
- The application uses structured error handling (e.g., UnauthorizedException, BadRequestException) to prevent exposing sensitive stack traces.

## 8. Sensitive Data Protection
- All sensitive user information (such as passwords and email credentials) is securely handled and not exposed in logs or error messages.

## 9. Unique User Registration
- During user registration, the application checks for unique emails to prevent duplicate accounts.

## 10. Data Integrity
- Input validation is used to ensure the integrity of user data, particularly in email-related fields (to, subject, body).


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