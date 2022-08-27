import express from 'express'
import { router } from '@routes'

// Loading dotenv config
import 'dotenv/config'
import { adaptErrorHandler } from '@http/adapters/expressErrorHandlerAdapter'
import { HttpErrorHandler } from '@http/error/errorHandler'

const app = express()

app.use(express.json())
app.use(router)

app.use(adaptErrorHandler(new HttpErrorHandler()))

export { app }
