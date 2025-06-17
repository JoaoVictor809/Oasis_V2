const express = require('express');
const router = express.Router();
const userActivityController = require('../controllers/userActivityController'); // Você precisará criar este controller
const authMiddleware = require('../middleware/authMiddleware'); // Seu middleware de autenticação

// Rota para obter dados do calendário de atividades
router.get('/activity-calendar', authMiddleware, userActivityController.getActivityCalendar);

// Rota para obter detalhes das atividades de um dia específico
router.get('/activities-by-date', authMiddleware, userActivityController.getActivitiesByDate);

module.exports = router;
