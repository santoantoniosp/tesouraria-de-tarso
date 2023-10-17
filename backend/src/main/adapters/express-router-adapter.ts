import { Request, Response } from "express";
import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest } from "../../presentation/protocols/http";

export function adaptRoute(controller: Controller) {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      headers: request.headers,
      body: request.body,
      query: request.query,
      params: request.params
    }

    const httpResponse = await controller.handle(httpRequest)

    return response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
