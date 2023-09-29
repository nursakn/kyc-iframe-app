import axios, { Axios } from "axios";
import {
  AddDocumentScanRequest,
  AddIdentificationRequestDraftDocumentRequest,
  CheckIdentificationResultResponse,
  CreateIdentificationRequest,
  DeleteDraftDocumentRequest,
  GetDraftDocumentsResponse,
  GetIdentificationMethodResponse,
  GetIdentificationRequestDraftsRequest,
  GetIdentificationRequestDraftsResponse,
} from "@/api/identification/typings.ts";

export class IdentificationService {
  private client: Axios;

  constructor(token: string) {
    this.client = this.newClient(token);
  }

  newClient(token: string) {
    return axios.create({
      baseURL: "http://10.203.133.5:8284",
      headers: {
        identificationToken: token,
      },
    });
  }

  async getIdentificationMethods(): Promise<GetIdentificationMethodResponse> {
    return this.client.post("/api/identification-methods").then((resp) => resp.data);
  }

  async getIdentificationRequestDrafts(
    data: GetIdentificationRequestDraftsRequest,
  ): Promise<GetIdentificationRequestDraftsResponse> {
    return this.client
      .post("/api/identification-request-draft", {}, { params: data.identificationMethodId })
      .then((resp) => resp.data);
  }

  async addIdentificationRequestDraftDocument(data: AddIdentificationRequestDraftDocumentRequest): Promise<void> {
    return this.client.post(`/api/identification-request-draft/${data.identificationRequestDraftId}/add-document`, {
      type: data.type,
      fields: data.fields,
    });
  }

  async createIdentificationRequest(identificationRequestDraftId: string): Promise<CreateIdentificationRequest> {
    return this.client
      .post(`/api/identification-request-draft/create-identification-request/${identificationRequestDraftId}`)
      .then((resp) => resp.data);
  }

  async checkIdentificationResult(): Promise<CheckIdentificationResultResponse> {
    return this.client.get("/api/identification-request-draft/check-result").then((resp) => resp.data);
  }

  async deleteDraftDocument(data: DeleteDraftDocumentRequest): Promise<void> {
    return this.client.delete(
      `/api/identification-request-draft/${data.identificationRequestDraftId}/delete-document/${data.documentId}`,
    );
  }

  async getDraftDocuments(identificationRequestDraftId: string): Promise<GetDraftDocumentsResponse> {
    return this.client
      .get(`http://localhost:63342/api/identification-request-draft/${identificationRequestDraftId}/documents`)
      .then((resp) => resp.data);
  }

  async addDocumentScan(data: AddDocumentScanRequest): Promise<void> {
    return this.client.post(
      `/api/identification-request-draft/${data.identificationRequestDraftId}/add-document-scan/${data.documentId}`,
      { files: data.files },
    );
  }
}
