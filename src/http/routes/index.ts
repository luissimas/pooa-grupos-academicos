import { Router } from 'express'
import { router as docs } from './docs'
import { router as auth } from './auth'
import { router as user } from './user'
import { router as academicGroup } from './academicGroup'

const router = Router()

// Check that server is running
router.get('/', (_req, res) => res.send('OK - Funcionando!?'))

router.use('/docs', docs)

router.use('/', auth)
router.use('/user', user)
router.use('/academicGroup', academicGroup)

export { router }
