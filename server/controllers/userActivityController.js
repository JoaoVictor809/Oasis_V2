const db = require('../config/db'); // Sua configuração de conexão com o banco de dados MySQL

exports.getActivityCalendar = async (req, res) => {
    const userId = req.user.id; // Assumindo que o ID do usuário vem do middleware de autenticação
    const { month } = req.query; // Espera month no formato 'YYYY-MM'

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
        return res.status(400).json({ message: 'Formato de mês inválido. Use YYYY-MM.' });
    }

    try {
        // Consulta SQL para buscar os dias distintos com atividade para o usuário e mês especificados
        const query = `
            SELECT DISTINCT DATE_FORMAT(data_resposta, '%Y-%m-%d') as activityDate
            FROM respostas_usuario
            WHERE usuario_id = ? AND DATE_FORMAT(data_resposta, '%Y-%m') = ?
            ORDER BY activityDate;
        `;

        const [results] = await db.promise().query(query, [userId, month]);

        const markedDates = {};
        results.forEach(row => {
            markedDates[row.activityDate] = {
                customStyles: {
                    container: {
                        backgroundColor: '#1261D7', // Cor de destaque
                        borderRadius: 5,
                    },
                    text: {
                        color: 'white',
                    },
                },
                // Você também pode adicionar 'marked: true' se o componente do calendário precisar.
                // marked: true,
                // dotColor: 'blue', // Ou um ponto, dependendo de como ActivityCalendar.tsx está configurado
            };
        });

        res.status(200).json(markedDates);

    } catch (error) {
        console.error("Erro ao buscar dados do calendário de atividades:", error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar dados do calendário.' });
    }
};

exports.getActivitiesByDate = async (req, res) => {
    const userId = req.user.id; // ID do usuário do middleware de autenticação
    const { date } = req.query; // Espera date no formato 'YYYY-MM-DD'

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ message: 'Formato de data inválido. Use YYYY-MM-DD.' });
    }

    try {
        const query = `
            SELECT
                ru.id as responseId,
                q.enunciado as questionTitle,
                oq.correta as isCorrect, -- Obtém o status de correto da tabela opcoes_questao
                DATE_FORMAT(ru.data_resposta, '%H:%i') as responseTime,
                c.nome as categoryName
            FROM respostas_usuario ru
            JOIN questoes q ON ru.questao_id = q.id
            JOIN opcoes_questao oq ON ru.opcao_id = oq.id -- Join com opcoes_questao
            JOIN categorias c ON q.categoria_id = c.id
            WHERE ru.usuario_id = ? AND DATE(ru.data_resposta) = ?
            ORDER BY ru.data_resposta;
        `;

        const [results] = await db.promise().query(query, [userId, date]);

        const activities = results.map(row => ({
            id: row.responseId.toString(),
            type: 'exercício', // Tipo fixo como 'exercício' baseado na tabela respostas_usuario
            title: row.questionTitle,
            status: row.isCorrect ? 'Correta' : 'Incorreta', // Assumindo que 'correta' é BOOLEAN (0 ou 1)
            timestamp: row.responseTime,
            description: \`Categoria: ${row.categoryName}\`, // Exemplo de descrição adicional
            // Outros campos como 'courseName', 'durationMinutes' podem ser adicionados se disponíveis/relevantes
        }));

        res.status(200).json(activities);

    } catch (error) {
        console.error("Erro ao buscar detalhes das atividades do dia:", error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar detalhes das atividades.' });
    }
};
