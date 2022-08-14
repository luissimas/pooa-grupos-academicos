import { Router } from 'express'
import { router as docs } from './docs'

const router = Router()

// Check that server is running
router.get('/', (_req, res) => res.send('OK - Funcionando!?'))

router.use('/docs', docs)

export { router }
