const main_url='https://jsonplaceholder.typicode.com'
export const setPosts = (posts) => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}
export const setCurrentPostId = (id) => {
    return {
        type: SET_CURRENT_POST,
        payload: id
    }
}

export const setPostComments = (id) => {

    return {
        type: SET_CURRENT_POST,
        payload: id
    }
}
export const setFetchedCommentsIds = (idsArr) => {

    return {
        type: SET_COMMENTS_ARR,
        payload: idsArr
    }
}

export const fetchAllStories = () => {
    return async (dispatch, getState) => {
        try {
            let url = `${main_url}/posts`
            let responsePosts = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            let posts = await responsePosts.json();
            url = `${main_url}/users`
            let responseUsers = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            let users = await responseUsers.json();
            let connectedPosts=posts.map((post)=>{return {...post,userProfile:users.filter(profile=> {return profile.id==post.userId})[0] }})
            connectedPosts.sort((a,b)=>{return b.id-a.id})
            dispatch(setPosts(connectedPosts))
        }
        catch (error) {
            console.error(error);
            dispatch(setPosts([]))
        }
    }
}

export const fetchPostComments = () => {
    return async (dispatch, getState) => {
        let { currentPostId ,posts,fetchedCommentsArr} = getState().user
        try {
            if (!fetchedCommentsArr.includes(currentPostId)){
                let url = `${main_url}/comments?postId=${currentPostId}`
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                let comments = await response.json();
                let postCopy=[]
                for(let i=0;i<posts.length;i++){
                    postCopy.push(posts[i])
                }
                let postIndex=postCopy.findIndex(item => item.id === currentPostId);

                postCopy[postIndex]={...postCopy[postIndex],comments:comments}
                dispatch(setPosts(postCopy))
                let copyCommentsArr=fetchedCommentsArr
                copyCommentsArr.push(currentPostId)

                dispatch(setFetchedCommentsIds(copyCommentsArr))
            }
            else{
                console.log('already fetched this post')
            }
        }
        catch (error) {
            console.error(error);
            let postCopy=[]
            for(let i=0;i<posts.length;i++){
                postCopy.push(posts[i])
            }
            postCopy[currentPostId]={...postCopy[currentPostId],comments:[]}
            dispatch(setPosts(postCopy))
        }
    }
}
export const removePost = () => {
    return async (dispatch, getState) => {
        let { currentPostId,posts } = getState().user

            let postIndex=posts.findIndex(item => item.id === currentPostId);
            let postCopy=[]
            for(let i=0;i<posts.length;i++){
                postCopy.push(posts[i])
            }
            postCopy.splice(postIndex,1)
            dispatch(setPosts(postCopy))
    }
}
export const addComment = (commentText) => {
    return async (dispatch, getState) => {
        let { currentPostId,posts } = getState().user
            let postIndex=posts.findIndex(item => item.id === currentPostId);
            let postCopy=[]
            for(let i=0;i<posts.length;i++){
                postCopy.push(posts[i])
            }
            postCopy[postIndex].comments.unshift({body:commentText,email:'empty',id:postCopy[postIndex].comments.length+1,name:'my name',postId:currentPostId})
            dispatch(setPosts(postCopy))
    }
}
export const addPost = (body,title,name) => {
    return async (dispatch, getState) => {
        let { currentPostId,posts,fetchedCommentsArr } = getState().user
            let postCopy=[]
            for(let i=0;i<posts.length;i++){
                postCopy.push(posts[i])
            }
            let newId=posts.length+1
            postCopy.unshift({body:body,id:newId,title:title,userId:11,userProfile:{name:name},comments:[]})
            let copyCommentsArr=fetchedCommentsArr
            copyCommentsArr.push(newId)
            dispatch(setPosts(postCopy))
            dispatch(setFetchedCommentsIds(copyCommentsArr))
    }
}





export const SET_POSTS = 'SET_POSTS'
export const SET_CURRENT_POST = 'SET_CURRENT_POST'
export const SET_COMMENTS_ARR = 'SET_COMMENTS_ARR'





















