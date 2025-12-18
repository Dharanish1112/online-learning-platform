# MongoDB Connection Commands

## 1. Start MongoDB Server

### Using Homebrew (macOS):
```bash
# Start MongoDB as a service (recommended)
brew services start mongodb-community

# OR start MongoDB manually
mongod --config /opt/homebrew/etc/mongod.conf

# OR start with default settings
mongod
```

### Check if MongoDB is running:
```bash
# Check MongoDB service status
brew services list | grep mongodb

# OR check if port 27017 is in use
lsof -i :27017
```

## 2. Connect to MongoDB Shell

```bash
# Connect to local MongoDB
mongosh

# OR connect to specific database
mongosh mongodb://localhost:27017/olip

# OR connect with explicit database name
mongosh --host localhost --port 27017 --db olip
```

## 3. MongoDB Shell Commands

Once connected, you can use these commands:

```javascript
// Show all databases
show dbs

// Switch to your database
use olip

// Show all collections
show collections

// Count documents in a collection
db.discussions.countDocuments()
db.prototypes.countDocuments()
db.scheduledlessons.countDocuments()
db.usersettings.countDocuments()

// View documents
db.discussions.find()
db.discussions.find().pretty()

// Find specific document
db.discussions.findOne()

// Query documents
db.discussions.find({ title: "Your Title" })
```

## 4. Environment Variable Setup

Create a `.env.local` file in your project root:

```bash
# .env.local
MONGODB_URI=mongodb://localhost:27017/olip
```

## 5. Stop MongoDB Server

```bash
# Stop MongoDB service
brew services stop mongodb-community

# OR if running manually, press Ctrl+C in the terminal
```

## 6. Verify Connection from Your App

Your Next.js app will automatically connect when you:
1. Start your development server: `npm run dev`
2. Navigate to `/database-preview` page
3. The connection happens automatically via `lib/mongodb.ts`

## Quick Start Commands

```bash
# 1. Start MongoDB
brew services start mongodb-community

# 2. Verify it's running
mongosh --eval "db.adminCommand('ping')"

# 3. Start your Next.js app
npm run dev

# 4. Open browser to http://localhost:3000/database-preview
```
