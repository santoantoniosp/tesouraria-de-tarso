import { NextFunction, Request, Response } from "express";

export function cors(request: Request, response: Response, next: NextFunction) {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://192.168.0.100:3000',
    'http://localhost:5173',
    'http://192.168.0.100:5173',
  ];


  const origin = request.header('origin');
  const isAllowed = allowedOrigins.includes(origin!);

  if (isAllowed) {
    response.setHeader('Access-Control-Allow-Origin', origin!);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Max-Age', '10');
  }

  next();
}
