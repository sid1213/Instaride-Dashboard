import { message } from "antd";
import { AxiosError } from "axios";

export interface serverError {
  message: string;
  statusCode: number;
}

function handleAxiosError(error: AxiosError<serverError | undefined>) {
  if (error.response?.request?.status === 500) {
    message.error("Please Check your internet Connection or Refresh");
    return;
  }
  if (error.response?.data) {
    message.error({
      content: error.response.data.message,
      ...(error.response.status === 401 && { key: "unauthorized" }),
    });
  } else {
    message.error(error.message);
    return;
  }
}

export default handleAxiosError;
