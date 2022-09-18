import {
  IListAcademicGroupsUsecase,
  ListAcademicGroupsResult
} from "@usecases/academicGroup/listAcademicGroupsUsecase"
import { HttpRequest, HttpResponse, IHttpController } from "@http"

export class ListAcademicGroupsController implements IHttpController {
  constructor(
    private readonly listAcademicGroupsUsecase: IListAcademicGroupsUsecase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<ListAcademicGroupsResult>> {
    const result = await this.listAcademicGroupsUsecase.execute({})

    return {
      status: 200,
      data: result,
    }
  }
}
