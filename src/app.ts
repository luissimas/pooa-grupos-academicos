import express from 'express'
import { router } from '@http/routes'

// Loading dotenv config
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(router)

export { app }
