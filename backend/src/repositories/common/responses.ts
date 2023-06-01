import type { Response } from 'express';

export const unauthorizedRequestResponse = (res: Response, messageError: string) => {
  res.status(401).send({ error: messageError, data: null });
};

// TODO: I added message into the error, since it was null,
// should we just rather send some generic error message?
export const sendBadRequestResponse = (res: Response, messageError: String) => {
  res.status(400).send({ error: messageError, data: null });
};

export const notFoundRequestResponse = (res: Response, messageError?: String) => {
  res.status(404).send({ error: messageError || null, data: null });
};

export const receivedRequestResponse = (res: Response, inputData: any) => {
  res.status(200).send({ error: null, data: inputData });
};

export const createdSuccessRequestResponse = (res: Response, inputData: any) => {
  res.status(201).send({ error: null, data: inputData });
};

export const backendErrorRequestResponse = (res: Response) => {
  res.status(500).send({ error: null, data: null });
};

export const forbiddenRequestResponse = (res: Response, messageError: string) => {
  res.status(403).send({ error: messageError, data: null });
};
