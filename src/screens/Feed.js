import React,{Component} from 'react'
import {
    View, 
    StyleSheet,
    FlatList,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Feather'
// import { Icon } from 'react-native-elements'
import Header from '../componentes/Header'
import Post from '../componentes/Post'
import ImageSlider from '../componentes/ImageSlider'
import LinearGradient from 'react-native-linear-gradient'
import RadialGradient from 'react-native-radial-gradient'
import { 
    fetchPosts, 
    getPostsFeed, 
    listen,
    stopListen
} from '../store/actions/posts'
import RNEventSource from 'react-native-event-source'

const images = [
    "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
];

let eventSource

class Feed extends Component {    

    componentDidMount = () => {        
        // const a = new Date().getTime()
        // const b = Date.parse(new Date())
        // console.log(a)
        // console.log(moment(a).format('MMMM Do YYYY, h:mm:ss a'))
        // console.log(moment(a).format())
        // this.props.onFetchPosts()
        this.props.onGetPostsFeed()
        // console.log('========================================================')
        // console.log(this.props.posts.highlights)

        eventSource = listen()

        // this.eventSource = new RNEventSource('https://helpfy-18cd6.firebaseio.com/posts.json')
        // this.oldData = {}
        // this.count = 0        
        // this.eventSource.addEventListener('put',(event) => {
        //     if(this.oldData != event.data){
        //         this.count += 1
        //         console.log(this.count)
        //         console.log(event, 'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
        //         console.log(JSON.parse(event.data))
        //         this.oldData = event.data                
        //     }
        // })
        // console.log('cheguei aqui')
        // console.log(this.props.navigation.actions.navigate)
    }

    testeFuntion = () => {
        this.props.onTeste()
    }

    componentWillUnmount = () => {
        stopListen(eventSource)
        // this.eventSource.removeAllListeners()
        // this.eventSource.close()
    }

    render(){

        const widthScreen = Dimensions.get('window').width / 2
        const heightScreen = Dimensions.get('window').height / 2

        return(                        
            // <RadialGradient style={{width:400,height:400}}                 
            //     // colors={['rgba(219, 138, 169, 0.51)', 
            //     //     'rgba(219, 129, 163, 0.65)',
            //     //     'rgba(211, 116, 152, 0.78)',
            //     //     'rgba(204, 87, 132, 0.78)',
            //     //     'rgba(170, 83, 186, 0.78)',
            //     //     'rgba(156, 47, 175, 0.58)',
            //     //     'rgba(50, 13, 119, 0.60)']}
            //     colors={['rgba(219, 138, 169, 0.41)', 
            //         'rgba(219, 129, 163, 0.55)',
            //         'rgba(211, 116, 152, 0.68)',
            //         'rgba(204, 87, 132, 0.68)',
            //         'rgba(170, 83, 186, 0.68)',
            //         'rgba(156, 47, 175, 0.48)',
            //         'rgba(50, 13, 119, 0.50)']}
            //     stops={[0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7]} 
            //     center={[widthScreen,heightScreen]} 
            //     radius={350}
            //     style={styles.container} >            
            <LinearGradient colors={[
                'rgb(146, 135, 211)',
                'rgb(124, 147, 225)',
                'rgba(124, 147, 225, 0.8)',
                'rgb(155, 156, 213)',
                'rgb(162, 163, 217)',            
                'rgba(162, 163, 217, 0.85)',
                'rgb(162, 163, 217)',
                'rgb(162, 163, 217)',
                'rgba(124, 147, 225, 0.8)',
                'rgb(124, 147, 225)',
                'rgb(146, 135, 211)',
                ]}
                style={styles.container} >                
                <Header navigation={this.props.navigation}/>
                <View style={styles.containerPosts}>
                    <ScrollView>
                        <ImageSlider images={images}/> 
                        <Text style={styles.title}>Destaques</Text>
                        <FlatList horizontal 
                            data={this.props.posts.highlights}
                            keyExtractor={item => `${item.id}`}
                            style={styles.containerFlatPosts}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>                         
                            <Post key={item.id} {...item} 
                                navigation={this.props.navigation}                                
                                tamanho={{
                                    width: Dimensions.get('window').width / (5/2),
                                    height: Dimensions.get('window').width / (5/2),
                                    resizeMode: "cover",
                                    margin: 10,
                                    borderRadius: 15
                                }}/>}/>    
                        <Text style={styles.title}>Recentes</Text>
                        <FlatList horizontal                    
                            data={this.props.posts.recent}
                            keyExtractor={item => `${item.id}`}
                            style={styles.containerFlatPosts}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>                         
                            <Post key={item.id} {...item}
                                navigation={this.props.navigation}                                
                                tamanho={{
                                    width: Dimensions.get('window').width / (5/2),
                                    height: Dimensions.get('window').width / (5/2),
                                    resizeMode: "cover",
                                    margin: 10,
                                    borderRadius: 15
                                }}/>}/>
                        <Text style={styles.title}>Comentados</Text>
                        <FlatList horizontal                    
                            data={this.props.posts.commented}
                            keyExtractor={item => `${item.id}`}
                            style={styles.containerFlatPosts}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) =>                         
                            <Post key={item.id} {...item}
                                navigation={this.props.navigation}                                
                                tamanho={{
                                    width: Dimensions.get('window').width / (5/2),
                                    height: Dimensions.get('window').width / (5/2),
                                    resizeMode: "cover",
                                    margin: 10,
                                    borderRadius: 15
                                }}/>}/>                    
                    </ScrollView>
                </View>
                <LinearGradient colors={[
                    'rgba(225, 22, 94, 0.6)',
                    'rgba(225, 22, 94, 0.4)',
                    'rgba(225, 22, 94, 0.6)',
                    'rgba(225, 22, 94, 0.9)'
                    ]}
                    style={styles.iconViewContainer}>
                    <TouchableOpacity style={styles.buttonAddPost}
                        onPress={() => this.props.navigation.navigate('AddPost')}>
                        <Icon name='plus' size={32} color='rgba(255, 255, 255, 0.85)'/>
                    </TouchableOpacity>
                </LinearGradient> 
                <View style={styles.tabBottomBackground}>
                </View>
            </LinearGradient>
            // </RadialGradient>                
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
        // backgroundColor: '#f5fcff'        

    },
    // imageSlider: {
    //     flex: 1
    // },
    containerFlatPosts: {
        backgroundColor: 'transparent',
        width: '100%',
        height: Dimensions.get('window').width / (5/2.25)
    },
    containerPosts: {
        flex: 2
    },
    title: {
        marginTop: 20,
        marginLeft: 10,
        fontSize: 30,
        fontFamily: 'shelter',
        color: 'rgba(225, 22, 94, 0.7)',
        textShadowColor: '#fff', 
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10, 
        
    },
    // icon: {
        
    // },
    // iconContainer: {
    //     backgroundColor: 'rgba(225, 22, 94, 1)',
    //     justifyContent: 'center',
    //     position: 'absolute',
    //     bottom: 65,
    //     right: 25,  

    // },
    iconViewContainer:{
        position: 'absolute',
        bottom: 65,
        right: 25,
        backgroundColor: 'rgba(162, 163, 217, 0.85)',
        borderRadius: 25,
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: 50,
        // height: 50

    },
    buttonAddPost: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBottomBackground: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent'
    }
})

// export default Feed

const mapStateToProps = ({ posts }) => {
    return {
        posts: posts.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onFetchPosts: () => dispatch(fetchPosts()),
        onGetPostsFeed: () => dispatch(getPostsFeed()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)