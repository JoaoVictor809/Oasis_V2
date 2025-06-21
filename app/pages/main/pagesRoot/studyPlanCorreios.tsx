import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import { useRouter } from "expo-router"; // IMPORTANTE

const loadFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("../../../../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../../../assets/fonts/poppins/Poppins-Bold.ttf"),
  });
};

const modulos = [
  {
    id: "1",
    title: "Módulo 1 - Língua Portuguesa",
    data: [
      { id: "1", title: "Interpretação de Textos" },
      { id: "2", title: "Ortografia e Acentuação" },
      { id: "3", title: "Classes de Palavras" },
      { id: "4", title: "Concordância e Regência" },
      { id: "5", title: "Pontuação e Coesão" },
      { id: "6", title: "Teste o seu conhecimento" },
    ],
  },
  {
    id: "2",
    title: "Módulo 2 - Matemática",
    data: [
      { id: "7", title: "Operações Básicas" },
      { id: "8", title: "Porcentagem e Juros Simples" },
      { id: "9", title: "Razão, Proporção e Regra de Três" },
      { id: "10", title: "Média, Moda e Mediana" },
      { id: "11", title: "Teste o seu conhecimento" },
    ],
  },
  {
    id: "3",
    title: "Módulo 3 - Informática Básica",
    data: [
      { id: "12", title: "Sistemas Operacionais (Windows)" },
      { id: "13", title: "Pacote Office (Word, Excel, PowerPoint)" },
      { id: "14", title: "Navegadores e Internet" },
      { id: "15", title: "Segurança da Informação" },
      { id: "16", title: "Teste o seu conhecimento" },
    ],
  },
  {
    id: "4",
    title: "Módulo 4 - Atualidades e Cidadania",
    data: [
      { id: "17", title: "Temas Atuais do Brasil e do Mundo" },
      { id: "18", title: "Educação e Sustentabilidade" },
      { id: "19", title: "Cidadania e Direitos Humanos" },
      { id: "20", title: "Noções de Ética no Serviço Público" },
      { id: "21", title: "Teste o seu conhecimento" },
    ],
  },
];

const ModuloList = ({ title, data }) => {
  const router = useRouter();

  return (
    <View style={styles.moduleContainer}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isTestButton = item.title.includes("Teste o seu conhecimento");

          const handlePress = () => {
            if (item.id === "1") {
              router.push("/pages/content/LessonScreenIntroCorreios"); 
            } else {
              console.log("Outro conteúdo ou funcionalidade ainda não implementada.");
            }
          };

          return (
            <View style={styles.card}>
              <TouchableOpacity
                onPress={handlePress}
                style={[styles.button, isTestButton && styles.testButton]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isTestButton && styles.testButtonText,
                  ]}
                >
                  {item.title}
                </Text>
                {!isTestButton && (
                  <Icon name="chevron-right" size={18} color="#FFF" style={styles.icon} />
                )}
              </TouchableOpacity>
            </View>
          );
        }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default function CorreiosCourseScreen() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function fetchFonts() {
      await loadFonts();
      setFontsLoaded(true);
    }
    fetchFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text style={styles.loadingText}>Carregando fontes...</Text>;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {modulos.map((modulo) => (
          <ModuloList key={modulo.id} title={modulo.title} data={modulo.data} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { padding: 20 },

  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    fontFamily: "Poppins-Regular",
  },

  moduleContainer: {
    backgroundColor: "white",
    padding: 25,
    paddingVertical: 30,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1261D7",
    fontFamily: "Poppins-Bold",
  },

  card: { backgroundColor: "white", borderRadius: 10, marginVertical: 5 },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: "#1261D7",
    marginTop: 20,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },

  icon: { marginLeft: 10, color: "#FFF" },

  testButton: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#1261D7",
  },

  testButtonText: {
    color: "#1261D7",
  },
});
