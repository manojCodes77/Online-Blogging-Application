## Main Repository Structure

The **Online-Blogging-Application** is a full-stack blogging platform with the following structure:[^1]

- **Backend**: Node.js/TypeScript server deployed on Cloudflare Workers
- **Client**: React + TypeScript + Vite frontend
- **Common**: Shared utilities and types package
- **Languages**: TypeScript (93.1%), HTML (4.7%), JavaScript (2.0%), CSS (0.2%)
- **Live Demo**: https://online-blogging-application.vercel.app


## Backend README Content

The backend directory contains the following README:[^1]

### Installation and Development

```bash
npm install
npm run dev
```


### Deployment

```bash
npm run deploy
```


### Key Notes

1. **Database Configuration**: The `schema.prisma` file picks the `DATABASE_URL` from the `.env` file, while the `index.ts` file picks the `DATABASE_URL` from the `wrangler.toml` file.[^1]
2. **Database**: Uses PostgreSQL database from Neon database service.[^1]
3. **NPM Package**: Imports custom npm package `"@manojcodes77/medium-common": "^1.0.2"` from npmjs.
4. **Deployment**: Backend is deployed on **Cloudflare Workers** and the database is deployed on **Neon**.
5. **Database Migration**: You haven't yet run the CREATE TABLE commands. To run those and create migration files, execute:
```bash
npx prisma migrate dev --name Initialize the schema
```

6. **Local Database**: To run the database server locally, you must have `psql` installed on your system.

## Client README Content

The client directory contains a standard React + TypeScript + Vite template README:

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

**Available Plugins**:

- `@vitejs/plugin-react` uses Babel for Fast Refresh
- `@vitejs/plugin-react-swc` uses SWC for Fast Refresh


### Expanding the ESLint Configuration

For production applications, update the configuration to enable type-aware lint rules:

1. **Configure top-level `parserOptions`**:
```javascript
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

2. **Replace configurations**:
    - Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
    - Optionally add `...tseslint.configs.stylisticTypeChecked`
3. **Install and configure eslint-plugin-react**:
```javascript
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


## Common Directory

The common directory contains shared utilities and types but doesn't have a dedicated README file. This directory includes:

- Shared TypeScript definitions
- Common utilities used by both frontend and backend
- Published as npm package `@manojcodes77/medium-common`


## Project Overview

This is a **Medium-style blogging application** featuring:

- **Full-stack TypeScript** implementation
- **Modern tech stack**: React, Vite, Node.js, Prisma, PostgreSQL
- **Cloud deployment**: Vercel (frontend) + Cloudflare Workers (backend) + Neon (database)
- **Shared code package** for type safety across frontend and backend
- **OTP verification** system for user authentication

The repository demonstrates modern web development practices with proper separation of concerns, shared type definitions, and cloud-native deployment strategies.
