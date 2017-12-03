const express = require('express')
const pkg = require('./package.json')
const bodyParser = require('body-parser')
const app = express()
const {prop, isEmpty, path} = require('ramda')
const HTTPError = require('node-http-error')
// const Ajv = require('ajv') const ajv = new Ajv()
const {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  listUsers,
  addTx,
  getTx,
  updateTx,
  deleteTx,
  listTx
} = require('./dal')

module.exports = app => {

  app.get('/', async(req, res) => {
    res.send({description: pkg.description, version: pkg.version})
  })

  app.post('/users', bodyParser.json(), async(req, res, next) => {
    try {
      const user = prop('body', req)

      if (isEmpty(user)) {
        return next(new HTTPError(res.status(400), 'No body was provided'))
      }
      res
        .status(200)
        .send(await addUser(user))
    } catch (err) {
      //res.status(500).send({ ok: false, message: err.message })
      next(new HTTPError(err.status, err.message))
    }
  })

  app.get('/users/:id', async(req, res, next) => {
    try {
      res
        .status(200)
        .send(await getUser(path([
          'params', 'id'
        ], req)))
    } catch (err) {
      res
        .status(500)
        .send({ok: false, message: err.message})
    }
  })

  app.put('/users/:id', bodyParser.json(), async(req, res, next) => {
    try {
      //const id = pathOr(null, ['params', 'id'], req)
      const user = prop('body', req)

      if (isEmpty(user)) {
        return next(new HTTPError(400, `No Notification body was provided`))
      }

      res
        .status(200)
        .send(await updateUser(user))
    } catch (err) {
      //res.status(500).send({ ok: false, message: err.message })
      next(new HTTPError(err.status, err.message))
    }
  })

  app.delete('/users/:id', async(req, res, next) => {
    try {
      res
        .status(200)
        .send(await deleteUser(req.params.id))
    } catch (err) {
      next(new HTTPError(err.status, err.message))
      //res.status(500).send({ ok: false, message: err.message })
    }
  })

  app.get(`/users/`, async(req, res, next) => {
    try {
      res
        .status(200)
        .send(await listUsers())
    } catch (err) {
      next(new HTTPError(err.status, err.message))
      //res.status(500).send({ ok: false, message: err.message })
    }
  })

  // Tx
  app.post('/txs', bodyParser.json(), async(req, res, next) => {
    try {
      const tx = prop('body', req)

      if (isEmpty(tx)) {
        return next(new HTTPError(res.status(400), 'No body was provided'))
      }
      res
        .status(200)
        .send(await addTx(tx))
    } catch (err) {
      //res.status(500).send({ ok: false, message: err.message })
      next(new HTTPError(err.status, err.message))
    }
  })

  app.get('/txs/:id', async(req, res, next) => {
    try {
      res
        .status(200)
        .send(await getTx(path([
          'params', 'id'
        ], req)))
    } catch (err) {
      res
        .status(500)
        .send({ok: false, message: err.message})
    }
  })

  app.put('/txs/:id', bodyParser.json(), async(req, res, next) => {
    try {
      //const id = pathOr(null, ['params', 'id'], req)
      const tx = prop('body', req)

      if (isEmpty(tx)) {
        return next(new HTTPError(400, `No Notification body was provided`))
      }

      res
        .status(200)
        .send(await updateTx(tx))
    } catch (err) {
      //res.status(500).send({ ok: false, message: err.message })
      next(new HTTPError(err.status, err.message))
    }
  })

  app.delete('/txs/:id', async(req, res, next) => {
    console.log("inside DELETE for /txs/:id")
    console.log(`the id of txs ${req.params.id}`)
    try {
      res
        .status(200)
        .send(await deleteTx(req.params.id))
    } catch (err) {
      next(new HTTPError(err.status, err.message))
      //res.status(500).send({ ok: false, message: err.message })
    }
  })

  app.get(`/txs/`, async(req, res, next) => {
    try {
      res
        .status(200)
        .send(await listTx())
    } catch (err) {
      next(new HTTPError(err.status, err.message))
      //res.status(500).send({ ok: false, message: err.message })
    }
  })
  app.use((err, req, res, next) => {
    console.log('Error status: ', err.status, ' Error message: ', err.message)
    res.status(err.status)
    res.send(err)
  })
}
