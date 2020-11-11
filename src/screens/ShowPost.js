import React,{useState} from 'react'
import { View, StyleSheet,Text,ScrollView} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchPostComments,removePost,addComment} from '../actions/user'
import Header from '../components/header'
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import MyButton from '../components/myButton'
import MyInput from '../components/myTextInput'

const ShowModal=({visible,setModalVis,commentText,setCommentText,addComment})=>{
    return(
        <Modal isVisible={visible} onBackdropPress={()=>{setModalVis(false)}} onBackButtonPress={()=>{setModalVis(false)}} useNativeDriver={true}>
            <View style={{ alignSelf: 'center', backgroundColor: 'white', width: '90%', borderRadius: 20, alignItems: 'center',padding:20 }}>
                <Text style={{fontSize:20}}>ADD COMMENT</Text>                
                <MyInput placeholder='Write comment up to 200 characters' inputChange={setCommentText} value={commentText}/>
                <MyButton title='COMMENT' buttonPressed={addComment} bgColor='pink'/>
            </View>
        </Modal>
    )
}
const ShowComment=({item})=>{
    return(
        <View  style={styles.commentContainer}>
            <Text style={styles.commentTextStyle}>{item.body}</Text>
        </View>
    )
}
const ShowPost=(props)=>{
    // useEffect(() => {props.fetchPostComments();console.log('fetching comments')}, [])
    const [addCommentModalVis,setModalVis]=useState(false)
    const [commentText,setCommentText]=useState('')

    const handleRemovePost=()=>{
        props.removePost()
        props.navigation.goBack()
    }
    const handleAddComment=()=>{
        props.addComment(commentText)
        setModalVis(false)
        setCommentText('')

    }
    const {currentPostId,posts}=props.user
    let postIndex=posts.findIndex(item => item.id === currentPostId);
    
    const chosenPost=posts[postIndex]
    return(
        chosenPost?
            <View style={{flex:1}}>
                <Header title={chosenPost.title} goBack={()=>{props.navigation.goBack()}}/>
                <ShowModal visible={addCommentModalVis} setModalVis={setModalVis} commentText={commentText} setCommentText={setCommentText} addComment={handleAddComment} />
                <ScrollView contentContainerStyle={styles.scrollStyle} showsVerticalScrollIndicator={false}>
                    <Text style={styles.nameStyle}>{chosenPost.userProfile.name}</Text>
                    <Text style={styles.bodyStyle}>{chosenPost.body}</Text>
                    <Icon name='trash' type='entypo' size={30} color='red' style={{paddingVertical:10}} onPress={()=>{handleRemovePost()}}/>
                    <View style={styles.dividerStyle}>
                        <Text style={{color:'white',fontSize:20}}>COMMENTS</Text>
                    </View>
                    <MyButton title='ADD COMMENT' buttonPressed={()=>{setModalVis(true)}} bgColor='pink'/>
                    {chosenPost.comments?chosenPost.comments.map((item,index)=>{return(<ShowComment {...{item:item,index:index}} key={index} />)}):null}
                </ScrollView>
            </View>
        :null
    )
}
const styles = StyleSheet.create({
    scrollStyle: {
        alignItems:'center',
        paddingBottom:'2%'
    },
    bodyStyle:{
        textAlign:'center',
        marginTop:'2%',
        paddingHorizontal:'5%',
        fontSize:17
    },
    nameStyle:{
        textAlign:'center',
        marginTop:'5%',
        paddingHorizontal:'5%',
        fontSize:20,
        fontWeight:'bold'
    },
    dividerStyle:{
        alignItems:'center',
        borderBottomWidth:1,
        backgroundColor:'gray',
        width:'100%'
    },
    commentContainer:{
        width:'90%',
        backgroundColor:'#009A84',
        marginTop:'2%',
        borderRadius:10,
        padding:10
    },
    commentTextStyle:{
        color:'white',
        fontSize:15
    }
})


const mapDispatchToProps = dispatch => {
    return bindActionCreators({fetchPostComments,removePost,addComment}, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShowPost);

