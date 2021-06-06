export type APIError = {
  status: string;
  error?: any;
  message: string;
  stack?: string | undefined;
};
