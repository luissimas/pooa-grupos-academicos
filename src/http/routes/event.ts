import { CreateEventControllerFactory } from '@factories/controller/event/createEventControllerFactory'
import { UpdateEventControllerFactory } from '@factories/controller/event/updateEventControllerFactory'
import { AuthMiddlewareFactory } from '@factories/middlewares/authMiddlewareFactory'
import { adaptController } from '@http/adapters/expressControllerAdapter'
import { adaptMiddleware } from '@http/adapters/expressMiddlewareAdapter'
import { Router } from 'express'

const router = Router()

const authMiddleware = AuthMiddlewareFactory.createMiddleware()
const createEventController = CreateEventControllerFactory.createController()
const updateEventController = UpdateEventControllerFactory.createController()

router.use('/', adaptMiddleware(authMiddleware))

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Cadastro de eventos.
 *     description: Cria um novo evento no sistema.
 *     tags:
 *       - Evento
 *     requestBody:
 *       content:
 *         'application/json':
 *           schema:
 *            properties:
 *              name:
 *                type: string
 *              date:
 *                type: string
 *                format: date-time
 *              location:
 *                type: object
 *                properties:
 *                  street:
 *                    type: string
 *                  number:
 *                    type: string
 *                  district:
 *                    type: string
 *                  zipCode:
 *                    type: string
 *                  complement:
 *                    type: string
 *                  referencePoint:
 *                    type: string
 *              promoters:
 *                type: array
 *                items:
 *                  type: string
 *                  format: uuid
 *              speakers:
 *                type: array
 *                items:
 *                  type: string
 *              groupsPromoting:
 *                type: array
 *                items:
 *                  type: string
 *                  format: uuid
 *              groupsInvited:
 *                type: array
 *                items:
 *                  type: string
 *                  format: uuid
 *              status:
 *                type: string
 *            required:
 *              - name
 *              - date
 *              - promoters
 *              - status
 *              - location
 *              - speakers
 *              - groupsPromoting
 *              - groupsInvited
 *     responses:
 *      '201':
 *        description: Evento criado com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  type: string
 *                  description: Identificador do evento criado.
 *      '400':
 *        description: Campos da requisição inválidos
 *      '404':
 *        description: Usuário não encontrado
 *      '409':
 *        description: Não é possível criar o evento
 *      '500':
 *        description: Erro interno no servidor
 */
router.post('/', adaptController(createEventController))

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Atualização de eventos.
 *     description: Atualiza um evento cadastrado no sistema.
 *     tags:
 *       - Evento
 *     parameters:
 *       - name: eventId
 *         in: path
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         'application/json':
 *           schema:
 *            properties:
 *              name:
 *                type: string
 *              date:
 *                type: string
 *                format: date-time
 *              location:
 *                type: object
 *                properties:
 *                  street:
 *                    type: string
 *                  number:
 *                    type: string
 *                  district:
 *                    type: string
 *                  zipCode:
 *                    type: string
 *                  complement:
 *                    type: string
 *                  referencePoint:
 *                    type: string
 *              speakers:
 *                type: array
 *                items:
 *                  type: string
 *              status:
 *                type: string
 *     responses:
 *      '204':
 *        description: Evento atualizado com sucesso
 *      '400':
 *        description: Campos da requisição inválidos
 *      '404':
 *        description: Evento não encontrado
 *      '409':
 *        description: Não é possível atualizar o evento
 *      '500':
 *        description: Erro interno no servidor
 */
router.patch('/:eventId', adaptController(updateEventController))

export { router }
