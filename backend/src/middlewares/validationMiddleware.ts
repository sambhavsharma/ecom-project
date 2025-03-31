import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {

    const {status, error} = zodParse(schema, req.body);

    if(error) { 
      res.status(status).json({ error: error });
    }

    next();
  };
}

export function zodParse(schema: z.ZodObject<any, any>, data: object) {
  try {
    schema.parse(data);
    return {status: 200};
  } catch (error) {
    var errorMessages;
    var status;
    if (error instanceof ZodError) {
      status = 400;
      errorMessages = error.errors.map((issue: any) => ({
        message: `${issue.path.join('.')} is ${issue.message}`,
      }));
      
    } else {
      status = 500;
      errorMessages = 'Internal Server Error' 
    };
    return {status: status, error: errorMessages};
  }
}