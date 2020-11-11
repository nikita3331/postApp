import React from 'react'
import { View, StyleSheet,Text} from 'react-native'
import { Icon } from 'react-native-elements';



const Header=(props)=>{
    const {title,goBack}=props
    // useEffect(() => {props.fetchAllStories()}, []);
    return(
        <View style={styles.containerStyle}>
            <Icon name='arrow-left' type='font-awesome' size={20} color='black'  onPress={goBack}/>
            <Text style={styles.headerTextStyle}>{title}</Text>
            <View/>
        </View>
        
    )
}
const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor:'#009A84',
        justifyContent:'space-between',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal:20
    },
    headerTextStyle:{
        paddingHorizontal:5,
        fontSize:20,
        color:'black',
        textAlign:'center'
    }
})
export default Header