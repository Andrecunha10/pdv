require('dotenv').config();

const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const express = require('express');

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

const start = async () => {
    const app = express()
  
    const admin = new AdminJS({})
  
    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)
  
    app.listen(PORT, () => {
      console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
    })
  }
  
  start();


