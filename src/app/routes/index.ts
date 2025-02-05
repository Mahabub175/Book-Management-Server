import { Router } from "express";
import { uploadRoutes } from "../modules/upload/upload.route";
import { userRoutes } from "../modules/user/user.route";
import { bookRoutes } from "../modules/book/book.route";

const router = Router();

const routes = [bookRoutes, uploadRoutes, userRoutes];

routes.forEach((route) => {
  router.use(route);
});

export default router;
