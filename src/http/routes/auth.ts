import { adaptController } from '@adapters/expressControllerAdapter'
import { LoginControllerFactory } from '@factories/controller/auth/loginControllerFactory'
import { Router } from 'express'

const loginController = new LoginControllerFactory().createController()

const router = Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticação de usuários.
 *     description: Login de usuário nos sistemas.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       content:
 *         'application/json':
 *           schema:
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *           example:
 *             email: joaquim@hotmail.com
 *             password: banana
 *     responses:
 *      '200':
 *        description: Usuário autenticado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                token:
 *                  type: string
 *                  description: Token JWT com tempo de expiração de 1 hora para ser usado nas próximas requisições.
 *      '400':
 *        description: Campos da requisição inválido
 *      '401':
 *        description: Credenciais inválidas
 *      '404':
 *        description: Usuário não encontrado
 *      '500':
 *        description: Erro interno no servidor
 */
router.post('/login', adaptController(loginController))

export { router }
