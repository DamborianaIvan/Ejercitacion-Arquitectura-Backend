
import express from 'express';
import connectDB from './config/database.js';
import Dog from './models/dog.js';
import dogRouter from './routes/dogRoutes.js'


const app = express()

app.use(express.json())
app.use("/api/perros", dogRouter);


const start = async () => {
  try {
    connectDB()
    app.listen(3000, () => console.log('Servidor levantado en el puerto 3000'))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()