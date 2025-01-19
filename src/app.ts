import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import accountsRoutes from './routes/accounts';
import usersRoutes from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors()); // Use the cors middleware

/**
const corsOptions = {
    origin: 'http://example.com', // Replace with your allowed origin
    methods: 'GET,POST,PUT,DELETE',
};

app.use(cors(corsOptions));

**/


app.use(bodyParser.json());
app.use('/api', accountsRoutes);
app.use('/api', usersRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
