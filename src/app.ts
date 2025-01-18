import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import accountsRoutes from './routes/accounts';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', accountsRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
