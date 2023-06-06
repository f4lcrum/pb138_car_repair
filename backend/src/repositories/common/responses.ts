import type { Response } from 'express';

export const unauthorizedRequestResponse = (res: Response, messageError: string) => {
  res.status(401).send({ error: messageError });
};

// TODO: I added message into the error, since it was null,
// should we just rather send some generic error message?
export const sendBadRequestResponse = (res: Response, messageError: String) => {
  res.status(400).send({ error: messageError });
};

export const notFoundRequestResponse = (res: Response, messageError?: String) => {
  res.status(404).send({ error: (messageError || 'not found') });
};

export const receivedRequestResponse = (res: Response, inputData: any) => {
  res.status(200).send({ data: inputData });
};

export const createdSuccessRequestResponse = (res: Response, inputData: any) => {
  res.status(201).send({ data: inputData });
};

export const backendErrorRequestResponse = (res: Response) => {
  res.status(500).send();
};

export const forbiddenRequestResponse = (res: Response, messageError: string) => {
  res.status(403).send({ error: messageError });
};
