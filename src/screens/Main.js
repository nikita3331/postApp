import React,{useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity ,Text,FlatList} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchAllStories,setCurrentPostId,fetchPostComments} from '../actions/user'
import MyButton from '../components/myButton'

function RenderRow({item,index,handleGoToPost}){
    
    return(
        <TouchableOpacity key={index} style={styles.rowStyle} onPress={()=>{handleGoToPost(item)}}>
            <View style={styles.titleContainer}>
                <Text>{item.userProfile.name}</Text>
                <Text>{item.id}</Text>
            </View>
            <Text style={styles.rowDescription}>{item.title}</Text>
        </TouchableOpacity>
    )
}
const Main=(props)=>{
    useEffect(() => {props.fetchAllStories()}, []);
    const handleGoToPost= async (item)=>{
        props.setCurrentPostId(item.id)
        await props.fetchPostComments()
        props.navigation.navigate('ShowPost')
    }

    return(
        <View style={{flex:1}}>
            <MyButton title='Add post' buttonPressed={()=>{props.navigation.navigate('AddPost')}} bgColor='green'/>
            <FlatList
            data={props.user.posts}
            contentContainerStyle={{justifyContent:'center'}}
            showsVerticalScrollIndicator={false}
            renderItem={(obj) => { return <RenderRow {...{item:obj.item, index:obj.index,parentProps:props,handleGoToPost:handleGoToPost}} /> }}
            keyExtractor={item => item.id.toString() }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    rowStyle: {
        width: "90%",
        padding:10,
        elevation:20,
        backgroundColor:'gray',
        alignSelf:'center',
        borderRadius:20,
        marginTop:10
    },
    rowDescription:{
        fontSize:20,
        color:'blue'
    },
    titleContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})


const mapDispatchToProps = dispatch => {
    return bindActionCreators({fetchAllStories,setCurrentPostId,fetchPostComments}, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);

