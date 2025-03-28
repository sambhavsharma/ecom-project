import express, {json, urlencoded} from 'express';
import passport from 'passport';
import session from 'express-session';
//import cookieParser from "cookie-parser";
import cors from "cors";

// import localStrategy from "./lib/auth/strategies/local-strategy";

import "./lib/auth/strategies/local-strategy.ts";

import productRoutes from './routes/products';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';

const app = express()
const port = 3000
app.use(urlencoded({extended: false}));
app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(session({
  secret: "some secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 12
  }
}))

app.use(passport.initialize());
app.use(passport.session());
// app.use(localStrategy());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})