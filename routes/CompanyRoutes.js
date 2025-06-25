import express from "express"
import { getCompany, getCompanyById, registerCompany, UpdateCompany } from "../controllers/CompanyController.js";

import IsAuthenticated from "../middlewares/IsAuthenticated.js"
import  {singleUpload} from "../middlewares/multer.js"
const router = express.Router();

router.route("/register").post(IsAuthenticated , registerCompany);
router.route("/get").get(IsAuthenticated , getCompany);
router.route("/get/:id").get(IsAuthenticated, getCompanyById);
router.route("/update/:id").put(IsAuthenticated  , singleUpload, UpdateCompany);

export default router;
