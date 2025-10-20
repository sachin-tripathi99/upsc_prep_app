# UPSC Prep App - Setup Guide

## Prerequisites

Before setting up the UPSC Prep App, ensure you have the following installed on your system:

1. **Node.js** (v14.x or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js) or **yarn**
   - Verify installation: `npm --version`

3. **MongoDB** (v4.4 or higher)
   - Download from: https://www.mongodb.com/try/download/community
   - Verify installation: `mongod --version`

4. **Git**
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/[your-username]/upsc_prep_app.git
cd upsc_prep_app
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required Node.js packages listed in `package.json`.

### 3. Set Up MongoDB

#### Option A: Local MongoDB Installation

1. Start MongoDB service:

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod  # Enable auto-start on boot
```

**macOS:**
```bash
brew services start mongodb-community
```

**Windows:**
```bash
net start MongoDB
```

2. Verify MongoDB is running:
```bash
mongo --eval "db.version()"
```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Use this connection string in your `.env` file

### 4. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` file with your configuration:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/upsc_prep
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
```

**Important:** 
- Change `JWT_SECRET` to a random, secure string
- For MongoDB Atlas, use your connection string for `MONGO_URI`
- Example Atlas URI: `mongodb+srv://username:password@cluster.mongodb.net/upsc_prep`

### 5. Initialize the Database (Optional)

You can create sample data to test the application:

```bash
# This will be added in a future seed script
# npm run seed
```

### 6. Start the Application

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server will start at: `http://localhost:5000`

### 7. Verify Installation

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "UPSC Prep App API is running"
}
```

## Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoNetworkError: failed to connect to server`

**Solutions:**
1. Ensure MongoDB is running:
   ```bash
   # Linux/macOS
   sudo systemctl status mongod
   
   # Windows
   services.msc  # Check MongoDB service
   ```

2. Check if the port 27017 is available:
   ```bash
   netstat -an | grep 27017
   ```

3. Verify MongoDB URI in `.env` file

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Change the PORT in `.env` file to another port (e.g., 5001)
2. Or kill the process using port 5000:
   ```bash
   # Find process
   lsof -i :5000
   # Kill process
   kill -9 <PID>
   ```

### Module Not Found Errors

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### JWT Token Issues

**Error:** `JsonWebTokenError: invalid signature`

**Solution:**
- Ensure `JWT_SECRET` in `.env` matches the one used to create the token
- Clear browser storage/cookies and login again

## Creating Admin User

Currently, you need to manually set a user's role to 'admin' in the database:

1. Register a new user through the API
2. Connect to MongoDB:
   ```bash
   mongo upsc_prep
   ```

3. Update user role:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## Next Steps

After successful setup:

1. **Test Authentication:**
   - Register a new user
   - Login with the user
   - Access protected endpoints

2. **Create Sample Data (Admin):**
   - Create subjects
   - Create topics
   - Create tests

3. **Test Student Features:**
   - Browse subjects and topics
   - Attempt tests
   - View progress

## Development Tools

### Recommended VS Code Extensions
- ESLint
- Prettier
- MongoDB for VS Code
- REST Client
- GitLens

### Testing the API

You can use any of these tools to test the API:
- **Postman**: https://www.postman.com/
- **Insomnia**: https://insomnia.rest/
- **curl**: Command line tool
- **REST Client** (VS Code extension)

### Sample API Request (curl)

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "targetExam": "IAS",
    "targetYear": 2026
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get subjects (replace <token> with actual token)
curl -X GET http://localhost:5000/api/subjects \
  -H "Authorization: Bearer <token>"
```

## Production Deployment

For production deployment, consider:

1. **Environment Variables:**
   - Set `NODE_ENV=production`
   - Use strong `JWT_SECRET`
   - Use MongoDB Atlas or managed MongoDB

2. **Security:**
   - Enable HTTPS
   - Set up CORS properly
   - Implement rate limiting
   - Add request validation
   - Enable MongoDB authentication

3. **Monitoring:**
   - Set up logging (Winston, Morgan)
   - Monitor application health
   - Set up error tracking (Sentry)

4. **Hosting Options:**
   - Backend: Heroku, AWS, DigitalOcean, Railway
   - Database: MongoDB Atlas
   - Frontend: Vercel, Netlify (when implemented)

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: [Your contact information]

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/guide/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT Introduction](https://jwt.io/introduction)
