import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import StyleOfIndex from "../../../assets/style/home";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground,} from "react-native";

const coursesInProgress = [
  {
    id: '1',
    title: 'React Native Avançado',
    progress: '50%',
    image: 'https://placehold.co/100x100',
  },
  {
    id: '2',
    title: 'Introdução ao TypeScript',
    progress: '30%',
    image: 'https://placehold.co/100x100',
  },
  {
    id: '3',
    title: 'UI/UX para Mobile',
    progress: '75%',
    image: 'https://placehold.co/100x100',
  },
  {
    id: '4',
    title: 'Flutter Básico',
    progress: '20%',
    image: 'https://placehold.co/100x100',
  },
];

export default function CoursesInProgressScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_Regular: require('../../../assets/fonts/poppins/Poppins-Regular.ttf'),
    Poppins_Bold: require('../../../assets/fonts/poppins/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('@/assets/images/forma001.png')}
          style={StyleOfIndex.forma001Back}
          resizeMode="contain"
        />
        <ImageBackground
          source={require('@/assets/images/forma004.png')}
          style={StyleOfIndex.forma002Back}
          resizeMode="contain"
        />

        <Text style={styles.title}>Seus cursos em andamento</Text>

        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/progress.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.courseList}>
        <View style={styles.rowWrapper}>
          {coursesInProgress.map((item) => (
            <TouchableOpacity key={item.id} style={styles.courseCard}>
              <Image source={{ uri: item.image }} style={styles.courseImage} />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Text style={styles.courseProgress}>Progresso: {item.progress}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1261D7',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_Bold', 
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  headerContainer: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  courseList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  rowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseCard: {
    width: '48%',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  courseInfo: {
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_Regular',
    textAlign: 'center',
  },
  courseProgress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Poppins_Regular',
  },
});
