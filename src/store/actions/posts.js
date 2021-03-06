import {
    ADD_POST,
    SET_POSTS,
    CREATING_POST,
    POST_CREATED,
    ADD_COMMENT,
    SET_MYPOSTS,
    SET_POSTSFILTER,
    DEL_POSTSFILTER,
    SET_POSTSFEED,
    SET_LIKE,
    SET_I_WANT_LIST,
    SET_POST_DONATED
} from './actionTypes'
import axios from 'axios'
import { setMessage } from './message'
import RNEventSource from 'react-native-event-source'

// export const addPost = post => {
//     return {
//         type: ADD_POST,
//         payload: post
//     }
// }

export const addPost = post => {
    return dispatch => {
        // console.log(post.image)
        dispatch(creatingPost())
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-helpfy-18cd6.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image ? post.image.base64 : post.image
            }
        })
            .catch(err => console.log(err))
            .then(resp => {
                // substituindo a imagem pela sua URL gerada
                // quando feito o upload
                post.image = resp.data.imageUrl                
                axios.post('/posts.json', { ...post })
                    .catch(err => console.log(err))
                    .then(res => {
                        dispatch(getPostsFeed())
                        dispatch(postCreated())
                        dispatch(addScore(post.userId))
                        // console.log(res.data.name)
                        // axios.patch(`/posts/${res.data.name}.json`, {
                        //     id: res.data.name
                        // })
                        //     .catch(err => console.log(err))
                        //     .then(resp => {                                

                        //     })

                    })
            })
    }
}

export const addComment = payload => {
    return (dispatch, getState) => {
        axios.get(`posts/${payload.postId}.json`)
            .catch(err => console.log(err))
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`posts/${payload.postId}.json`, { comments })
                    .catch(err => console.log(err))
                    .then(res => {
                        // dispatch(fetchPosts())
                        dispatch(getPostsFeed())
                    })
            })
    }
    //return {
    //    type: ADD_COMMENT,
    //    payload
    //}
}


export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const setPostsFeed = posts => {
    return {
        type: SET_POSTSFEED,
        payload: posts
    }
}

export const setPostsFilter = postsFilter => {
    return {
        type: SET_POSTSFILTER,
        payload: postsFilter
    }
}

export const setMyPosts = myPosts => {
    return {
        type: SET_MYPOSTS,
        payload: myPosts
    }
}

export const clearPostsFilter = () => {
    return {
        type: DEL_POSTSFILTER,
    }
}

// Obter os Posts
// Axios vai pegar no Firbase
export const fetchPosts = (category = null) => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => console.log(err))
            // a partir da resposta recebe a lista de postagen
            // do firebase, um objeto, chave: hash, valor: o objeto
            // que representa a postagem
            .then(res => {
                const rawPosts = res.data
                let posts = []

                // key = hash
                if (category === null) {
                    for (let key in rawPosts) {
                        posts.push({
                            // todos os atributos de rawPosts do 
                            // identificador key
                            ...rawPosts[key],
                            id: key
                        })
                    }
                } else {
                    posts = Object.keys(rawPosts) //retorna as chaves do objeto rawPosts
                        .filter(postKey => rawPosts[postKey].category === category) //retorna um array com chaves do rawPosts onde categoria é igual category
                        .map(key => rawPosts[key]) //retorna o objeto da chave encontrada no filter                    
                }

                // reverse inverte a postagem, fazendo com que a
                // ultima postagem seja a primeira quando mostrada
                // na tela feed
                dispatch(setPosts(posts.reverse()))
            })
    }
}

export const getPostsFilter = (category) => {
    return dispatch => {
        console.log(category)
        axios.get(`/posts.json?orderBy="category"&equalTo="${category}"`)
            .catch(err => console.log(err))
            .then(res => {
                // console.log(res)
                const rawPosts = res.data
                let posts = []
                for (let key in rawPosts) {
                    posts.push({
                        // todos os atributos de rawPosts do 
                        // identificador key
                        ...rawPosts[key],
                        id: key
                    })
                }
                // console.log(posts)
                dispatch(setPostsFilter(posts))
            })
    }
}

// export const getPostsFeed = () => {
//     return dispatch => {        
//         let posts = {
//                 highlights: [],
//                 recent: [],
//                 commented: [],
//             }        
//         axios.get(`/posts.json?`)
//             .catch(err => console.log(err))
//             .then(res => {                
//                 const rawPosts = res.data                
//                 for (let key in rawPosts){
//                     posts.highlights.push({
//                         ...rawPosts[key],
//                         id: key
//                     })
//                 }
//                 posts.highlights = posts.highlights.reverse()
//                 axios.get(`/posts.json?orderBy="timePost"&limitToLast=2`)
//                     .catch(err => console.log(err))
//                     .then(res => {
//                         console.log(res)
//                         const rawPosts = res.data                
//                         for (let key in rawPosts){
//                             posts.recent.push({
//                                 ...rawPosts[key],
//                                 id: key
//                             })
//                         }
//                         posts.recent = posts.recent.reverse()                
//                         dispatch(setPostsFeed(posts))
//                     })
//             })
//         }            
// }

export const getPostsFeed = () => {
    return async dispatch => {
        let posts = {
            highlights: [],
            recent: [],
            commented: [],
        }
        try {
            let res = await axios.get(`/posts.json?`)
            let rawPosts = res.data
            // console.log(rawPosts)
            for (let key in rawPosts) {
                posts.highlights.push({
                    ...rawPosts[key],
                    id: key,                                                             
                })                
                // console.log('1 ' ,posts.highlights)                
                // for(let x in posts.highlights){
                //     let a = posts.highlights[x]                    
                //     // let b = Object.values(a)
                //     // console.log('aqui eh a = ', a)
                //     for(let property in a){
                //         // if(`${property}` == like){
                //         //     console.log(`${property}: ${a[property]}`)
                //         // }
                //         // if(`${property}` === 'like'){
                //         //     console.log(`${property}: ${a[property]}`)
                //         // }                        
                //     }
                // }
            }
            posts.highlights = posts.highlights.reverse()
            // console.log("asdas", posts.highlights)
            res = await axios.get(`/posts.json?orderBy="timePost"&limitToLast=2`)
            rawPosts = res.data
            for (let key in rawPosts) {
                posts.recent.push({
                    ...rawPosts[key],
                    id: key
                })
            }
            posts.recent = posts.recent.reverse()
            dispatch(setPostsFeed(posts))
        } catch(e) {
            console.log(e)
        }
    }
}

export const getMyPosts = (localId) => {
    return dispatch => {
        console.log(localId)
        axios.get(`/posts.json?orderBy="id"&equalTo="${localId}"`)
            .catch(err => console.log(err))
            .then(res => {
                // console.log(res)
                const rawPosts = res.data
                let posts = []
                for (let key in rawPosts) {
                    posts.push({
                        // todos os atributos de rawPosts do 
                        // identificador key
                        ...rawPosts[key],
                        id: key
                    })
                }
                // console.log(posts)
                dispatch(setMyPosts(posts.reverse()))
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}

export const like = (userId, postId)  => {
    return async dispatch => {
        // console.log(userId, postId)
        try {
            res = await axios.patch(`/posts/${postId}/listLike/${userId}.json`, {
                like: true 
            })
            
        } catch (e) {
            console.log(e)            
        }
    }
}

export const dislike = (userId, postId)  => {
    return async dispatch => {
        console.log(userId, postId)
        try {
            let res = await axios.delete(`/posts/${postId}/listLike/${userId}.json`)
        } catch (e) {
            console.log(e)
        }
    }
}

export const verifyLike = async (userId, postId)  => {
    console.log(userId, postId)
    try {
        let res = await axios.get(`/posts/${postId}/listLike/${userId}.json`)               
        if (res.data === null){            
            return res.data
        } else {
            let [teste] = Object.values(res.data)
            return teste
        }        

    } catch (e) {
        console.log(e)
        return false
    }
}

export const iWant = (userId, postId, name)  => {
    return async dispatch => {
        // console.log(userId, postId)
        try {
            res = await axios.patch(`/posts/${postId}/listiWant/${userId}.json`, {
                iWant: true,
                name
            })
            
        } catch (e) {
            console.log(e)            
        }
    }
}

export const iDontWant = (userId, postId)  => {
    return async dispatch => {
        console.log(userId, postId)
        try {
            let res = await axios.delete(`/posts/${postId}/listiWant/${userId}.json`)
        } catch (e) {
            console.log(e)
        }
    }
}

export const verifyiWant = async (userId, postId)  => {
    console.log(userId, postId)
    try {
        let res = await axios.get(`/posts/${postId}/listiWant/${userId}.json`)               
        if (res.data === null){            
            return res.data
        } else {
            let [teste] = Object.values(res.data)
            return teste
        }        

    } catch (e) {
        console.log(e)
        return false
    }
}

export const iWantList = postId => {
    return dispatch => {
        axios.get(`posts/${postId}/.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado!'
                }))
            })
            .then(res => {
                console.log('-------------------------------------------')
                console.log('list i want', postId)
                const rawListiWant = res.data.listiWant
                const listiWant = []
                for (let key in rawListiWant) {
                    listiWant.push({
                        ...rawListiWant[key],
                        id: key
                    })
                }
                console.log('LISTA DE QUEM QUER', listiWant)
                dispatch(setiWantList(listiWant))
            })
    }
}

export const setiWantList = listiWant => {
    return {
        type: SET_I_WANT_LIST,
        payload: listiWant
    }
}

export const makeRemoteRequest = async (state, setState) => {
    try {        
        setState({...state, loading: true})        
        let res = await axios.get(`/posts.json`)
        let rawPosts = res.data
        let posts = []
        for (let key in rawPosts) {
            posts.push({
                ...rawPosts[key],                                                                             
            }) 
        }        
        state.data = posts,
        state.loading = false,
        state.arrayholder = posts
        setState(state)        
    } catch (e) {
        state.error = e,
        state.loading = false
        setState(state)        
        console.log(e)
    }    
}

export const listen = () => {
    let eventSource = new RNEventSource('https://helpfy-18cd6.firebaseio.com/posts.json')
    let oldData = {}
    let count = 0        
    eventSource.addEventListener('put',(event) => {
        if(oldData != event.data){
            count += 1
            // console.log(count)            
            // console.log(JSON.parse(event.data))
            oldData = event.data
        }
    })
    // console.log('cheguei aqui')
    return eventSource
}

export const stopListen = (eventSource) => {
    eventSource.removeAllListeners()
    eventSource.close()
    console.log('Fechando Conexao')
}

export const patchPostDonated = (idPost, username) => {
    return dispatch => {
        axios.get(`posts/${idPost}/.json`)
        .catch(err => {
            dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado!'
            }))
        })
        .then(res => {
            const postDonated = username
            axios.patch(`posts/${idPost}/.json`, { postDonated })
        })
    }
}

export const addScore = (userId) => {
    return async dispatch => {
        try 
        {
            let res = await axios.get(`/users/${userId}/highScore.json?`)
            let score = res.data + 1            
            res = await axios.patch(`/users/${userId}/.json?`, { 
                highScore: score 
            })
        } catch(e) {
            console.log(e)
        }
    }
}