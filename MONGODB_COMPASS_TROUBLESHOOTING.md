# MongoDB Compass - Database Not Showing Troubleshooting

## Issue: `olip` database not appearing in MongoDB Compass

### Current Database Status:
- ✅ Database exists: `olip`
- ✅ Collections: `discussions`, `prototypes`, `scheduledlessons`
- ✅ Documents: 2 total (1 discussion, 1 scheduledlesson)
- ✅ Size: ~90 KB

## Solutions:

### 1. **Refresh MongoDB Compass**
   - Click the **"Refresh"** button in the top right of MongoDB Compass
   - Or press `Cmd+R` (Mac) / `Ctrl+R` (Windows/Linux)
   - The database list should update

### 2. **Check for Filters**
   - Look for any search/filter boxes in MongoDB Compass
   - Clear any filters that might be hiding the database
   - Check if there's a "Show empty databases" toggle (some versions hide very small databases)

### 3. **Verify Connection**
   - Make sure you're connected to `localhost:27017`
   - Check the connection string in Compass matches: `mongodb://localhost:27017/`
   - Try disconnecting and reconnecting

### 4. **Check Database Size Threshold**
   - Some MongoDB Compass versions hide databases below a certain size
   - Your `olip` database is ~90 KB, which should be visible
   - Try adding more data to make it more prominent

### 5. **Manual Database Access**
   - In MongoDB Compass, you can manually navigate to the database
   - In the left sidebar, expand `localhost:27017`
   - Look for `olip` in the list
   - If it's not there, try typing `olip` in the connection search box

### 6. **Alternative: Use Your Web Preview**
   - Your project has a built-in database preview at `/database-preview`
   - This will definitely show your `olip` database
   - Start your Next.js app: `pnpm dev`
   - Navigate to: `http://localhost:3000/database-preview`

## Quick Verification Commands:

```bash
# Verify database exists
mongosh --eval "db.adminCommand('listDatabases')" | grep olip

# Check database details
mongosh olip --eval "db.stats()"

# List all collections
mongosh olip --eval "show collections"

# Count documents
mongosh olip --eval "db.discussions.countDocuments(); db.prototypes.countDocuments(); db.scheduledlessons.countDocuments()"
```

## Add More Data (Optional):

If you want to make the database more visible, you can add sample data:

```bash
# Add a sample discussion
mongosh olip --eval "db.discussions.insertOne({ title: 'Sample Discussion', author: 'Admin', details: 'This is a sample discussion', tag: 'general', replier: '–', comments: 0, createdAt: new Date(), updatedAt: new Date() })"

# Add a sample prototype
mongosh olip --eval "db.prototypes.insertOne({ title: 'Sample Prototype', description: 'A sample prototype', category: 'web', status: 'In Draft', hasChart: true, createdAt: new Date(), updatedAt: new Date() })"
```
