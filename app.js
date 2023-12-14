import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import {getAuth} from 'firebase/auth'
import firebaseApp from './firebase.js'

// TODO: import Firebase dependencies

// TODO: import Firebase application

import indexRouter from './routes/index.js'

const app = express()

// TODO: create Firebase module

// view engine setup
app.set('views', 'views')
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

// Auth middleware
app.use(function (req, res, next) {
  const user = auth.currentUser; // TODO
  if (req.url === '/auth' && user)
    return res.redirect('/')

  if (req.url !== '/auth' && !user)
    return res.redirect('/auth')

  next()
});

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
