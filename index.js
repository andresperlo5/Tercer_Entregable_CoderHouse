require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

const morgan = require('morgan')
app.use(morgan('dev'))

const fs = require('fs')
const contenedor = require('./contenedor')
const c1 = new contenedor()

app.get('/productos', async (req, res) => {

    try {
        let productos = await c1.getAll()
        res.send(productos)
    } catch (error) {
        throw error
    }
})

app.get('/productosRandom', async (req, res) => {

    try {
        let productos = await c1.getById(1)
        res.send(productos)
    } catch (error) {
        throw error
    }
})

app.use(function (req, res, next) {
    res.status(404).json({ mensaje: 'Pagina no Encontrada' })
})

app.listen(process.env.PORT, () => {
    console.log('Puerto Activo:', process.env.PORT)
})
