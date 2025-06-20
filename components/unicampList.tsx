import { StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import React from 'react'

export default function unicampList(){
    return(
        <View>
            <Text style={styles.title}>Unicamp</Text>
            <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicamp2023.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
                <View style={styles.imageContainer}>
                     <Image source={require('../assets/images/unicamp/unicampCapa.png')} />
                </View>
            </ScrollView>
        </View>
    )
}

const  styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontFamily: 'Poppins_Bold',
        color: '#000',
        paddingLeft:20
    },
    container:{
        padding:8,
        margin: 10,
    },
    imageContainer: {
        marginRight: 16, 
    },
})