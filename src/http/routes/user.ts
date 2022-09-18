import { adaptController } from '@adapters/expressControllerAdapter'
import { ListAcademicGroupsByUserControllerFactory } from '@factories/controller/academicGroup/listAcademicGroupsByUserControllerFactory'
import { CreateUserControllerFactory } from '@factories/controller/user/createUserControllerFactory'
import { AuthMiddlewareFactory } from '@factories/middlewares/authMiddlewareFactory'
import { adaptMiddleware } from '@http/adapters/expressMiddlewareAdapter'
import { Router } from 'express'

const authMiddleware = AuthMiddlewareFactory.createMiddleware()

const createUserController = CreateUserControllerFactory.createController()
const listAcademicGroupsByUserController = ListAcademicGroupsByUserControllerFactory.createController()

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
 *                id:
 *                  type: string
 *                  format: uuid
 *                  description: Identificador do usuário criado.
 *      '400':
 *        description: Campos inválidos
 *      '401':
 *        description: Credenciais inválidas
 *      '404':
 *        description: Usuário não encontrado
 *      '500':
 *        description: Erro interno no servidor
 */
router.post('/', adaptController(createUserController))

router.use('/', adaptMiddleware(authMiddleware))

/**
 * @swagger
 * /user/:userId/academicGroup:
 *   get:
 *     summary: Listagem de grupos acadêmicos de um usuário.
 *     description: Lista todos os grupos acadêmicos dado um usuário.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: userId
 *         in: path
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *      '200':
 *        description: Grupos acadêmicos listados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/AcademicGroup'
 *      '400':
 *        description: Campos inválidos
 *      '404':
 *        description: Usuário não encontrado
 *      '500':
 *        description: Erro interno no servidor
 */
router.get('/:userId/academicGroup', adaptController(listAcademicGroupsByUserController))

export { router }

/**
 * @swagger
 * components:
 *   schemas:
 *     AcademicGroup:
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         foundationDate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *         maxMembers:
 *           type: number
 *         department:
 *           $ref: '#/components/schemas/Department'
 *         sponsor:
 *           $ref: '#/components/schemas/Professor'
 *         members:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Student'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         promoters:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Student'
 *         status:
 *           type: string
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         members:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         age:
 *           type: number
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         ra:
 *           type: number
 *         ira:
 *           type: number
 *         semester:
 *           type: number
 *         course:
 *           $ref: '#/components/schemas/Course'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Professor:
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         age:
 *           type: number
 *         email:
 *           type: string
 *         role:
 *           type: string
 *         researchField:
 *           type: string
 *         collegiateBody:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       properties:
 *         name:
 *           type: string
 *         abbreviation:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       properties:
 *         name:
 *           type: string
 *         abbreviation:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       properties:
 *         id:
 *           type: string
 *         street:
 *           type: string
 *         number:
 *           type: string
 *         district:
 *           type: string
 *         zipCode:
 *           type: number
 *         complement:
 *           type: string
 *         referencePoint:
 *           type: string
 */
