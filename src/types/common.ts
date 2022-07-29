export interface IResponse<T> extends ICommonResponse {
  data: T;
}

export interface ICommonResponse {
  success: boolean;
  message?: string;
}
