import React from 'react'
import { TextInput, StyleSheet} from 'react-native'


const MyInput=(props)=>{
    const {placeholder,inputChange,value}=props
    return(
            <TextInput placeholder={placeholder} value={value}
            onChangeText={value => {inputChange(value)}}
            style={styles.inputStyle}
            placeholderTextColor='gray'
            multiline={true}
            maxLength={200}
            />
    )
}
const styles = StyleSheet.create({
    inputStyle: {
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray', 
        borderRadius: 10, 
        alignSelf: 'center', 
        textAlign: 'justify', 
        marginTop: '5%' 
    }
})
export default MyInput