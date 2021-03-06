import React from 'react'
import { Dimensions, SafeAreaView } from 'react-native'
import { 
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    createSwitchNavigator,
    createMaterialTopTabNavigator,
    TabNavigator,
    createAppContainer,
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Feather'
import Feed from './screens/Feed'
import Profile from './screens/Profile'
import SideBar from './componentes/SideBar'
import Search from './screens/Search'
import ScreenPost from './screens/ScreenPost'
import Login from './screens/Login'
import Register from './screens/Register'
import WishList from './screens/WishList'
import NotificationScreen from './screens/NotificationScreen'
import LikedScreen from './screens/LikedScreen'
import TesteScreen from './screens/TesteScreen'
import AddPost from './screens/AddPost'
import Category from './screens/Category'
import ChatList from './screens/ChatList'
import ChatMessage from './screens/ChatMessage'
import LeaderBoard from './screens/LeaderBoard'
import Teste from './screens/Teste'

const navOptionHandler = (navigation) =>({
    header: null
})

const authRouter = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: navOptionHandler
    },
    Register: {
        screen: Register,  
        navigationOptions: navOptionHandler
    }
}, {
    initialRouteName: 'Login',    
})

const loginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: authRouter,
    ChatMessage: {
        screen: ChatMessage,
        navigationOptions: navOptionHandler
    },
}, {
    // rota inicial
    initialRouteName: 'Auth'
})


// const goRegister = createStackNavigator({
//     Login: {
//         screen: Login,
//         navigationOptions: navOptionHandler
//     },
//     Register: {
//         screen: Register,  
//         navigationOptions: navOptionHandler
//     }
// }, {
//     initialRouteName: 'Login',    
// })

const feedStack = createStackNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: navOptionHandler
    },
    Search: {
        screen: Search,  
        navigationOptions: navOptionHandler
    },
    Notification: {
        screen: NotificationScreen,  
        navigationOptions: navOptionHandler
    },
    ScreenPost: {
        screen: ScreenPost,
        navigationOptions: navOptionHandler
    },
    LikedScreen: {
        screen: LikedScreen,
        navigationOptions: navOptionHandler
    },
    Category: {
        screen: Category,
        navigationOptions: navOptionHandler
    },
    AddPost: {
        screen: AddPost,
        navigationOptions: navOptionHandler
    },
}, {
    // rota inicial
    initialRouteName: 'Feed',    
})

const chatStack = createStackNavigator({
    ChatMessage: {
        screen: ChatMessage,
        navigationOptions: navOptionHandler
    },
    ChatList: {
        screen: ChatList,  
        navigationOptions: navOptionHandler
    },
}, {
    // rota inicial
    initialRouteName: 'ChatList',
    // initialRouteName: 'ChatMessage',
})

// Quando esta na tela Search retira o tabBottomBar
feedStack.navigationOptions = ({ navigation }) => {
    const { state: { routes, index } } = navigation
    let tabBarVisible = true
    if(routes[index].routeName === 'Search'){
      tabBarVisible = false
    }
    else if(routes[index].routeName === 'Notification'){
        tabBarVisible = false
    }
    return {
      tabBarVisible
    }
}

const MenuRoutes = {
    Feed: {
        name: 'Feed',
        screen: feedStack,
        navigationOptions: {
            title: 'Feed',
            tabBarIcon: ({ tintColor }) =>                
                <Icon name='home' size={30} color={tintColor}/>,
        }
    },
    Profile: {
        name: 'Profile',              
        screen: loginOrProfileRouter,
        navigationOptions: {
            title: 'Profile',
            tabBarIcon: ({ tintColor: color }) =>
                <Icon name='user' size={30} color={color} />
        }
    },
    Message: {
        name: 'Message',
        screen: chatStack,
        navigationOptions: {
            title: 'Message',
            tabBarIcon: ({ tintColor: color }) =>
                <Icon name='mail' size={30} color={ color } />

        }
    },    
}

const MenuConfig = {
    initialRouteName: 'Feed',
    tabBarOptions: {
        showLabel: false,
        activeTintColor: 'rgba(225, 22, 94, 0.5)',
        inactiveTintColor: 'rgb(84, 76, 126)',
        style: {            
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,                        
        }        
    },    
}


const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)

const Drawer = createDrawerNavigator({
    Home: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Home',
            drawerIcon:({ tintColor }) =>
                <Icon name='home' size={23} color={ tintColor } />
        }
    },

    WishList: {
        screen: WishList,
        navigationOptions: {
            title: 'Lista de desejos',
            drawerIcon:({ tintColor }) =>
                <Icon name='list' size={23} color={ tintColor } />
        }
    },
    Likes: {
        screen: LikedScreen,
        navigationOptions: {
            title: 'Itens curtidos',
            drawerIcon:({ tintColor }) =>
                <Icon name='heart' size={23} color={ tintColor } />
        }
    },
    Board: {
        screen: LeaderBoard,
        navigationOptions: {
            title: 'Classificação',
            drawerIcon:({ tintColor }) =>
                <Icon name='heart' size={23} color={ tintColor } />
        }
    },
    SignOut: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Sign Out',
            drawerIcon:({ tintColor }) =>
                <Icon name='log-out' size={23} color={ tintColor } />
        }
    }

}, {
    contentComponent: props => <SideBar {...props}/>,
    drawerWidth: Dimensions.get('window').width * 3/4,
    hidenStatusbar: true,
    
    contentOptions: {    
        activeBackgroundColor: 'rgba(225, 22, 94, 0.2)',        
        activeTintColor: 'rgba(225, 22, 94, 0.5)',
        inactiveTintColor: 'rgb(84, 76, 126)',
        itemsContainerStyle: {
            marginTop: 8,
        },

        itemStyle: {            
            borderRadius: 4,
            marginLeft: 5
        },
    },
    
    style: {
        backgroundColor: 'rgba(162, 163, 217, 0.85)'
    }
})

//export default createAppContainer(App);
export default Drawer

