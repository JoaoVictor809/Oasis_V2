import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
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
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PRIMARY_COLOR = '#1261D7'; 
const TEXT_COLOR_PRIMARY = '#333333';
const TEXT_COLOR_SECONDARY = '#555555';
const BACKGROUND_COLOR = '#F4F7FC'; 
const CARD_BACKGROUND_COLOR = '#FFFFFF';
const ERROR_COLOR = '#D32F2F'; 

const LESSON_TITLE: string = "Interpretação de Texto";

interface LessonPart {
  type: 'text' | 'video';
  content: string; 
  title?: string;
  estimatedTime?: number; 
}

import { useFonts } from 'expo-font'; 
import { useEffect } from 'react';



// Component
const LessonScreen: React.FC = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_Regular: require("@/assets/fonts/poppins/Poppins-Regular.ttf"),
    Poppins_Bold: require("@/assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/poppins/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {

    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const initialLessonParts: LessonPart[] = [
    {
      type: 'video',
      title: 'Vídeo Introdutório: A Arte de Interpretar',
      content: require('@/assets/video/Generated File June 21, 2025 - 9_50AM.mp4'), // Ensure this path is correct
      estimatedTime: 5,
    },
    {
    type: 'text',
    title: '📚 O que é Interpretação de Textos?',
    content: 'Interpretação de textos é a habilidade de decifrar e compreender profundamente o conteúdo apresentado, identificando não apenas o que está explícito, mas também as nuances, intenções do autor e informações implícitas. \n📌 Em contextos de concursos, como os dos Correios, essa competência é crucial, pois frequentemente as questões testam sua capacidade de ir além da leitura superficial.',
    estimatedTime: 3,
  },
  {
    type: 'text',
    title: '🛠️ Estratégias-Chave para uma Interpretação Eficaz',
    content: `1️⃣ Leitura Atenta e Múltipla: Não se contente com uma única leitura. A primeira serve para um contato inicial, as seguintes para aprofundamento.\n
2️⃣ Contextualize: Entenda o contexto em que o texto foi escrito e o público-alvo.\n
3️⃣ Vocabulário é Poder: Palavras desconhecidas podem ser barreiras. Tente inferir pelo contexto ou, se permitido, consulte um dicionário.\n
4️⃣ Sublinhe e Anote: Destaque ideias centrais, palavras-chave e faça pequenas anotações marginais.\n
5️⃣ Identifique a Tese Central: Qual a principal mensagem ou argumento que o autor defende?\n
6️⃣ Atenção aos Detalhes: Conectivos (e.g., 'mas', 'portanto', 'embora') são pistas importantes sobre a argumentação.\n
7️⃣ Diferencie Fato de Opinião: Nem tudo no texto é uma verdade absoluta; saiba separar o que é informação objetiva do que é ponto de vista do autor.`,
    estimatedTime: 7,
  },
  {
    type: 'text',
    title: '💡 Dica de Ouro: Pergunte ao Texto',
    content: '📝 Antes mesmo de ler as alternativas de uma questão, formule perguntas sobre o texto com base no enunciado. \n\n🔎 Exemplo: "O que o autor quis dizer com X expressão?" \n\n➡️ Isso direciona seu foco durante a releitura.',
    estimatedTime: 2,
  },
  {
    type: 'text',
    title: '🧪 Exemplo Prático Comentado',
    content: `📄 Texto: "A comunicação digital, apesar de conectar instantaneamente pessoas de todo o globo, muitas vezes empobrece a profundidade das interações humanas. A urgência da resposta sobrepõe-se à reflexão, e o emoji substitui a nuance da expressão."\n
❓ Questão: Qual a principal crítica do autor à comunicação digital?\n
🧐 Análise: O autor critica a superficialidade ("empobrece a profundidade", "emoji substitui a nuance") e a perda de reflexão ("urgência sobrepõe-se à reflexão") nas interações digitais, apesar de reconhecer seu poder de conexão.`,
    estimatedTime: 5,
  },
  {
    type: 'text',
    title: '🔁 Recapitulando para Fixar',
    content: 'Nesta aula, você explorou o conceito de interpretação textual, aprendeu técnicas valiosas para desvendar os segredos de um texto e viu um exemplo prático. \n\n✅ Lembre-se: a interpretação é uma habilidade que se aprimora com a prática constante. Continue exercitando!',
    estimatedTime: 3,
  }
];

  const [lessonParts] = useState<LessonPart[]>(initialLessonParts);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [lessonCompleted, setLessonCompleted] = useState<boolean>(false);
  const [xpGained, setXpGained] = useState<number>(0);

  const handleNext = (): void => {
    if (currentStepIndex < lessonParts.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
    } else {
      handleCompleteLesson();
    }
  };

  const handlePrevious = (): void => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleCompleteLesson = (): void => {
    const earnedXp: number = 100; 
    setXpGained(earnedXp);
    setLessonCompleted(true);
    Alert.alert(
      "Aula Concluída!",
      `Parabéns! Você ganhou ${earnedXp} XP. Continue assim!`,
      [{ text: "OK" }]
    );
  };

  if (lessonCompleted) {
    return (
      <GestureHandlerRootView style={styles.gestureHandlerRoot}>
        <SafeAreaView style={[styles.container, styles.centeredScreen]}>

          <Text style={styles.completionTitle}>Missão Cumprida!</Text>
          <Text style={styles.completionText}>Você ganhou +{xpGained} XP!</Text>
        <TouchableOpacity
  onPress={() => {
    setLessonCompleted(false);
    setCurrentStepIndex(0);
    setXpGained(0);
    router.push('/pages/main/progress');
  }}
  style={[styles.button, styles.primaryButton, styles.continueButton]}
>
  <Text style={styles.buttonText}>Continuar Aprendendo</Text>
</TouchableOpacity>

        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }

  const currentPart = lessonParts[currentStepIndex];
  const progressPercentage = ((currentStepIndex + 1) / lessonParts.length) * 100;

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRoot}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBar}>
         <Pressable onPress={() => router.push('/pages/main/pagesRoot/studyPlanEnem')} style={styles.backButton}>
  <Image style={styles.backIcon} source={require('@/assets/images/Back.png')} />
</Pressable>

          <Text style={styles.headerTitle}>{LESSON_TITLE}</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>

        <ScrollView style={styles.contentScrollArea} contentContainerStyle={styles.contentScrollContainer}>
          {currentPart ? (
            <View style={styles.card}>
              {currentPart.title && (
                <Text style={styles.partTitleText}>{currentPart.title}</Text>
              )}
              {currentPart.estimatedTime && (
                <Text style={styles.estimatedTimeText}>Tempo estimado: {currentPart.estimatedTime} min</Text>
              )}

              {currentPart.type === 'text' && (
                <Text style={styles.didacticText}>{currentPart.content}</Text>
              )}
              {currentPart.type === 'video' && currentPart.content && (
                <View style={styles.videoContainer}>
                  <Video
                    ref={videoRef}
                    style={styles.videoPlayer}
                    source={currentPart.content}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    onPlaybackStatusUpdate={newStatus => setStatus(() => newStatus)}
                    onError={(error) => Alert.alert("Erro no Vídeo", `Não foi possível carregar o vídeo. ${error}`)}
                  />
                  <View style={styles.videoControls}>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={() => status?.isLoaded && status.isPlaying ? videoRef.current?.pauseAsync() : videoRef.current?.playAsync()}
                      disabled={!status?.isLoaded}
                    >
                      <Text style={styles.controlButtonText}>{status?.isLoaded && status.isPlaying ? 'Pausar' : 'Reproduzir'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {!currentPart.content && currentPart.type === 'video' && (
                <Text style={styles.errorText}>Vídeo não encontrado. Verifique o caminho do arquivo.</Text>
              )}
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.didacticText}>Carregando conteúdo da aula...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.navigationFooter}>
          <TouchableOpacity
            onPress={handlePrevious}
            style={[styles.button, styles.secondaryButton, currentStepIndex === 0 && styles.disabledButton]}
            disabled={currentStepIndex === 0}
          >
            <Text style={styles.buttonText}>‹ Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.button, styles.primaryButton]}
          >
            <Text style={styles.buttonText}>
              {currentStepIndex === lessonParts.length - 1 ? 'Concluir Aula' : 'Próximo ›'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRoot: {
    flex: 1,
  } as ViewStyle,
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  } as ViewStyle,
  centeredScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  } as ViewStyle,
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 15 : 10,
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  } as ViewStyle,
  backButton: {
    padding: 5, // Easier to tap
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: PRIMARY_COLOR,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600', // Semibold
    color: TEXT_COLOR_PRIMARY,
    fontFamily: 'Poppins-SemiBold',
  } as TextStyle,
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    width: '100%',
  } as ViewStyle,
  progressBarFill: {
    height: '100%',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 4,
  } as ViewStyle,
  contentScrollArea: {
    flex: 1,
  } as ViewStyle,
  contentScrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,
  partTitleText: {
    fontSize: 20, // Slightly larger
    fontWeight: 600, 
    color: PRIMARY_COLOR,
    marginBottom: 12,
    fontFamily: 'Poppins-SemiBold',
  } as TextStyle,
  estimatedTimeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: TEXT_COLOR_SECONDARY,
    marginBottom: 15,
    fontStyle: 'italic',
  } as TextStyle,
  didacticText: {
    fontSize: 16,
    lineHeight: 26, // Improved readability
    color: TEXT_COLOR_PRIMARY,
    fontFamily: 'Poppins-Regular', // Make sure Poppins-Regular is linked
    textAlign: 'justify',
  } as TextStyle,
  videoContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden', // Ensures children (video) also have rounded corners
    backgroundColor: '#000',
  } as ViewStyle,
  videoPlayer: {
    width: '100%',
    aspectRatio: 9 / 16, // Common video aspect ratio
  } as ViewStyle,
  videoControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent controls background
  } as ViewStyle,
  controlButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  } as ViewStyle,
  controlButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  } as TextStyle,
  errorText: {
    fontSize: 14,
    color: ERROR_COLOR,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingVertical: 10,
  } as TextStyle,
  navigationFooter: {
    fontFamily: 'Poppins-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: CARD_BACKGROUND_COLOR,
  } as ViewStyle,
  button: {
    fontFamily: 'Poppins-Regular',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25, 
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: SCREEN_WIDTH * 0.4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,
  primaryButton: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: PRIMARY_COLOR,
  } as ViewStyle,
  secondaryButton: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#757575', 
  } as ViewStyle,
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600', 
    fontFamily: 'Poppins-SemiBold',
  } as TextStyle,
  disabledButton: {
    backgroundColor: '#BDBDBD', 
    elevation: 0,
    shadowOpacity: 0,
  } as ViewStyle,

  completionTitle: {
    fontSize: 26,
    fontWeight: 'bold', 
    color: PRIMARY_COLOR,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 10,
  } as TextStyle,
  completionText: {
    fontSize: 18,
    color: TEXT_COLOR_PRIMARY,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 30,
  } as TextStyle,
  continueButton: {
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    paddingVertical: 15, 
  } as ViewStyle,


});

export default LessonScreen;
