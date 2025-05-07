import express, {json, urlencoded} from 'express';
import passport from 'passport';
import session from 'express-session';
//import cookieParser from "cookie-parser";
import cors from "cors";

// Import passport strategies
import "./lib/auth/strategies/local-strategy.ts";
import "./lib/auth/strategies/jwt-strategy.ts";
import "./lib/auth/strategies/anon-strategy.ts";

// Routes Begin
import productRoutes from './routes/products';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';
import userRoutes from './routes/users';
import categoryRoutes from './routes/categories';
import addressRoutes from './routes/addresses';
import favoriteRoutes from './routes/favorites';
// Routes End

import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(urlencoded({extended: false, limit: '100mb'}));
app.use(express.json({limit: '100mb'}));

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.static('media'));

app.use(session({
  secret: "some secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 12
  }
}))

app.use(passport.initialize());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/addresses", addressRoutes);
app.use("/favorites", favoriteRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})