import { Router } from 'express'
import { router as docs } from './docs'
import { router as user } from './user'

const router = Router()

// Check that server is running
router.get('/', (_req, res) => res.send('OK - Funcionando!?'))

router.use('/docs', docs)
router.use('/', user)

export { router }
