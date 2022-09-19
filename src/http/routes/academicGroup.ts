import { adaptController } from '@adapters/expressControllerAdapter'
import { AddAcademicGroupMemberControllerFactory } from '@factories/controller/academicGroup/addAcademicGroupMemberControllerFactory'
import { CreateAcademicGroupControllerFactory } from '@factories/controller/academicGroup/createAcademicGroupControllerFactory'
import { ListAcademicGroupByIdControllerFactory } from '@factories/controller/academicGroup/listAcademicGroupByIdControllerFactory'
import { ListAcademicGroupMembersControllerFactory } from '@factories/controller/academicGroup/listAcademicGroupMembersControllerFactory'
import { AuthMiddlewareFactory } from '@factories/middlewares/authMiddlewareFactory'
import { adaptMiddleware } from '@http/adapters/expressMiddlewareAdapter'
import { Router } from 'express'

const authMiddleware = AuthMiddlewareFactory.createMiddleware()
const createAcademicGroupController = CreateAcademicGroupControllerFactory.createController()
const listAcademicGroupMembersController = ListAcademicGroupMembersControllerFactory.createController()
const addAcademicGroupMemberController = AddAcademicGroupMemberControllerFactory.createController()
const listAcademicGroupByIdController = ListAcademicGroupByIdControllerFactory.createController()

const router = Router()

router.use('/', adaptMiddleware(authMiddleware))

/**
 * @swagger
 * /academicGroup:
 *   post:
 *     summary: Cadastro de grupos acadêmicos.
 *     description: Cria um novo grupo acadêmico no sistema.
 *     tags:
 *       - Grupo acadêmico
 *     requestBody:
 *       content:
 *         'application/json':
 *           schema:
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              foundationDate:
 *                type: string
 *                format: date-time
 *              department:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  abbreviation:
 *                    type: string
 *              sponsorId:
 *                type: string
 *                format: uuid
 *              members:
 *                type: array
 *                items:
 *                  type: string
 *                  format: uuid
 *              maxMembers:
 *                type: number
 *            required:
 *              - name
 *              - description
 *              - foundationDate
 *              - department
 *              - sponsorId
 *              - members
 *              - maxMembers
 *     responses:
 *      '200':
 *        description: Grupo acadêmico criado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  type: string
 *                  description: Identificador do grupo acadêmico criado.
 *      '400':
 *        description: Campos da requisição inválidos
 *      '404':
 *        description: Usuário não encontrado
 *      '500':
 *        description: Erro interno no servidor
 */
router.post('/', adaptController(createAcademicGroupController))

/**
 * @swagger
 * /academicGroup/:academicGroupId/member:
 *   get:
 *     summary: Listagem de membros de um grupo acadêmico.
 *     description: Lista todos os membros de um grupo acadêmico dado seu `groupId`.
 *     tags:
 *       - Grupo acadêmico
 *     parameters:
 *       - name: academicGroupId
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Membros listados com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                oneOf:
 *                  - $ref: '#/components/schemas/Student'
 *                  - $ref: '#/components/schemas/Professor'
 *      '400':
 *        description: Campos inválidos
 *      '404':
 *        description: Grupo acadêmico não encontrado
 *      '500':
 *        description: Erro interno no servidor
 */
router.get('/:academicGroupId/member', adaptController(listAcademicGroupMembersController))

/**
 * @swagger
 * /academicGroup/:academicGroupId/member/new:
 *   put:
 *     summary: Adição de membros.
 *     description: Adiciona um novo membro a um grupo acadêmico cadastrado no sistema.
 *     tags:
 *       - Grupo acadêmico
 *     parameters:
 *       - name: academicGroupId
 *         in: path
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         'application/json':
 *           schema:
 *            properties:
 *              studentId:
 *                type: string
 *                format: uuid
 *            required:
 *              - studentId
 *     responses:
 *      '204':
 *        description: Membro adicionado com sucesso
 *      '400':
 *        description: Campos da requisição inválidos
 *      '404':
 *        description: Usuário ou grupo acadêmico não encontrado
 *      '409':
 *        description: Usuário não pode ser adicionado ao grupo acadêmico
 *      '500':
 *        description: Erro interno no servidor
 */
router.put('/:academicGroupId/member/new', adaptController(addAcademicGroupMemberController))

/**
 * @swagger
 * /academicGroup/:academicGroupId:
 *   get:
 *     summary: Listagem de grupo acadêmico por ID.
 *     description: Lista um grupo acadêmico com base em seu ID.
 *     tags:
 *       - Grupo acadêmico
 *     parameters:
 *       - name: academicGroupId
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: Grupo listado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AcademicGroup'
 *      '400':
 *        description: Campos inválidos
 *      '404':
 *        description: Grupo acadêmico não encontrado
 *      '500':
 *        description: Erro interno no servidor
 */
router.get('/:academicGroupId', adaptController(listAcademicGroupByIdController))

export { router }
