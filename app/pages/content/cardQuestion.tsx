import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Alert, StyleSheet, Pressable, Image } from "react-native";
import { useFonts } from "expo-font";
import { Link } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Card, Button } from "@rneui/themed";
import * as Progress from "react-native-progress";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import styles from "@/assets/style/cardQuestion"; 
import { Stack, useRouter } from "expo-router";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "Qual o órgão responsável pela fiscalização do sistema financeiro nacional?",
    options: [
      "Banco Central do Brasil",
      "Conselho Monetário Nacional",
      "Comissão de Valores Mobiliários",
      "Agência Nacional de Saúde Suplementar",
    ],
    answer: "Banco Central do Brasil",
  },
  {
    id: 2,
    question: "Qual é a capital do Estado de Minas Gerais?",
    options: ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Contagem"],
    answer: "Belo Horizonte",
  },
  {
    id: 3,
    question: "Em qual ano foi promulgada a Constituição Federal do Brasil?",
    options: ["1988", "1990", "1986", "1992"],
    answer: "1988",
  },
];

const QuizScreen = () => {
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<"correct" | "incorrect" | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const scale = useSharedValue(1);

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    scale.value = withSpring(1.1);
    if (option === questions[currentQuestion].answer) {
      setAnswerResult("correct");
      setScore((prev) => prev + 1);
      Alert.alert("Correto!", "Você acertou a questão.");
    } else {
      setAnswerResult("incorrect");
      Alert.alert("Errado!", "Resposta incorreta.");
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerResult(null);
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 1000);
  };

  const progressValue = (currentQuestion + (selectedAnswer ? 1 : 0)) / questions.length;
  const router = useRouter();

  return (

    <View style={localStyles.quizContainer}>
      <View style={localStyles.headerBack}>
        <Pressable  onPress={() => router.push('../')}>
          <Link href={'../'}>
            <Image style={{ width: 30, height: 30 }} source={require('@/assets/images/Back.png')} />
          </Link>
        </Pressable>
        <View style={localStyles.headerTitle}>
          <Text style={{ fontFamily: 'Poppins_Bold', color: '#fff', fontSize: 20 }}>Voltar para página inícial</Text>
          
        </View>
      </View>
      <Text style={localStyles.header}>Quiz de Concursos</Text>
      <View style={localStyles.infoContainer}>
        <Text style={localStyles.infoText}>
          Questão: {currentQuestion + 1}/{questions.length}
        </Text>
        <Text style={localStyles.infoText}>Pontuação: {score}</Text>
      </View>
      <Progress.Bar
        progress={progressValue}
        width={250}
        color="#1261D7"
        borderRadius={5}
        style={{ marginVertical: 10 }}
      />
      <Card containerStyle={localStyles.card}>
        <Text style={localStyles.questionText}>
          {questions[currentQuestion].question}
        </Text>
        {questions[currentQuestion].options.map((option: string) => (
          <Animated.View key={option} style={{ transform: [{ scale }] }}>
            <Button
              title={option}
              onPress={() => handleAnswer(option)}
              buttonStyle={
                selectedAnswer === option
                  ? answerResult === "incorrect"
                    ? localStyles.incorrectOption
                    : localStyles.selectedOption
                  : localStyles.option
              }
              containerStyle={localStyles.optionContainer}
            />
          </Animated.View>
        ))}
      </Card>
    </View>
  );
};

export default function Test() {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: require("@/assets/fonts/poppins/Poppins-Regular.ttf"),
    Poppins_Bold: require("@/assets/fonts/poppins/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.screenFull}>
      <QuizScreen />
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#f4f4f4", // cor de fundo mais clara
  },
  header: {
    fontSize: 28,
    fontFamily: "Poppins_Bold",
    marginBottom: 20,
    color: "#1261D7", // azul personalizado
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Poppins_Regular",
    color: "#333",
  },
  card: {
    width: "100%",
    padding: 25,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 10, // sombra mais destacada
    shadowColor: "#000", // sombra mais forte
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  questionText: {
    fontSize: 20,
    fontFamily: "Poppins_Bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  optionContainer: {
    marginVertical: 10,
  },
  option: {
    backgroundColor: "#1261D7", 
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#2ecc71", 
    paddingVertical: 12,
    borderRadius: 8,
  },
  incorrectOption: {
    backgroundColor: "#e74c3c", 
    paddingVertical: 12,
    borderRadius: 8,
  },
  headerBack: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#1261D7',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex:1
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight:50
   
  },
});

