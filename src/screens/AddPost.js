import React,{useState} from 'react'
import { View, StyleSheet,Text} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchPostComments,removePost,addComment,addPost} from '../actions/user'
import Header from '../components/header'
import MyButton from '../components/myButton'
import MyInput from '../components/myTextInput'


const FullInputField=({fieldValues,setValue,title,errorVis})=>{
    return(
        <View style={styles.InputFieldContainer}>
            <Text style={{fontSize:20}}>{title}</Text>
            <MyInput placeholder="Input" inputChange={(value)=>{setValue({...fieldValues,[title]:value});errorVis(false)}} value={fieldValues[title]}/>
        </View>
    )
}

const AddPost=(props)=>{
    const [fieldValues,setFieldValues]=useState({Name:'',Title:'',Content:''})
    const [showErrorText,setErroVis]=useState(true)
    
    const handleAddPost=()=>{
        const errorTextVisible=fieldValues.Name=='' &&fieldValues.Title=='' &&fieldValues.Content=='' 
        if(!errorTextVisible){
            props.addPost(fieldValues.Content,fieldValues.Title,fieldValues.Name)
            props.navigation.goBack()
        }
        else{
            setErroVis(true)
        }
    }
    

    const fields=['Name','Title','Content']
    return(
        <View style={{flex:1}}>
            <Header title={'Create post'} goBack={()=>{props.navigation.goBack()}}/>
            {fields.map((item,index)=>{return <FullInputField {...{fieldValues:fieldValues,setValue:setFieldValues,title:item,errorVis:setErroVis}} key={index}/>})}
            {showErrorText?<Text style={styles.errorTextStyle}>Fields can't be empt</Text>:null}            
            <MyButton title='Add post' buttonPressed={handleAddPost} bgColor='pink'/>
        </View>
    )
}
const styles = StyleSheet.create({
    InputFieldContainer: {
        alignItems:'center',
        marginTop:'4%'
    },
    errorTextStyle:{
        textAlign:'center',
        fontSize:15,
        color:'red'
    }
})


const mapDispatchToProps = dispatch => {
    return bindActionCreators({fetchPostComments,removePost,addComment,addPost}, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddPost);

