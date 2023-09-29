import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useIdentificationStore } from "@/stores/identification.ts";
import { IdentificationService } from "@/api/identification/identification.service.ts";

export function useUrlToken() {
  const params = useParams();

  const { setIdentificationService } = useIdentificationStore();

  useEffect(() => {
    if (!params.token) {
      throw new Error("Отсутствует токен приложения");
    }

    console.log(params.token);
    const newIdentificationService = new IdentificationService(params.token);
    setIdentificationService(newIdentificationService);
  }, [params.token]);
}
