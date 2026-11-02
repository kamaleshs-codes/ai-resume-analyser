import { Router } from "express";

import {
  createResumeController,
  getUserResumesController,
<<<<<<< HEAD
=======
  getResumeByIdController,
>>>>>>> resume-builder
} from "../controllers/resume.controller.js";

import { authenticate } from "../../auth/middleware/auth.middleware.js";
import { validate } from "../../../middleware/validate.middleware.js";
import { createResumeSchema } from "../validators/resume.validator.js";

const router = Router();

// All resume routes require authentication.
router.use(authenticate);

// Create a resume after validating the request body.
router.post("/", validate(createResumeSchema), createResumeController);

// Get resumes belonging to the authenticated user.
router.get("/", getUserResumesController);

<<<<<<< HEAD
=======
router.get("/:id", getResumeByIdController);

>>>>>>> resume-builder
export default router;
