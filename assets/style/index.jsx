import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    fundo: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1261D7',
    },
    container: {
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'flex-end', 
    },
    forma001: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 150,
        height: 150, 
    },
    container002: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start', 
    },
    forma002: {
        position: 'absolute',
        bottom: 0,
        left:0,
        width: 150, 
        height: 150, 
    },
    title:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    botao:{
        position: 'absolute',
        bottom: 35,
        right:20,
    }
});
