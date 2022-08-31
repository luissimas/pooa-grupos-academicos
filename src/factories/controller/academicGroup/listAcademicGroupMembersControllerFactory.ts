import { listAcademicGroupMembersUsecaseFactory } from '@factories/usecase/academicGroup/listAcademicGroupMembersFactory'
import { IHttpController } from '@http'
import { ListAcademicGroupMembersController } from '@http/controllers/academicGroup/listAcademicGroupMembersController'

export class listAcademicGroupMembersControllerFactory {
  createController(): IHttpController {
    const listAcademicGroupMembersUsecase = new listAcademicGroupMembersUsecaseFactory().createUsecase()
    const listAcademicGroupMembersController = new listAcademicGroupMembersController(listAcademicGroupMembersUsecase)
    // nao imagino o que esta errado aqui, a questao do tipo que ele levanta nao significa nada pra mim

    return listAcademicGroupMembersController
  }
}
