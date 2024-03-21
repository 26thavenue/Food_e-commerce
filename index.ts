import express,{Express} from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan'
import {routes }from './routes/route'
import cors from 'cors'


dotenv.config()


const app:Express = express();

app.use(morgan('tiny'))

app.use(cors())

app.use(express.json())

app.use('/api',routes)

const PORT = process.env.DEVELOPMENT_PORT || 3000

app.get('/', (req, res) => {
  res.send('Welcome to the Food API Service!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
