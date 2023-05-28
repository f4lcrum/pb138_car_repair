import type { Response } from 'express';

export const unauthorizedRequestResponse = (res: Response, messageError: string) => {
  res.status(401).send({ status: 'Unauthorized', error: messageError});
};

export const sendBadRequestResponse = (res: Response, messageError: String) => {
  res.status(400).send({ status: 'failure', error: messageError });
};

export const notFoundRequestResponse = (res: Response) => {
  res.status(404).send({ status: 'Not found', error: 'NotFound' });
};

export const receivedRequestResponse = (res: Response, inputData: any) => {
  res.status(200).send(inputData);
};

export const createdSuccessRequestResponse = (res: Response, inputData: any) => {
  res.status(201).send({ data: inputData });
};

export const backendErrorRequestResponse = (res: Response) => {
  res.status(500).send({ status: 'Internal error' });
}

export const forbiddenRequestResponse = (res: Response, messageError: string) => {
  res.status(403).send({ status: 'Forbidden', error: messageError });
}
