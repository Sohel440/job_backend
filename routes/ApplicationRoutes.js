import express from "express"
import isAuthenticated from "../middlewares/IsAuthenticated.js";
import { ApplyJob, getApplicants, getApplliedJobs, updateStatus } from "../controllers/ApplicationController.js";
const router = express .Router();

router.route("/apply/:id").get(isAuthenticated , ApplyJob);
router.route("/get").get(isAuthenticated , getApplliedJobs);
router.route("/:id/applicants").get(isAuthenticated , getApplicants);
router.route("/status/:id/update").post(isAuthenticated , updateStatus);

export default router;