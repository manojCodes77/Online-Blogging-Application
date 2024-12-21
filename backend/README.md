```
npm install
npm run dev
```

```
npm run deploy
```
1. here , schema.prisma pick the DATABASE_URL from .env file.
2. but , index.ts file pick the DATABASE_URL from wrangler.toml file.
3.here i have pick the DATABASE_URL from postgressql database from neon database.
4. Here , i have also imported my owm npm package from npmjs 
"@manojcodes77/medium-common": "^1.0.2",

5. the backend is deployed on cloudflare workers and the database is deployed on neon.
6. You have created a single schema file. You haven’t yet run the CREATE TABLE  commands. To run those and create migration files , run 
npx prisma migrate dev --name Initialize the schema

Your DB should now have the updated schema.

7. To run the database server locally , we must have psql installed on our system.