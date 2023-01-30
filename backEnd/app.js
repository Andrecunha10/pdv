require('dotenv').config({path: '../.env'});

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const express = require('express');

const { generateAdminOptions } = require('./utils/adminOptions.js');

const db = require('./db.js');
const version = 'v1';

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
} = process.env;

const PORT = 3001;

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
})

const start = async () => {
    const app = express()

    const adminOptions = generateAdminOptions();
  
    const admin = new AdminJS(adminOptions);
  
    const adminRouter = AdminJSExpress.buildRouter(admin);

    app.use(express.json());
    app.use(admin.options.rootPath, adminRouter);

    db.sync(() => console.log('Database connected'));
    app.listen(PORT, () => {
      console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    });
  }
  
  start();


