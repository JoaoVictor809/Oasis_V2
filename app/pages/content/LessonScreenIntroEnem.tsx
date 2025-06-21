import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  ViewStyle,
  TextStyle,
  Pressable, 
  Image,     
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const LESSON_TITLE: string = "Interpretação de Texto"


interface LessonPart {
  type: 'text' | 'video';
  content: string; 
  title?: string; 
}


const LessonScreen: React.FC = () => {
  const initialLessonParts: LessonPart[] = [
        { type: 'video', title: 'Part 1', content: 'http://d23dyxeqlo5psn.cloudfront.net/big_buck_bunny.mp4' },
      {
    type: 'text',
    title: 'Parte 2:O que é Interpretação de Textos?',
    content: 'Interpretação de textos é a habilidade de compreender, analisar e refletir sobre o que está escrito, mesmo quando nem tudo está dito de forma direta. Em concursos públicos, essa habilidade é essencial, pois muitas perguntas exigem que você entenda a intenção do autor ou leia nas entrelinhas.'
  },
  {
    type: 'text',
    title: 'Parte 3:Dicas para Interpretar Melhor',
    content: ` Leia com atenção: evite pular trechos ou "passar o olho".\n Fique atento às palavras de ligação (portanto, porém, além disso).\n Observe o título: ele costuma antecipar o tema central.\n Identifique o objetivo do autor: ele quer informar, convencer ou emocionar?\n Cuidado com ironias ou críticas sutis.`
  },
  {
    type: 'text',
    title: 'Parte 4: Dica Rápida',
    content: '💡 Leia a pergunta antes do texto! Isso ajuda você a já buscar as informações certas, evitando distrações.'
  },
  {
    type: 'text',
    title: 'Parte 5: Exemplo Prático',
    content: `Texto: João sempre foi o último a ser escolhido no time de futebol da escola. Mesmo assim, nunca reclamava. Apenas sorria e ia para o gol, onde ninguém queria jogar.\n\nPergunta: O que o texto sugere sobre João?\n\nResposta esperada: Que ele não era bom no futebol, mas aceitava sua posição com humildade, sem demonstrar tristeza ou revolta.`
  },

  {
    type: 'text',
    title: 'Parte 6: Resumo Final',
    content: 'Você aprendeu o que é interpretação de textos, como identificar sentidos implícitos e estratégias para entender melhor o que o autor quer comunicar. A prática constante é essencial!'
  }
   

  ];
  // This would typically come from props or a data store in a real app
  const [lessonParts, setLessonParts] = useState<LessonPart[]>(initialLessonParts);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0); // Renamed and initialized to 0
  const [lessonCompleted, setLessonCompleted] = useState<boolean>(false);
  const [xpGained, setXpGained] = useState<number>(0);

  // Old didacticText and videoUri removed

  const handleNext = (): void => {
    const totalLessonSteps = lessonParts.length;
    setCurrentStepIndex(prevIndex => {
      if (prevIndex < totalLessonSteps - 1) {
        return prevIndex + 1;
      }
     
      return prevIndex;
    });
  };

  const handlePrevious = (): void => {
    setCurrentStepIndex(prevIndex => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      
      return prevIndex;
    });
  };

  const handleCompleteLesson = (): void => {
    const earnedXp: number = 75; // Example XP
    setXpGained(earnedXp);
    setLessonCompleted(true);
    Alert.alert("Lesson Complete!", `Congratulations! You've earned ${earnedXp} XP!`);
  };

  if (lessonCompleted) {
    return (
      <GestureHandlerRootView style={styles.gestureHandlerRoot}>
        <View style={[styles.container, styles.centeredScreen]}>
          <Text style={styles.completionText}>Parabéns!</Text>
          <Text style={styles.completionText}>Você conquistou +{xpGained} XP!</Text>
          <TouchableOpacity
            onPress={(): void => {
              setLessonCompleted(false);
              setCurrentStepIndex(0); 
              setXpGained(0);
              Alert.alert("Navigation", "Returning to lesson list (placeholder)");
              
            }}
            style={styles.continueButton}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    );
  }

  const totalLessonSteps = lessonParts.length;
  const progressPercentage = totalLessonSteps > 0 ? ((currentStepIndex + 1) / totalLessonSteps) * 100 : 0;
  const currentPart = lessonParts[currentStepIndex];


  return (
    <GestureHandlerRootView style={styles.gestureHandlerRoot}>
  
      <View style={styles.appHeader}>
        <Pressable onPress={() => Alert.alert("Navigation", "Navigate to Course Page (placeholder)")}>
          {/* <Link href={'../'}> */}
          <Image style={styles.backIcon} source={require('@/assets/images/Back.png')} />
          {/* </Link> */}
        </Pressable>
        <Text style={styles.appHeaderTitle}>Página Inicial</Text>
      </View>


      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
       
        <View style={styles.headerContainer}>
          <Text style={styles.lessonTitleText}>{LESSON_TITLE}</Text>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>

        <ScrollView style={styles.contentScrollArea}>
          {currentPart ? (
            <>
              {currentPart.title && (
                <Text style={styles.partTitleText}>{currentPart.title}</Text>
              )}
              {currentPart.type === 'text' && (
                <Text style={styles.didacticText}>{currentPart.content}</Text>
              )}
              {currentPart.type === 'video' && (
                <View style={styles.videoPlayerPlaceholder}>
                  <Text style={styles.videoPlaceholderText}>Video: {currentPart.content}</Text>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.didacticText}>Loading content...</Text>
          )}
        </ScrollView>

        <View style={styles.navigationButtonContainer}>
          <TouchableOpacity onPress={handlePrevious} style={styles.navigationButton}>
            <Text style={styles.navigationButtonText}>‹ Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.navigationButton}>
            <Text style={styles.navigationButtonText}>Próximo ›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={handleCompleteLesson} style={styles.completeLessonButton}>
            <Text style={styles.completeLessonButtonText}>Concluir Aula</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRoot: {
    flex: 1,
  } as ViewStyle,
  container: { 
    flex: 1,
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
  centeredScreen: { 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  } as ViewStyle,
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#1261D7',
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
  } as ViewStyle,
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#FFFFFF', 
  },
  appHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    fontFamily: 'Poppins',
  } as TextStyle,
  headerContainer: { 
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1,       
    borderBottomColor: '#E0E0E0', 
  } as ViewStyle,
  lessonTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3A3A3A',
    marginBottom: 10,
    fontFamily: 'Poppins',
  } as TextStyle,
  progressBarTrack: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8, 
    width: '100%',
  } as ViewStyle,
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1261D7', 
    borderRadius: 8, 
  } as ViewStyle,
  contentScrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  } as ViewStyle,
  didacticText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4F4F4F', 
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Poppins',
    fontWeight: 'normal',
  } as TextStyle,
  partTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A3A3A', 
    marginBottom: 8,
    marginTop: 10,
    fontFamily: 'Poppins',
  } as TextStyle,
  videoPlayerPlaceholder: {
    height: 200,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20, 
  } as ViewStyle,
  videoPlaceholderText: {
    fontSize: 16,
    color: '#757575',
    fontFamily: 'Poppins',
    fontWeight: 'normal',
  } as TextStyle,
  navigationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  } as ViewStyle,
  navigationButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  } as ViewStyle,
  navigationButtonText: {
    fontSize: 16,
    color: '#1261D7', // New Primary Blue
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  } as TextStyle,
  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
  completeLessonButton: {
    backgroundColor: '#1261D7', // New Primary Blue
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20, // Changed from 25
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  completeLessonButtonText: {
    fontSize: 18,
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  } as TextStyle,
  completionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2C3E50', 
    fontFamily: 'Poppins',
  } as TextStyle,
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins',
  } as TextStyle,
  continueButton: {
    backgroundColor: '#1261D7', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20, 
    marginTop: 20,
    alignSelf: 'center',
  } as ViewStyle,
});

export default LessonScreen;
