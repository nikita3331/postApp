import React from 'react'
import {StyleSheet, TouchableOpacity ,Text} from 'react-native'


const MyButton=(props)=>{
    const {title}=props
    return(
            <TouchableOpacity style={{...styles.buttonStyle,backgroundColor:props.bgColor}} onPress={()=>{props.buttonPressed()}}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        
    )
}
const styles = StyleSheet.create({
    buttonStyle: {
        padding:10,
        alignSelf:'center',
        marginTop:10,
        borderRadius:10
    },
    buttonText:{
        color:'white',
        fontSize:20
    }
})
export default MyButton