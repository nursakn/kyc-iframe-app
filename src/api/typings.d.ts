/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/identification-methods": {
    post: {
      parameters: {
        header: {
          identificationToken: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["GetAvailablePartnerIdentificationMethodListItem"][];
            "application/json": components["schemas"]["GetAvailablePartnerIdentificationMethodListItem"][];
            "text/json": components["schemas"]["GetAvailablePartnerIdentificationMethodListItem"][];
          };
        };
        /** @description Not Found */
        404: {
          content: {
            "text/plain": components["schemas"]["ProblemDetails"];
            "application/json": components["schemas"]["ProblemDetails"];
            "text/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Conflict */
        409: {
          content: {
            "text/plain": components["schemas"]["ProblemDetails"];
            "application/json": components["schemas"]["ProblemDetails"];
            "text/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Server Error */
        500: {
          content: never;
        };
      };
    };
  };
  "/api/identification-request-draft": {
    post: {
      parameters: {
        query: {
          identificationMethodId: string;
        };
        header: {
          identificationToken: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/json": components["schemas"]["CreateIdentificationRequestDraftResponse"];
          };
        };
        /** @description Conflict */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Client Error */
        422: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Server Error */
        500: {
          content: never;
        };
      };
    };
  };
  "/api/identification-request-draft/create-identification-request/{identificationRequestDraftId}": {
    post: {
      parameters: {
        header: {
          identificationToken: string;
        };
        path: {
          identificationRequestDraftId: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/json": components["schemas"]["CreateIdentificationRequestByDraftResponse"];
          };
        };
        /** @description Conflict */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Client Error */
        412: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Client Error */
        422: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Server Error */
        500: {
          content: never;
        };
      };
    };
  };
  "/api/identification-request-draft/check-result": {
    get: {
      parameters: {
        header: {
          identificationToken: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/json": components["schemas"]["GetIdentificationRequestDraftResultResponse"];
          };
        };
        /** @description Not Found */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Conflict */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Client Error */
        422: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Server Error */
        500: {
          content: never;
        };
      };
    };
  };
  "/api/identification-request-draft/{identificationRequestDraftId}/add-document": {
    post: {
      parameters: {
        header: {
          identificationToken: string;
        };
        path: {
          identificationRequestDraftId: string;
        };
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateIdentificationRequestDocumentRequest"];
          "text/json": components["schemas"]["CreateIdentificationRequestDocumentRequest"];
          "application/*+json": components["schemas"]["CreateIdentificationRequestDocumentRequest"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/json": string;
          };
        };
        /** @description Not Found */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Conflict */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Client Error */
        422: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Server Error */
        500: {
          content: never;
        };
      };
    };
  };
  "/api/identification-request-draft/{identificationRequestDraftId}/delete-document/{documentId}": {
    delete: {
      parameters: {
        header: {
          identificationToken: string;
        };
        path: {
          identificationRequestDraftId: string;
          documentId: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: never;
        };
        /** @description Not Found */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Conflict */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Client Error */
        422: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Server Error */
        500: {
          content: never;
        };
      };
    };
  };
  "/api/identification-request-draft/{identificationRequestDraftId}/documents": {
    get: {
      parameters: {
        header: {
          identificationToken: string;
        };
        path: {
          identificationRequestDraftId: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/json": components["schemas"]["GetIdentificationRequestDraftDocumentListItem"][];
          };
        };
        /** @description Not Found */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Conflict */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Client Error */
        422: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Server Error */
        500: {
          content: never;
        };
      };
    };
  };
  "/api/identification-request-draft/{identificationRequestDraftId}/add-document-scan/{documentId}": {
    post: {
      parameters: {
        header: {
          identificationToken: string;
        };
        path: {
          identificationRequestDraftId: string;
          documentId: string;
        };
      };
      requestBody?: {
        content: {
          "multipart/form-data": {
            files?: string[];
          };
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: never;
        };
        /** @description Not Found */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Conflict */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Client Error */
        422: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** @description Server Error */
        500: {
          content: never;
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    AuthenticationDetailsModel: {
      type?: string | null;
      url?: string | null;
    };
    CreateIdentificationRequestByDraftResponse: {
      /** Format: uuid */
      identificationRequestId?: string;
      externalIdentificationRequestId?: string | null;
      authenticationDetails?: components["schemas"]["AuthenticationDetailsModel"];
    };
    CreateIdentificationRequestDocumentFieldModel: {
      name?: string | null;
      value?: string | null;
    };
    CreateIdentificationRequestDocumentRequest: {
      type?: string | null;
      fields?: components["schemas"]["CreateIdentificationRequestDocumentFieldModel"][] | null;
    };
    CreateIdentificationRequestDraftResponse: {
      /** Format: uuid */
      identificationRequestDraftId?: string;
      /** Format: uuid */
      identificationMethodId?: string;
      requiredDocumentTypes?: string[] | null;
    };
    GetAvailablePartnerIdentificationMethodListItem: {
      /** Format: uuid */
      identificationMethodId?: string;
      title?: string | null;
      /** Format: uri */
      logoUrl?: string | null;
    };
    GetIdentificationRequestDraftDocumentListItem: {
      /** Format: uuid */
      documentId?: string;
      type?: string | null;
    };
    GetIdentificationRequestDraftResultResponse: {
      /** Format: uuid */
      identificationRequestDraftId?: string;
      /** Format: uuid */
      identificationMethodId?: string;
      status?: string | null;
      authenticationDetails?: components["schemas"]["AuthenticationDetailsModel"];
      successUrl?: string | null;
      failUrl?: string | null;
    };
    ProblemDetails: {
      type?: string | null;
      title?: string | null;
      /** Format: int32 */
      status?: number | null;
      detail?: string | null;
      instance?: string | null;
      [key: string]: unknown;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
