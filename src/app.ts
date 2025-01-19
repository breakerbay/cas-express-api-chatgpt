import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import accountsRoutes from './routes/accounts';
import projectRouter from './routes/projectRoutes';
import usersRoutes from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: ['http://localhost', 'https://brogo.net.au/cas2/cas'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,  // Allow sending cookies or authorization headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api', accountsRoutes);
app.use('/api', projectRouter);
app.use('/api', usersRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
