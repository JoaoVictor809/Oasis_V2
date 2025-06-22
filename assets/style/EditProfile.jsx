import { StyleSheet } from 'react-native'

export default StyleSheet.create({
     safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Added padding for better text visibility
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100, 
    height: 100, 
    borderRadius: 50, // Match avatar styling
    justifyContent: 'center', // Center icon and text
    alignItems: 'center',
    backgroundColor: '#EFEFEF', // Light background for placeholder
  },
  changePhotoText: {
    fontSize: 14,
    color: '#888', // Keep color as is or adjust if needed
    marginTop: 8,
  },
  container: {
    flex: 1, // Allow container to fill remaining space
    padding: 20,
    justifyContent: 'flex-start', // Align items to the start
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  logoutButtonContainer: {
    marginTop: 15, 
    marginBottom: 20, 
  },
  authMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  authSuggestion: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  centeredContent: {
    flex: 1, // Ensure it takes full height to center content
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxImg01: {
    position: 'absolute',
    top: 0,
    right:0,
  },
  boxImg02: {
    position: 'absolute',
    bottom:0,
    left:0,
  },
})