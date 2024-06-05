import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/dataSource';
import authRoutes from './auth/api/authController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error));
