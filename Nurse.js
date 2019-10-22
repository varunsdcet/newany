import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Nurse extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        images :[
            {
                image :require('./male.png'),
                selected:'',
                images :require('./males.png'),

            },
            {
                image :require('./female.png'),
                selected:'',
                images :require('./females.png'),

            },
        ]

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'SELECT NURSE',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'#0592CC',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }



    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){

    }
  


    login = () => {
        if (this.state.images[0].selected == 'Y'){
            GLOBAL.nurse = 'Male'
            this.props.navigation.navigate('NurseBooking')
        }
        if (this.state.images[1].selected == 'Y'){
            GLOBAL.nurse = 'Female'
            this.props.navigation.navigate('NurseBooking')
        }


    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = () => {
        var a = this.state.images
        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }
        var index = a[0]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[0] = index
        this.setState({images:this.state.images})
    }
    selectedFirsts = () => {
        var a = this.state.images

        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }

        var index = a[1]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[1] = index
        this.setState({images:this.state.images})

}
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }
    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View style={styles.container}>



                        <Text style = {{color:'#FFFFFF',fontSize: 36,marginTop: '20%',fontFamily:'Poppins-Regular',textAlign:'center'}}>
                           Select Your Nurse

                        </Text>




                        <View style = {{flexDirection: 'row',margin :'1%',justifyContent:'space-around'}}>
                            <TouchableOpacity onPress={() => this.selectedFirst()}>

                                {this.state.images[0].selected == '' && (
                            <Image style = {{width :140 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                               source={this.state.images[0].image}/>
                                )}
                                {this.state.images[0].selected != '' && (
                                    <Image style = {{width :140 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                                           source={this.state.images[0].images}/>
                                )}
                                </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.selectedFirsts()}>


                                {this.state.images[1].selected == '' && (
                                    <Image style = {{width :140 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                                           source={this.state.images[1].image}/>
                                )}
                                {this.state.images[1].selected != '' && (
                                    <Image style = {{width :140 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                                           source={this.state.images[1].images}/>
                                )}
                            </TouchableOpacity>
                </View>

                        <Button
                            style={{padding:7,marginTop:'20%',fontSize: 20, color: '#0592CC',backgroundColor:'white',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            SUBMIT
                        </Button>









                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#0592CC',
        height: window.height,
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',
        textDecorationLine: 'underline',



    } ,
})