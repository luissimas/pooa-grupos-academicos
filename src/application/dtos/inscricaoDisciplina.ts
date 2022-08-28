export enum InscricaoDisciplinaStatusEnum {}

export interface InscricaoDisciplinaDTO {
  id: string
  idUser: string
  status: InscricaoDisciplinaStatusEnum
}
