import express from 'express'

const app = express()

app.listen(5001, () => console.log('Hi!'))

app.get('/', (req, res) => res.json('Hello client!'))