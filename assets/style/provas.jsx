import { StyleSheet } from 'react-native'

export default StyleSheet.create ({
    main:{
        flex:1,
        width: "100%",
        backgroundColor:"#1261D7"
    },
    input:{
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:"#585454af",
    borderRadius:20,
    border:"none",
    color: '#fff',
    fontFamily: 'Poppins_Regular',
    width:'100%',
    },
    title:{
        color:'#fff',
        fontFamily: 'Poppins_Bold',
        paddingLeft:12
    },
    boxSearch:{
        display:'flex',
        flexDirection:'row',
        paddingBottom:30
    },
    imgSearch:{
        position:'absolute',
        top: 20,
        right:25,
        cursor:'pointer'
    },
    header:{
        display:'flex',
    },
    containerMain:{
        width:'100%',
        backgroundColor:'#fff',
        borderTopLeftRadius:50
    },
    containerEenm:{
        paddingTop:50
    }
})