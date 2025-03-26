import express, {json, urlencoded} from 'express';
import productRoutes from './routes/products';

const app = express()
const port = 3000
app.use(urlencoded({extended: false}));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/products", productRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})