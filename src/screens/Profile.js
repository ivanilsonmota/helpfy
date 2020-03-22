import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ImageBackground,
	Image,
	Dimensions,	
	TouchableOpacity
} from 'react-native'
import { Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import { logout } from '../store/actions/user'
import Icon from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'
import ProfileInfo from '../componentes/ProfileInfo'
import RenderCommentList from '../componentes/RenderCommentList'
import RenderPostList from '../componentes/RenderPostList'
import Post from './../componentes/Post'
import ProfileComment from '../componentes/ProfileComment'

class Profile extends Component {
	constructor(props){
		super(props)
		this.state = {
			id: Math.random(),
			dataNasc: '25/09/1998',
			uf: 'São Paulo',
			showCommentList: false,
			showPostList: false
		}
	}

	onNavigate = () => {
		this.setState({showPostList: false})
	}

	logout = () => {
        this.props.onLogout()
        this.props.navigation.navigate('Auth')
	}		

	render() {
		const comments = [{
			nickname: 'Ulisses',
			comment: 'Esse cara me roubou!!!daasdasdaksjdkasdjhkajkshdjkahsjkdhasjdjskldjaklsjdkljaskljdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
		}, {
			nickname: 'Muriloooooooooooooooooooooooooooooooooooooooooooo',
            comment: 'Esse cara me roubou!!!daasdasdaksjdkasdjhkajkshdjkahsjkdhasjdjskldjaklsjdkljaskljdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        }, {
			nickname: 'Murilo',
            comment: 'Comendo o cu de curioso'
        }, {
			nickname: 'Murilo',
            comment: 'Comendo o cu de curioso'
        }, {
			nickname: 'Murilo',
            comment: 'Comendo o cu de curioso'
        }, {
			nickname: 'Murilo',
            comment: 'Comendo o cu de curioso'
        }, {
			nickname: 'Murilo',
            comment: 'Comendo o cu de curioso'
        }, {
			nickname: 'Murilo',
            comment: 'Comendo o cu de curioso'
        }, {
			nickname: 'Murilo',
            comment: 'Comendo o cu de curioso'
        }, {
			nickname: 'Murilo',
            comment: 'Comendo o cu de curioso'
        }, {
			nickname: 'Murilo',
            comment: 'Comendo o cu de curioso'
            
        }]
		
		return(
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
				<ScrollView>
					<View style={styles.backgroundContainer}>												
						<RenderPostList onNavigate={(this.onNavigate)} navigation={this.props.navigation}
							isVisible={this.state.showPostList} 
							onCancel={() => this.setState({ showPostList: false })}/>	
						<ImageBackground
							source={require("../../assets/imgs/fence.jpg")}
							imageStyle={{ opacity: 0.75, backgroundColor: 'rgba(107, 13, 200, 0.75)' }}
							style={styles.imageBackground}>
							<View style={styles.profileFraseContainer}>
								<View style={styles.profileContainer}>
									<View style={styles.donationContainer}>
										<Text style={styles.donation}>200</Text>
										<Image 
											source={require("../../assets/imgs/mao.png")}
											style={styles.donationImage}/>
									</View>
									<View style={styles.profile}>
										<Image 
											source={require("../../assets/imgs/icon.png")}
											style={styles.imageProfile}/>
										<Text style={styles.name} 
											numberOfLines={2}>{this.props.name}</Text>									
									</View>
									<View style={styles.rankingContainer}>
										<Text style={styles.ranking}>15#</Text>
										<Image 
											source={require("../../assets/imgs/trofeu.png")}
											style={styles.rankingImage}/>
									</View>
								</View>
								<View style={styles.fraseContainer}>
									<Text style={styles.frase}
										numberOfLines={3}>
										Frase do Dia
										Frase do Dia
										Frase do Dia
										Frase do Dia
										Frase do Dia
										Frase do Dia
										Frase do Dia\Frase do Dia
										Frase do Dia
										Frase do Dia
										Frase do Dia
										Frase do Dia
										Frase do Dia
										Frase do Dia
									</Text>
								</View>
							</View>
						</ImageBackground>
					</View>					                     
					<View style={styles.bodyIcons}>
						<TouchableOpacity style={styles.buttonContainer}
							onPress={() => this.setState({ showCommentList: true })}>
							<Icon name='edit' size={30} color={'blue'}/>
							<Overlay
								isVisible={this.state.showCommentList}
								onBackdropPress={() => this.setState({ showCommentList: false })}
								overlayStyle={{ padding: 0}}>
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
									]} style={styles.container}>                
									<ScrollView>
										<View style={styles.overlayHeaderContainer}>
											<Text style={styles.overlayHeaderText}>Comentários sobre o autor</Text>
										</View>									
											<ProfileComment comments={comments} />										
									</ScrollView>
								</LinearGradient>
							</Overlay>	
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonContainer}
							onPress={() => this.setState({ showPostList: true })}>
							<Icon name='message-circle' size={30} color={'blue'}/>	 
						</TouchableOpacity>
					</View>
					<View style={styles.conteudo}>
						<ProfileInfo title={'Nome'} item={this.props.name}/>
						<ProfileInfo title={'E-mail'} item={this.props.email}/>
						<ProfileInfo title={'Data de Nascimento'} item={this.state.dataNasc}/>
						<ProfileInfo title={'Data de Nascimento'} item={this.state.dataNasc}/>
						<ProfileInfo title={'Data de Nascimento'} item={this.state.dataNasc}/>
					</View>
				</ScrollView>
				<View style={styles.tabBottomBackground}>
                </View>
			</LinearGradient>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	backgroundContainer: {
		flex: 1,
		// backgroundColor: 'blue',
		height: 280,		
	},
	imageBackground: {
        width: undefined, 
        padding: 16,
		paddingTop: 30,
		height: 280,
		justifyContent: 'space-around',
		alignItems: 'center',				
	},
	profileFraseContainer:{		
		// backgroundColor: 'orange'
	},
    imageProfile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
		borderColor: 'rgb(84, 76, 126)',
		marginTop: 18
	},
	profileContainer: {	
		flex: 5,	
		flexDirection: 'row',		
	},
	profile: {		
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center'
	},
	donationContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 75,	
		// backgroundColor: 'blue',
	},
	rankingContainer:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 85,	
		// backgroundColor: 'green',
	},
	donation:{
		fontSize: 32,		
		fontWeight: 'bold',
		color: 'rgba(255, 255, 255, 0.8)',
        textShadowColor: 'rgba(225, 22, 94, 0.7)', 
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10, 
	},
	ranking: {
		fontSize: 32,		
		fontWeight: 'bold',
		color: 'rgba(255, 255, 255, 0.8)',
        textShadowColor: 'rgba(225, 22, 94, 0.7)', 
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10, 
	},
	donationImage: {
		width: 50,
		height: 40,	
		resizeMode: 'contain'
	},
	rankingImage:{	
		width: 50,
		height: 40,	
		resizeMode: 'contain'	
	},
	name: {        
        fontSize: 20,
        fontWeight: '800',
		fontWeight: 'bold',
		marginVertical: 8,		
		textAlignVertical: "center",
		textAlign: "center",
		color: 'rgba(225, 22, 94, 0.7)',
        textShadowColor: '#fff', 
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10, 
	},
	fraseContainer: {		
		flex: 1,
		width: Dimensions.get('window').width,
		marginTop: 5,
		// backgroundColor: 'pink',
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 10,
		paddingLeft: 10
	},
    frase: {
        // color: 'rgba(255, 255, 255, 0.8)',        
        fontSize: 15,
		marginRight: 4,
		fontWeight: 'bold',
		fontStyle: "italic",
		textAlignVertical: "center",
		textAlign: "center",
		color: 'rgba(255, 255, 255, 0.8)',
        textShadowColor: 'rgba(225, 22, 94, 0.7)', 
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10, 
	},
	tabBottomBackground: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent'
    },
	conteudo: {
		flex: 1,
		justifyContent: 'center'
	},
	bodyIcons: {
		marginTop: 0,
		height: 56,
		flexDirection: 'row',
		// borderBottomColor: 'black',
		// borderBottomWidth: 0.5,
		justifyContent: 'space-around',
		backgroundColor: 'transparent',
		
	},
  	buttonContainer: {
		height:55,
		marginTop:10,
    	flexDirection: 'row',
    	justifyContent: 'center',
    	alignItems: 'flex-start',
    	width:140,
		borderRadius:40,
	},
	overlayHeaderContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	overlayHeaderText: {
		fontFamily: 'shelter',
        height: 30,
        fontSize: 28,
        color: 'rgba(225, 22, 94, 0.7)',
        textShadowColor: '#fff', 
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 10, 
	}
})

// user seria um state
// user = estado global dentro de storeConfig
const mapStateToProps = ({ user }) => {
	return {
		name: user.name,
		email: user.email
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(logout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)