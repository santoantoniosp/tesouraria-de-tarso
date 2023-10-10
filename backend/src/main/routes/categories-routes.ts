import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeLoadCategoriesController } from "../factories/category/load-categories-controller-factory";

export const categoriesRoutes = Router()

categoriesRoutes.get('/categories', adaptRoute(makeLoadCategoriesController()))
