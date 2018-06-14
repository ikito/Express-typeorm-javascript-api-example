# Express api example using TypeORM with JavaScript

1. Clone repository
2. Rename ormconfig.template.json to ormconfig.json and fill with your PostgreSQL database info. Something like:
```json
{
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "test",
    "entities": ["src/entity/*.js"],
    "logging": true,
    "synchronize": true
}
```
3. I'm using PostgreSQL, if you want to use another DB just change it and replace package.
4. Run `npm i`
5. Run `node app.js` to run simple example
6. Point your browser to http://localhost:3000 to test
7. http://localhost:3000/filldb to insert data into DB
8. http://localhost:3000/api/categories to list DB data
