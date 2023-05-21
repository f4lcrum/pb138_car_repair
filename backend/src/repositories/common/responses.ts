import type { Response } from 'express';

export const sendBadRequestResponse = (res: Response, messageError: String) => {
  res.status(400).send({ status: 'failure', error: messageError });
};

export const notFoundRequestResponse = (res: Response) => {
  res.status(404).send({ status: 'Not found', error: 'NotFound' });
};

export const receivedRequestResponse = (res: Response, inputData: any) => {
  res.status(200).send({ data: inputData });
};

export const createdSuccessRequestResponse = (res: Response, inputData: any) => {
  res.status(201).send({ data: inputData });
};
