# GitHub Push Commands

## Current Status:
- ✅ Git repository initialized
- ✅ Remote configured: `https://github.com/Dharanish1112/online-learning-platform.git`
- ✅ Branch: `main` (ahead of origin by 1 commit)

## Step-by-Step Commands:

### 1. Add all changes to staging:
```bash
git add .
```

### 2. Commit your changes:
```bash
git commit -m "Add database preview feature, MongoDB integration, and API routes"
```

### 3. Push to GitHub:
```bash
git push origin main
```

## Complete Command Sequence:

```bash
# Navigate to project directory
cd "/Users/dharan/Documents/DHARANISH/AIML/Cloud Computing/Project/online-learning-platform 2"

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Add database preview feature, MongoDB integration, API routes, and Node.js configuration"

# Push to GitHub
git push origin main
```

## Alternative: Push with force (if needed):
⚠️ **Only use if you're sure you want to overwrite remote changes:**
```bash
git push origin main --force
```

## What will be pushed:
- ✅ Database preview page (`app/database-preview/`)
- ✅ MongoDB API routes (`app/api/database/`)
- ✅ MongoDB connection setup (`lib/mongodb.ts`)
- ✅ Data models (`lib/models/`)
- ✅ Settings page (`app/settings/`)
- ✅ Updated components and pages
- ✅ Node.js configuration (`.nvmrc`, `package.json` engines)
- ✅ Documentation files

## Files that will NOT be pushed (protected by .gitignore):
- ❌ `node_modules/`
- ❌ `.next/`
- ❌ `.env` and `.env.local` (sensitive data)
- ❌ `pnpm-lock.yaml`
- ❌ `.DS_Store`

## Troubleshooting:

### If you get authentication errors:
```bash
# Use GitHub CLI
gh auth login

# OR use personal access token
git push https://YOUR_TOKEN@github.com/Dharanish1112/online-learning-platform.git main
```

### If you need to set upstream:
```bash
git push -u origin main
```

### Check status before pushing:
```bash
git status
git log --oneline -5
```
