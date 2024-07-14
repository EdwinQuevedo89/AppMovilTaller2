import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        gap: 10,
        backgroundColor: '#c8d2d5',
        marginTop: 20
    },


    inputs:{
        width:'90%'
    },


    text:{
        fontSize: 25,
        fontWeight: 'bold', 
    },

    buttons:{
        width:'90%'

    },

    image: {
        width:300 , // Ajusta el ancho según sea necesario
        height: 100, // Ajusta la altura según sea necesario
        marginBottom: 50, // Espacio inferior entre la imagen y el texto
      },
    
      textRedirect: {
        marginTop: 20 , // aleje de de la linea anterio 
        fontSize: 15,//tamaño de letra
        color: "#ef1d1d"
      }
})