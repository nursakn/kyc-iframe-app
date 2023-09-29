import { DocumentFormFieldComposite } from "@/typings.ts";

export type IdentificationType = {
  id: number;
  name: string;
  description: string;
};

export type GetIdentificationTypesResponse = IdentificationType[];

export type GetIdentificationDocumentsResponse = {
  documents: IdentificationDocument[];
};

export type IdentificationDocument = {
  id: string;
  name: string;
  fields: DocumentFormFieldComposite[];
};

// NEW -------------------------------------------------------------------

export type IdentificationMethod = {
  identificationMethodId: string;
  title: string;
  logoUrl: string;
};

export type GetIdentificationMethodResponse = IdentificationMethod[];

export type GetIdentificationRequestDraftsRequest = {
  identificationMethodId: string;
};

export type GetIdentificationRequestDraftsResponse = {
  identificationRequestDraftId: string;
  identificationMethodId: string;
  requiredDocumentTypes: string[];
};

export type IdentificationRequestDraftCreateField = {
  name: string;
  value: string;
};

export type AddIdentificationRequestDraftDocumentRequest = {
  identificationRequestDraftId: string;
  type: string;
  fields: IdentificationRequestDraftCreateField[];
};

export type AuthenticationDetails = {
  type: string;
  url: string;
};

export type CreateIdentificationRequest = {
  identificationRequestId: string;
  externalIdentificationRequestId: string | null;
  authenticationDetails: AuthenticationDetails;
};

export type CheckIdentificationResultResponse = {
  identificationRequestDraftId: string;
  identificationMethodId: string;
  status: string | null;
  authenticationDetails: AuthenticationDetails;
  successUrl: string | null;
  failUrl: string | null;
};

export type DeleteDraftDocumentRequest = {
  identificationRequestDraftId: string;
  documentId: string;
};

export type DraftDocumentType = {
  documentId: string;
  type: string;
};

export type GetDraftDocumentsResponse = DraftDocumentType[];

export type AddDocumentScanRequest = {
  identificationRequestDraftId: string;
  documentId: string;
  files: string[];
};
