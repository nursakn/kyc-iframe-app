import {
  GetIdentificationDocumentsResponse,
  GetIdentificationTypesResponse,
  IdentificationDocument,
} from "@/api/identification/typings.ts";
import { apiClient } from "@/api/api.ts";

type ToRemoveIdentificationGetIdentificationDocumentsResponse = {
  [key: string]: IdentificationDocument[];
};

export const identificationApi = {
  async getIdentificationTypes(): Promise<GetIdentificationTypesResponse> {
    return apiClient
      .get<GetIdentificationTypesResponse>("/types")
      .then((resp) => resp.data)
      .catch((error) => {
        throw new Error(error);
      });
  },
  async getIdentificationDocument(id: string): Promise<GetIdentificationDocumentsResponse> {
    return apiClient
      .get<ToRemoveIdentificationGetIdentificationDocumentsResponse>("/documents")
      .then((resp) => ({ documents: resp.data[id] }))
      .catch((error) => {
        throw new Error(error);
      });
  },
};
