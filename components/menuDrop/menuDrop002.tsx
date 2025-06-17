// Dropdown.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

interface DropdownProps {
  selected: string;
  setSelected: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const options: string[] = ['De 1 a 2 horas', 'De 3 a 4 horas', 'De 5 a 6 horas', '7 horas'];

  const [fontsLoaded] = useFonts({
      'Poppins_Regular': require('../../assets/fonts/poppins/Poppins-Regular.ttf'),
      'Poppins_Bold': require('../../assets/fonts/poppins/Poppins-Bold.ttf'),
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
    <View style={styles.dropdown}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsActive(!isActive)}
      >
        <Text style={styles.dropdownButtonText}>{selected || 'Quantas horas você pode estudar?'}</Text>
        <MaterialIcons
          name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {isActive && (
        <View style={styles.dropdownContent}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setSelected(item);
                  setIsActive(false);
                }}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    marginVertical: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    fontFamily:'Poppins_Regular'
  },
  dropdownContent: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 12,
  },
  itemText: {
    fontSize: 15,
    color: '#333',
    fontFamily:'Poppins_Regular'
  },
});

export default Dropdown;
