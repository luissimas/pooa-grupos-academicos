import { v4 as uuid } from 'uuid'

export class ProcessoSeletivo {
    public readonly id: string
    public readonly data: Date
    public readonly noInscritos: number
    public readonly noVagas: number
    public readonly noIngressantes: number
    public readonly etapas: number
    
    constructor (props: Omit<ProcessoSeletivo, 'id'>, id?: string) {
        this.id = id || uuid()
        this.data = props.data
        this.noInscritos = props.noInscritos
        this.noVagas = props.noVagas
        this.noIngressantes = props.noIngressantes
        this.etapas = props.etapas
    }
}
