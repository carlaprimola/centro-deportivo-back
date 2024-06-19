//ejecutar aplicacion
import app from './app.js';
import { db } from './db.js';
import express from 'express';


db();


app.listen(3000, () => {
   
});


