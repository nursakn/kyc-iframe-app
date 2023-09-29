import axios, { Axios } from "axios";

export function createClient(token: string): Axios {
  const client = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      identificationToken: token,
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.status || error.status === 500 || error.detail) {
        return Promise.reject("Внутреняя ошибка сервиса. Обратитесь в тех поддержку.");
      }

      if (error.status === 404) {
        return Promise.reject("Не найдено. Обратитесь в тех поддержку.");
      }

      if (error.status === 409) {
        return Promise.reject("Невалидный токен. Обратитесь в тех поддержку.");
      }

      if (error.status === 412) {
        return Promise.reject("Неправильно заполнены документы. Повторите заполнение формы");
      }

      return Promise.reject(error.detail);
    },
  );

  return client;
}
