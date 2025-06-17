import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1261D7',
        position: 'relative',
        zIndex: 0,
    },
    container: {
        position: 'absolute',
        top:200,
        width: '100%',
        alignItems: 'flex-start',
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 50,
        padding: 30,
        paddingLeft:50,
    },
    mainTitle: {
            color: '#000',
            fontSize: 30,
            fontWeight: 'bold',
            letterSpacing: 1,
            marginBottom: 5, 
            marginTop: 50,
            fontFamily: 'Poppins_Bold',   
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20, 
        fontFamily: 'Poppins_Light',
    },
    subtitlePrincipal: {
        fontSize: 18,
        marginBottom: 20, 
        marginTop:50,
        fontWeight:700,
    },
    button: {
        flexDirection: 'row',
        padding: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1261D7',
        marginRight: 10, 
        marginBottom: 30, 
        
    },
    buttonImage: {
        width: 180, 
        height: 100, 
        resizeMode: 'contain', 
      
    },
    infoTestBottons: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        width:'100%',
        gap:30,
    },
    courseBox: {
      width:'100%',
      height: "auto", 
      backgroundColor:'#fff',
      borderRadius: 25,
      shadowColor: '#000', 
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 5, 
        elevation: 5, 
        padding:30,
        
    },
    courseTitle:{
        color: '#000',
            fontSize: 30,
            fontWeight: 'bold',
            letterSpacing: 1,
            marginBottom: 5, 
            fontFamily: 'Poppins_Bold',  
    },
    bookCourse:{
        position:'absolute',
        top:0,
        right:0,
        width:'26%',
        height:150,
        borderTopEndRadius:25
    },
    buttonCourse:{
        width:'40%',
        height:50,
        backgroundColor:'#1261D7',
        borderRadius:25,
        cursor:'pointer',
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
      width: 280,
      padding: 80,
    },

     //img back 
     containerBack: {
        flex: 1, 
        justifyContent: 'flex-end', 
        alignItems: 'flex-start', 
        zIndex:-1
    },
    forma001Back: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 151,
        height: 150, 
    },
    containerBack002: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start', 
        zIndex:-1
    },
    forma002Back: {
        position: 'absolute',
        top: 100,
        left:0,
        width: 146, 
        height: 150, 
    },

    titlePage:{
       position:'absolute',
       width:'100%',
       display:'flex',
       flexDirection:'column',
       top:70 ,
       paddingLeft:60,
       zIndex:65
       
    },
    subTitlePage:{},
    styletitle:{
        color:'#fff',
        fontFamily:'Poppins_Bold',
        fontSize:25
    },
    imageHome:{
        position:'absolute',
        top:-90,
        zIndex:-155,
        right:0
    },
    scrollViewContent: {
        borderWidth: 0,
    },
    scrollViewContentWithPadding: {
        paddingBottom: 80,
        borderWidth: 0,
    }
 
});
