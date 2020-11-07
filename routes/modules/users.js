const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res, next) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body

  User
    .findOne({ email })
    .then(user => {
      const errors = {}

      if (!email.trim()) {
        errors.email = 'Email欄位不可空白。'
      }
      if (!password.trim()) {
        errors.password = '密碼欄位不可空白。'
      }
      if (!confirmPassword.trim()) {
        errors.confirmPassword = '確認密碼欄位不可空白。'
      }
      if (password !== confirmPassword) {
        errors.isPasswordConfirmed = '密碼與確認密碼不相符。'
      }
      if (user) {
        errors.isEmailRegistered = '此Email已註冊過。'
      }

      if (Object.keys(errors).length) {
        return res.render('register', { errors, name, email, password, confirmPassword })
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User
          .create({
            name,
            email,
            password: hash
          })
          .then(() => {
            req.flash('success_msg', '註冊成功，請登入。')
            res.redirect('/users/login')
          })
          .catch(err => next(err)))
    })
    .catch(err => next(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router