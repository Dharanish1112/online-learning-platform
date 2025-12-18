# AWS Amplify Deployment Fix Guide

## Why Your Deployment Failed

Common reasons for Amplify deployment failures:
1. ❌ Missing `amplify.yml` build configuration
2. ❌ Package manager mismatch (using pnpm but Amplify defaults to npm)
3. ❌ Missing environment variables (MongoDB URI)
4. ❌ Node.js version not specified
5. ❌ Build errors or missing dependencies

## ✅ Solution Steps

### Step 1: Add Build Configuration File

I've created `amplify.yml` in your project root. This file tells Amplify:
- To use pnpm instead of npm
- How to build your Next.js app
- Where to find the build output

### Step 2: Configure Environment Variables in Amplify

**Important:** Your MongoDB connection requires environment variables.

1. Go to AWS Amplify Console
2. Click on your app: `online-learning-platform`
3. Go to **"App settings"** → **"Environment variables"**
4. Add the following environment variable:

   ```
   Key: MONGODB_URI
   Value: mongodb://localhost:27017/olip
   ```

   **Note:** For production, you'll need a MongoDB Atlas connection string or a hosted MongoDB instance.

### Step 3: Configure Build Settings in Amplify Console

1. Go to **"App settings"** → **"Build settings"**
2. Make sure the build specification file is set to: `amplify.yml`
3. If it's not, click **"Edit"** and select `amplify.yml`

### Step 4: Set Node.js Version (Optional but Recommended)

In Amplify Console:
1. Go to **"App settings"** → **"Build settings"**
2. Add this to your build settings or ensure Node.js 18+ is selected

### Step 5: Redeploy

After making these changes:
1. Go to the **"Branches"** section
2. Click on the `main` branch
3. Click **"Redeploy this version"** or push a new commit

## Alternative: Use MongoDB Atlas (Recommended for Production)

For production deployments, use MongoDB Atlas instead of localhost:

1. Create a free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Add it as `MONGODB_URI` environment variable in Amplify

Example Atlas connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/olip?retryWrites=true&w=majority
```

## Build Configuration Details

The `amplify.yml` file I created:
- ✅ Enables pnpm (Corepack)
- ✅ Installs dependencies with pnpm
- ✅ Builds the Next.js app
- ✅ Configures output directory (`.next`)
- ✅ Caches node_modules for faster builds

## Troubleshooting

### If build still fails:

1. **Check build logs:**
   - In Amplify Console, click on the failed deployment
   - View the build logs to see the exact error

2. **Common fixes:**
   ```bash
   # Test build locally first
   pnpm install
   pnpm run build
   ```

3. **Verify package.json:**
   - Make sure all dependencies are listed
   - Check for any missing peer dependencies

4. **Check Next.js version compatibility:**
   - Next.js 16.0.3 requires Node.js 18.17.0+
   - Amplify should use Node.js 18 or 20

### Update Build Settings Manually:

If `amplify.yml` doesn't work, you can configure in Amplify Console:

**Build settings:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - corepack enable
        - corepack prepare pnpm@latest --activate
        - pnpm install
    build:
      commands:
        - pnpm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
```

## Next Steps After Successful Deployment

1. ✅ Verify the deployment succeeded
2. ✅ Test your app at the Amplify URL
3. ✅ Set up MongoDB Atlas for production
4. ✅ Configure custom domain (optional)
5. ✅ Set up environment variables for production

## Quick Checklist

- [x] Created `amplify.yml` build configuration
- [ ] Add `MONGODB_URI` environment variable in Amplify Console
- [ ] Verify build settings point to `amplify.yml`
- [ ] Push changes to GitHub (if not already done)
- [ ] Redeploy in Amplify Console
- [ ] Check build logs if it still fails
