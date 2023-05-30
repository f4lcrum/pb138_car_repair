// import type { Request, Response } from 'express';
// import { receivedRequestResponse } from '../../repositories/common/responses';
// import { readSpecific } from '../../repositories/brand/read';
// import { backendErrorRequestResponse } from '../../repositories/common/responses';

// const readSpecificBrands = async(req: Request, res: Response) => {
//     const output = await readSpecific({ userId: req.session.user!.id });
//     if (output.isErr) {
//         return backendErrorRequestResponse(res);
//     }
//     const result = output.unwrap();

//     return receivedRequestResponse(res, result);
// }

// export default readSpecificBrands;
