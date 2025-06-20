import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ou outro conjunto de ícones se preferir

// Estrutura de uma atividade detalhada (conforme definido no Passo 1)
export interface DetailedActivity {
  id: string;
  type: 'lição' | 'vídeo' | 'exercício' | 'leitura' | 'simulado' | string; // Tipos podem ser estendidos
  title: string;
  description?: string;
  status?: string;
  timestamp?: string; // HH:MM
  durationMinutes?: number;
  score?: number;
  totalScore?: number;
  link?: string;
  iconName?: string; // Nome do ícone para exibir (opcional, podemos mapear por tipo)
  courseName?: string;
}

export interface DayActivityDetailsProps {
  activities: DetailedActivity[];
  selectedDate: string; // Data no formato YYYY-MM-DD para exibir no título
}

// Mapeamento de tipo de atividade para ícone e cor (exemplo)
const activityTypeDetails: { [key: string]: { icon: keyof typeof Ionicons.glyphMap, color: string } } = {
  'lição': { icon: 'book-outline', color: '#4CAF50' },
  'vídeo': { icon: 'videocam-outline', color: '#2196F3' },
  'exercício': { icon: 'pencil-outline', color: '#FFC107' },
  'leitura': { icon: 'reader-outline', color: '#795548' },
  'simulado': { icon: 'document-text-outline', color: '#9C27B0' },
  'default': { icon: 'help-circle-outline', color: '#607D8B' },
};

const DayActivityDetails: React.FC<DayActivityDetailsProps> = ({ activities, selectedDate }) => {
  if (!activities || activities.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Atividades de {selectedDate}</Text>
        <Text style={styles.noActivityText}>Nenhuma atividade registrada para este dia.</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atividades de {formatDate(selectedDate)}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {activities.map((activity) => {
          const typeInfo = activityTypeDetails[activity.type] || activityTypeDetails['default'];
          return (
            <View key={activity.id} style={styles.activityItem}>
              <Ionicons name={typeInfo.icon} size={24} color={typeInfo.color} style={styles.icon} />
              <View style={styles.activityTextContainer}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                {activity.description && <Text style={styles.activityDescription}>{activity.description}</Text>}
                {activity.status && <Text style={styles.activityStatus}>Status: {activity.status}</Text>}
                {activity.courseName && <Text style={styles.activityCourse}>Curso: {activity.courseName}</Text>}
                {activity.durationMinutes && <Text style={styles.activityDetail}>Duração: {activity.durationMinutes} min</Text>}
                {typeof activity.score === 'number' && typeof activity.totalScore === 'number' && (
                  <Text style={styles.activityDetail}>
                    Pontuação: {activity.score}/{activity.totalScore}
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins_Bold', // Assumindo que Poppins_Bold está carregado
    color: '#1261D7',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginRight: 12,
    marginTop: 2, // Leve ajuste para alinhar com o texto
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_SemiBold', // Assumindo Poppins_SemiBold
    color: '#333',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 13,
    fontFamily: 'Poppins_Regular',
    color: '#555',
    marginBottom: 2,
  },
  activityStatus: {
    fontSize: 13,
    fontFamily: 'Poppins_Regular',
    color: '#777',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  activityCourse: {
    fontSize: 13,
    fontFamily: 'Poppins_Regular',
    color: '#777',
    marginBottom: 2,
  },
  activityDetail: {
    fontSize: 13,
    fontFamily: 'Poppins_Regular',
    color: '#777',
  },
  noActivityText: {
    fontSize: 14,
    fontFamily: 'Poppins_Regular',
    color: '#777',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default DayActivityDetails;
