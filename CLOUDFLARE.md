# Deploying to Cloudflare Pages

This guide covers two methods to deploy Six Seven to Cloudflare Pages.

## Method 1: Deploy via GitHub (Recommended)

This method automatically deploys your app whenever you push to GitHub.

### Steps:

1. **Go to Cloudflare Dashboard**
   - Visit [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**

2. **Connect Your Repository**
   - Select **GitHub** and authorize Cloudflare
   - Choose the `six-seven` repository
   - Click **Begin setup**

3. **Configure Build Settings**
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave blank)
   - **Node version:** `20.18.0` (or latest)

4. **Deploy**
   - Click **Save and Deploy**
   - Your app will be live at `https://six-seven-xxx.pages.dev`
   - Custom domains can be added in the Pages settings

### Automatic Deployments

After setup, every push to the `main` branch will automatically trigger a new deployment. Preview deployments are created for pull requests.

## Method 2: Deploy via CLI (Manual)

Deploy directly from your local machine using Wrangler.

### Prerequisites:

1. **Install Wrangler** (already installed in this project)
   ```bash
   npm install -D wrangler
   ```

2. **Authenticate with Cloudflare**
   ```bash
   npx wrangler login
   ```
   This will open your browser to authorize the CLI.

### Deploy:

```bash
# Build and deploy in one command
npm run pages:deploy
```

Or manually:
```bash
# Build the app
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist
```

### First Deployment:

The first time you deploy, Wrangler will ask:
- **Project name:** Press Enter to use `six-seven` (from wrangler.toml)
- The app will be created and deployed

### Subsequent Deployments:

Just run `npm run pages:deploy` and it will deploy to the existing project.

## Local Preview with Cloudflare Pages

Test your app locally with the Cloudflare Pages runtime:

```bash
# Build first
npm run build

# Preview with Cloudflare Pages dev server
npm run pages:dev
```

This simulates the Cloudflare Pages environment locally.

## Configuration Files

- **`wrangler.toml`** - Cloudflare Pages configuration
- **`public/_redirects`** - SPA routing configuration (redirects all routes to index.html)

## Custom Domains

After deploying, you can add custom domains:
1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Follow the instructions to configure DNS

## Environment Variables

If you need environment variables (for future backend features):
1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to **Settings** → **Environment variables**
3. Add variables for Production and Preview environments

## Cloudflare Pages Features

Your app automatically gets:
- **Global CDN** - Served from 300+ cities worldwide
- **Automatic HTTPS** - Free SSL certificates
- **Unlimited bandwidth** - No limits on free tier
- **Atomic deployments** - Zero downtime deployments
- **Preview deployments** - Unique URLs for each PR
- **Built-in analytics** - Web Analytics available

## Troubleshooting

### Build Fails
- Check that Node version matches (20.18.0 or later)
- Verify `npm install` runs successfully
- Check build logs in Cloudflare Dashboard

### Routes Not Working
- Ensure `_redirects` file is in `public/` folder
- Verify it's included in the build output (`dist/_redirects`)

### App Not Loading
- Check browser console for errors
- Verify build output in `dist/` folder
- Test locally with `npm run preview`

## Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Framework Guides](https://developers.cloudflare.com/pages/framework-guides/)
