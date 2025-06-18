import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, ViewStyle, TextStyle, StyleProp } from 'react-native';
// For a real video player, you might use a library like expo-av
// import { Video } from 'expo-av';

const LESSON_TITLE: string = "Introduction to Algebra"; // Example Title
const TOTAL_LESSON_STEPS: number = 10; // Example total steps for progress

// It's good practice to define types for your styles, especially in larger applications
// For simplicity here, we'll let StyleSheet.create infer them, but you could do:
// interface Styles {
//   container: ViewStyle;
//   centeredScreen: ViewStyle;
//   // ... and so on for all styles
// }

const LessonScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(6);
  const [lessonCompleted, setLessonCompleted] = useState<boolean>(false);
  const [xpGained, setXpGained] = useState<number>(0);

  const didacticText: string = `
Welcome to your first lesson on Algebra!
Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.
In this lesson, we will cover the basics of variables, expressions, and equations.
Use the next and previous buttons to navigate through the lesson content.
Once you've gone through all the material, click 'Complete Lesson' to earn your XP!
  `;

  const videoUri: string = 'http://d23dyxeqlo5psn.cloudfront.net/big_buck_bunny.mp4'; // Example video

  const handleNext = (): void => {
    Alert.alert("Navigation", "Next button pressed!");
    // In a real app, you'd update content based on the step
    // For example: setCurrentStep(prev => Math.min(prev + 1, TOTAL_LESSON_STEPS));
  };

  const handlePrevious = (): void => {
    Alert.alert("Navigation", "Previous button pressed!");
    // In a real app, you'd update content based on the step
    // For example: setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleCompleteLesson = (): void => {
    const earnedXp: number = 75; // Example XP
    setXpGained(earnedXp);
    setLessonCompleted(true);
    Alert.alert("Lesson Complete!", `Congratulations! You've earned ${earnedXp} XP!`);
  };

  if (lessonCompleted) {
    return (
      <View style={[styles.container, styles.centeredScreen]}>
        <Text style={styles.completionText}>Parabéns!</Text>
        <Text style={styles.completionText}>Você conquistou +{xpGained} XP!</Text>
        <TouchableOpacity
          onPress={(): void => {
            setLessonCompleted(false);
            setCurrentStep(0); // Reset for demo
            setXpGained(0);
            Alert.alert("Navigation", "Returning to lesson list (placeholder)");
            // In a real app: navigation.navigate('LessonList');
          }}
          style={styles.continueButton}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progressPercentage: number = (currentStep / TOTAL_LESSON_STEPS) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.lessonTitleText}>{LESSON_TITLE}</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.contentScrollArea}>
        <Text style={styles.didacticText}>{didacticText}</Text>
        <View style={styles.videoPlayerPlaceholder}>
          <Text style={styles.videoPlaceholderText}>Video Player Placeholder</Text>
        </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  } as ViewStyle, // Added StyleProp for clarity, can be inferred
  centeredScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1, // ensure it takes full screen for centering content
  } as ViewStyle,
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30, // Adjusted padding for status bar
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#F8F9FA',
  } as ViewStyle,
  lessonTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3A3A3A',
    marginBottom: 10,
  } as TextStyle,
  progressBarTrack: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    width: '100%',
  } as ViewStyle,
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1ABC9C',
    borderRadius: 5,
  } as ViewStyle,
  contentScrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  } as ViewStyle, // Technically ScrollViewStyle but ViewStyle is compatible for this subset
  didacticText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4F4F4F',
    marginTop: 10, // Added margin top for spacing from progress bar
    marginBottom: 20,
  } as TextStyle,
  videoPlayerPlaceholder: {
    height: 200,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8, // Added border radius
  } as ViewStyle,
  videoPlaceholderText: {
    fontSize: 16,
    color: '#757575',
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
  } as ViewStyle, // Or TouchableOpacityProps['style']
  navigationButtonText: {
    fontSize: 16,
    color: '#1ABC9C',
    fontWeight: 'bold',
  } as TextStyle,
  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
  completeLessonButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  completeLessonButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  } as TextStyle,
  completionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2C3E50',
  } as TextStyle,
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,
  continueButton: {
    backgroundColor: '#1ABC9C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  } as ViewStyle,
});

export default LessonScreen;
