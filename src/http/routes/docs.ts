import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'POOA - Grupos Acadêmicos',
      version: '0.0.0',
    },
  },
  apis: ['./src/http/routes/*.ts'],
}

const specs = swaggerJsDoc(options)

const router = Router()

router.use('/', swaggerUi.serve)
router.use('/', swaggerUi.setup(specs))

export { router }
