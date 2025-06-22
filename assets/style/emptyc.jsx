import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    title: {
        color: '#1261D7',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5, 
        fontFamily: 'Poppins_Bold', 
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',     
    },
    image: {
        width: 340,   
        height: 340,  
        resizeMode: 'contain',
        marginBottom: 15,
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#0E4DB0', 
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 8,
        
    },
    buttonText: {
        color: '#ffff',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins_Bold',
        alignItems: 'center',
    },
    back:{
        position:'absolute',
        top:25,
        left:25,
        
    },
    
})