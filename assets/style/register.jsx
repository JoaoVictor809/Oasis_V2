import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'flex-end',
        
    },
    forma001: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 133,
        height: 150, 
        zIndex:-1,
        
    },
    container002: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        zIndex:-1 
    },
    forma002: {
        position: 'absolute',
        bottom: 0,
        left:0,
        width: 160, 
        height: 99, 
    },
    title:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        gap:20
    },
    containerRegis:{
        display:'flex',
        width:'100%',
        alignItems:'center',
        gap:5
    },
    botao:{
        position: 'absolute',
        bottom: 35,
        right:20,
    },
    txt:{
        fontSize:25,
        fontFamily:'MinhaFonte-Regular',
        color:"#1261D7",
        textAlign:"center"
    },
    caixa:{
        alignItems:"center"
    },
    input:{
        height: 45,
        padding: 10,
        width:"75%",
        borderRadius:20,
        backgroundColor:"#585454af",
        color:'#fff',
        fontFamily:'Poppins_Regular',
        borderWidth: 0, 
        outlineWidth: 0, 
        fontWeight:'bold',
        fontSize:19
    },
    enter:{
        width:'100%',
        height: 45,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        backgroundColor:"#1261D7",
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 5, 
        elevation: 5, 
    },
    containerLogin:{
        display:'flex',
        flexDirection:'row',
        gap:2
    },
    textLogin:{
      color:"#1261D7" ,
      fontFamily:'Poppins_Regular',
      display:'flex',
      fontWeight:'bold'
    },
    boxInput:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:"75%",
        borderRadius:20,
        backgroundColor:"#585454af",
        justifyContent:'space-between',
        paddingRight:15
    },
    inputPassword:{
        height: 45,
        padding: 10,
        width:"75%",
        borderRadius:20,
        color:'#fff',
        fontFamily:'Poppins_Regular',
        borderWidth: 0, 
        outlineWidth: 0, 
        fontWeight:'bold',
        fontSize:19
    }
})
