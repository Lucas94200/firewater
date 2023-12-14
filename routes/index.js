import express from 'express'
import createError from 'http-errors'
import multer from 'multer'
import firebaseApp from '../firebase.js' 
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'

// TODO: import Firebase dependencies

// TODO: import Firebase applications

const router = express.Router()
const upload = multer()
const auth = getAuth(firebaseApp)

// TODO: create Firebase modules

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { user: auth.currentUser })
})

router.get('/auth', function (req, res, next) {
  res.render('auth')
})

router.post('/auth', function (req, res, next) {
  const { username, password } = req.body
  // TODO
  signInWithEmailAndPassword(auth, username, password)
  .then(() => {
    res.redirect('/')

  })
  .catch(() => {
    res.render('auth',{error:'identifiants incorrects'})

  })
})

router.get('/logout', function (req, res, next) {
  // TODO
})

router.get('/gallery', function (req, res, next) {
  const images = []
  // TODO
  res.render('gallery', { images })
})

router.post('/gallery', upload.single('image'), function (req, res, next) {
  const file = req.file
  // TODO
})

router.get('/articles', async function (req, res, next) {
  const articles = []
  // TODO
  res.render('articles', { articles })
})

export default router
