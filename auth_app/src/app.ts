/* eslint-disable no-unused-vars */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import { globalErrorHandler } from './app/middlewares/globalErrhandler'
import { notFound } from './app/middlewares/notFound'
import { Routes_v1 } from './app/route/Routes_v1'
import { envInfo } from './app/config/config'
// import { RouterVersionTwo } from './app/v2/route/routeTwo';

export const app: Application = express()

// parsers
app.use(express.json())
app.use(cookieParser(envInfo.COOKIES.COOKIE_SIGNATURE_SECRET))
app.use(
  cors({
    origin: ['http://localhost:3000'], // only access by this port list
    credentials: true, // allow to set cookies in header
  }),
)
// app.use(bodyParser.json({ limit: '50mb' }));

// application routes
app.use('/api/v1', Routes_v1)
// app.use('/api/v2', RouterVersionTwo);

app.get('/', (req: Request, res: Response) => {
  // res.json({success:true, message:'Hello Auth App'});
  res.send('<h1 style="text-align:center;">Hello Auth App</h1>')
})

app.get('/a', (req, res) => {
  res.send('Hello Schedule')
})
// global error
app.use(globalErrorHandler)

// Not Found router
app.use(notFound)
