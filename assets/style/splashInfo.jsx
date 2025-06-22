import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    fundo001:{
        flex: 1,
        justifyContent:"flex-start",
        alignItems:'flex-start',
        zIndex:-1
        
    },
    fundo002:{
        flex: 1,
        justifyContent:"flex-start",
        alignItems:'flex-end',
        zIndex:-1
        
    },
    forma002: {
        position: 'absolute',
        top: 0,
        right:0,
        width: 110, 
        height: 161, 
        zIndex:-1
    },
    containerMain:{
        flex:1,
        alignItems:'center',
        paddingTop:200,
        display:'flex',
        gap:30
    },
    txt:{
        fontSize:30,
        fontFamily:'MinhaFonte-Regular'
    },
    txt002:{
        fontFamily: 'Fonte-texto',
        fontSize:15,
        textAlign:'center'
    },
    back:{
        fontSize:25,
        fontFamily:'Poppins_Bold',
        color:'#000'
    },
    next:{
        fontSize:25,
        fontFamily:'Poppins_Bold',
        color:'#1261D7'
    },
    container002:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 10,
        marginBottom: 20,
    }
})