import express from 'express'

// Loading dotenv config
import 'dotenv/config'

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('OK'))

export { app }
