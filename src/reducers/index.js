import { combineReducers } from 'redux'
import { SET_POSTS,SET_CURRENT_POST,SET_COMMENTS_ARR} from '../actions/user'

const user = (state = {posts:[],currentPostId:1,fetchedCommentsArr:[]}, action) => {
    switch (action.type) {
        case SET_POSTS:
            return { ...state, posts: action.payload }
        case SET_CURRENT_POST:
            return { ...state, currentPostId: action.payload }  
        case SET_COMMENTS_ARR:
            return { ...state, fetchedCommentsArr: action.payload }  
                
                               
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user
})

export default rootReducer
