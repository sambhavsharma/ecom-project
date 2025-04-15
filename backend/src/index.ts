import express, {json, urlencoded} from 'express';
import passport from 'passport';
import session from 'express-session';
//import cookieParser from "cookie-parser";
import cors from "cors";

import "./lib/auth/strategies/local-strategy.ts";

import productRoutes from './routes/products';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';
import userRoutes from './routes/users';
import categoryRoutes from './routes/categories';

import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(urlencoded({extended: false}));
app.use(json());
app.use(cors());
app.use(bodyParser.json());

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

// app.use((req, res, next) => {
//   console.log("req received from client");

//   console.log(req.body);
//   next(); // this will invoke next middleware function
// });

app.use(passport.initialize());
app.use(passport.session());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})