import { Sequelize } from 'sequelize';

// Option 1: Passing a connection URI
// const db = new Sequelize('sqlite::memory:') // Example for sqlite
const db = new Sequelize('postgres://postgres:postgrespass@db:5432/nodejs_api', ) // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const db = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// // Option 3: Passing parameters separately (other dialects)
// const db = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

try {
  await db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default db;
