import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

function readJsonFile(fileName) {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function getHealth(req, res) {
  res.json({
    success: true,
    status: 'ok',
    message: 'at.syifa portfolio API is healthy and operational',
    timestamp: new Date().toISOString()
  });
}

export function getProjects(req, res, next) {
  try {
    const projects = readJsonFile('projects.json');
    res.json({
      success: true,
      data: projects,
      message: 'Projects retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
}

export function getProjectBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Project slug is required'
      });
    }

    const projects = readJsonFile('projects.json');
    const project = projects.find(
      (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with slug '${slug}' not found`
      });
    }

    res.json({
      success: true,
      data: project,
      message: 'Project retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
}

export function getExperiences(req, res, next) {
  try {
    const experiences = readJsonFile('experiences.json');
    res.json({
      success: true,
      data: experiences,
      message: 'Experiences retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
}

export function getAchievements(req, res, next) {
  try {
    const achievements = readJsonFile('achievements.json');
    res.json({
      success: true,
      data: achievements,
      message: 'Achievements retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
}

export function getVolunteer(req, res, next) {
  try {
    const volunteer = readJsonFile('volunteer.json');
    res.json({
      success: true,
      data: volunteer,
      message: 'Volunteering records retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
}

export function getArticles(req, res, next) {
  try {
    const articles = readJsonFile('articles.json');
    res.json({
      success: true,
      data: articles,
      message: 'Articles retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
}

export function getArticleBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Article slug is required'
      });
    }

    const articles = readJsonFile('articles.json');
    const article = articles.find(
      (a) => a.slug.toLowerCase() === slug.toLowerCase() || a.id === slug
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: `Article with slug '${slug}' not found`
      });
    }

    res.json({
      success: true,
      data: article,
      message: 'Article retrieved successfully'
    });
  } catch (err) {
    next(err);
  }
}
