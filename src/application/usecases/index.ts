export interface IUsecase<I, R> {
  execute: (params: I) => Promise<R>
}
