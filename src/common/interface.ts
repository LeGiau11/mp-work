export interface Option {
  value: string;
  label: string;
}

export interface ResponseData<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}
