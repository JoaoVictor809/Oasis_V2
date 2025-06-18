import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// For a real video player, you might use a library like expo-av
// import { Video } from 'expo-av';

const LESSON_TITLE = "Introduction to Algebra"; // Example Title
const TOTAL_LESSON_STEPS = 10; // Example total steps for progress

const LessonScreen = () => {
  const [currentStep, setCurrentStep] = useState(6); // Example current progress
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  // Placeholder for didactic text
  const didacticText = `
Welcome to your first lesson on Algebra!
Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.
In this lesson, we will cover the basics of variables, expressions, and equations.
Use the next and previous buttons to navigate through the lesson content.
Once you've gone through all the material, click 'Complete Lesson' to earn your XP!
  `;

  // Placeholder for video URI
  const videoUri = 'http://d23dyxeqlo5psn.cloudfront.net/big_buck_bunny.mp4'; // Example video

  const handleNext = () => {
    Alert.alert("Navigation", "Next button pressed!");
    // In a real app, you'd update content based on the step
  };

  const handlePrevious = () => {
    Alert.alert("Navigation", "Previous button pressed!");
    // In a real app, you'd update content based on the step
  };

  const handleCompleteLesson = () => {
    const earnedXp = 75; // Example XP
    setXpGained(earnedXp);
    setLessonCompleted(true);
    // Simple alert for XP, modal would be better in a full app
    Alert.alert("Lesson Complete!", `Congratulations! You've earned ${earnedXp} XP!`);
    // Here you would trigger the XP animation and navigate away or show a summary modal
  };

  if (lessonCompleted) {
    // Basic display for lesson completion message
    return (
      <View style={[styles.container, styles.centeredScreen]}>
        <Text style={styles.completionText}>Parabéns!</Text>
        <Text style={styles.completionText}>Você conquistou +{xpGained} XP!</Text>
        <TouchableOpacity
          onPress={() => {
            setLessonCompleted(false);
            setCurrentStep(0); // Reset for demo
            setXpGained(0);
            Alert.alert("Navigation", "Returning to lesson list (placeholder)");
          }}
          style={styles.continueButton} // ADDED style here
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  }

  const progressPercentage = (currentStep / TOTAL_LESSON_STEPS) * 100;

  return (
    <View style={styles.container}>
      {/* Header Implementation */}
      <View style={styles.headerContainer}>
        <Text style={styles.lessonTitleText}>{LESSON_TITLE}</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

      {/* Content Area Implementation */}
      <ScrollView style={styles.contentScrollArea}>
        <Text style={styles.didacticText}>{didacticText}</Text>
        <View style={styles.videoPlayerPlaceholder}>
          <Text style={styles.videoPlaceholderText}>Video Player Placeholder</Text>
          {/* In a real app, you might have:
            <Video
              source={{ uri: videoUri }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={styles.videoElement} // You'd need to define this style
            />
          */}
        </View>
      </ScrollView>

      {/* Content Navigation Implementation */}
      <View style={styles.navigationButtonContainer}>
        <TouchableOpacity onPress={handlePrevious} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>‹ Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.navigationButton}>
          <Text style={styles.navigationButtonText}>Próximo ›</Text>
        </TouchableOpacity>
      </View>

      {/* Footer with Complete Lesson Button Implementation */}
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handleCompleteLesson} style={styles.completeLessonButton}>
          <Text style={styles.completeLessonButtonText}>Concluir Aula</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Basic StyleSheet (will be expanded in a later step)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background as per design
    // paddingTop: 50, // REMOVED
  },
  centeredScreen: { // NEW STYLE for completion screen
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    paddingTop: 40, // ADJUSTED for status bar
    paddingHorizontal: 20, // Standardized padding
    paddingBottom: 10, // Bottom padding for separation
    backgroundColor: '#F8F9FA',
  },
  lessonTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3A3A3A',
    marginBottom: 10,
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1ABC9C',
    borderRadius: 5,
  },
  contentScrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  didacticText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4F4F4F',
    marginBottom: 20,
  },
  videoPlayerPlaceholder: {
    height: 200,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  videoPlaceholderText: {
    fontSize: 16,
    color: '#757575',
  },
  navigationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navigationButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  navigationButtonText: {
    fontSize: 16,
    color: '#1ABC9C',
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  completeLessonButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeLessonButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  completionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2C3E50', // Dark Slate Blue
  },
  buttonText: { // General button text style
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Added for better button text alignment
  },
  continueButton: { // NEW STYLE for completion screen's button
    backgroundColor: '#1ABC9C', // Teal
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center', // Ensures the button itself is centered if its container is full width
  }
});

export default LessonScreen;
