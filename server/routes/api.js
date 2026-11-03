import express from 'express';
import {
  getHealth,
  getProjects,
  getProjectBySlug,
  getExperiences,
  getAchievements,
  getVolunteer,
  getArticles,
  getArticleBySlug
} from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/health', getHealth);
router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);
router.get('/experiences', getExperiences);
router.get('/achievements', getAchievements);
router.get('/volunteer', getVolunteer);
router.get('/articles', getArticles);
router.get('/articles/:slug', getArticleBySlug);

export default router;
