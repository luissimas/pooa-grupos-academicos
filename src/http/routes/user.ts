import { adaptController } from '@adapters/expressControllerAdapter'
import { CreateUserControllerFactory } from '@factories/controller/user/createUserControllerFactory'
import { Router } from 'express'

const createUserController = new CreateUserControllerFactory().createController()

const router = Router()

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cadastro de usuários.
 *     description: Cria um novo usuário no sistema.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       content:
 *         'application/json':
 *           schema:
 *            properties:
 *              name:
 *                type: string
 *              age:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              role:
 *                type: string
 *            required:
 *              - name
 *              - age
 *              - email
 *              - password
 *              - role
 *           examples:
 *             Aluno:
 *               value:
 *                 name: Joaquim Alves
 *                 age: 27
 *                 email: joaquim@hotmail.com
 *                 password: banana
 *                 role: student
 *                 ra: 706872
 *                 ira: 19999
 *                 semester: 7
 *                 course:
 *                   name: Ciência da Computação
 *                   abbreviation: BCC
 *             Professor:
 *               value:
 *                 name: Joaquim Alves
 *                 age: 27
 *                 email: joaquim@hotmail.com
 *                 password: banana
 *                 role: professor
 *                 researchField: compiladores
 *                 collegiateBody: Conselho da Faculdade
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
router.post('/', adaptController(createUserController))

export { router }
