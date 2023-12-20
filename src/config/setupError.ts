import { IErrorData } from "../interfaces/IError";

export function configError(error: unknown): IErrorData {
  if (error instanceof Error) {
    return {
      errorMsg: error.message,
      errorObj: error,
      stackTrace: error.stack,
    };
  } else {
    return { errorMsg: "unknown server error: " + error };
  }
}
