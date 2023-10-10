import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeCreateCommunityController } from "../factories/community/create-community-controller-factory";
import { makeFindAllCommunities } from "../factories/community/find-all-communities-controller-factory";

export const communitiesRoutes = Router();

communitiesRoutes.post('/communities', adaptRoute(makeCreateCommunityController()))
communitiesRoutes.get('/communities', adaptRoute(makeFindAllCommunities()))
