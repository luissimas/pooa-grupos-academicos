import express from 'express'
import { router } from '@routes'

// Loading dotenv config
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(router)

export { app }
