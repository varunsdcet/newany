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
import { TextField } from 'react-native-material-textfield';
type Props = {};
const GLOBAL = require('./Global');

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Support extends Component {
    state = {
        name :'',
        email:'',
        message :'',
        company :'',
        loading:false,
        visible:false,
    };


        static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'SUPPORT',
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


    submitEnq=()=>{
                const url = GLOBAL.BASE_URL +  'patient_support'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "patient_id": GLOBAL.user_id,
                "name": this.state.name,
                "email": this.state.email,
                "message": this.state.message
                 
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == true) {
                    this.props.navigation.goBack()
                    alert('Thank You! Your query has been submitted successfully!')
                }else{
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

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
<KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

    <View style={{width : Dimensions.get('window').width,height : Dimensions.get('window').height, backgroundColor:'#F2F5F7'}}>

    <View style={{backgroundColor:'white',color :'white',flexDirection:'column',flex:1 ,marginTop:15,marginBottom:70,marginLeft:15,marginRight:15, height:350,borderRadius :6,width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2}}>
    <Text style={{fontSize:23,color:'black',fontFamily:'Poppins-Medium',alignSelf:'center',marginTop:25}}>Need Help?</Text>
    <View style={{flexDirection:'row',marginTop:45,marginLeft:15,alignItems:'center'}}>
    <Image source={require('./phonelogo.png')}
          style={{width:20, height:20,resizeMode: 'contain'}} />
    <Text style={{fontSize:15,color:'#A9A9A9',fontFamily:'Poppins-Medium',marginLeft:15}}>0124-4884750</Text>
    </View>

    <View style={{flexDirection:'row',marginTop:15,marginLeft:8,alignItems:'center'}}>
    <Image source={require('./emaillogo.png')}
          style={{width:35, height:35,resizeMode: 'contain'}} />
    <Text style={{fontSize:15,color:'#A9A9A9',fontFamily:'Poppins-Medium',marginLeft:7}}>info@anytimedoc.com</Text>
    </View>

    <View style={{flexDirection:'row',marginTop:40,marginLeft:15,alignItems:'center'}}>

    <Text style={{fontSize:15,color:'black',fontFamily:'Poppins-Regular'}}>OR LEAVE US A MESSAGE</Text>
    <View
    style={{backgroundColor: '#CCCCCC',height:1,width:148,marginLeft:5}}>
    </View>
  </View>

  <View style={{flexDirection:'column',marginTop:40,marginLeft:20}}>
  <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'lightgrey'}}>FULL NAME</Text>

   <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey'}}
        placeholder=""
       returnKeyType='go'

        onChangeText={(text)=> this.setState({name : text})}
        secureTextEntry={false}
        autoCorrect={false}
     />


     <Text style={{fontSize:19,fontFamily:'Poppins-Medium',color:'lightgrey',marginTop:20}}>EMAIL</Text>

      <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey'}}
           placeholder=""
          returnKeyType='go'

           onChangeText={(text)=> this.setState({email : text})}
           secureTextEntry={false}
           autoCorrect={false}
        />

        <Text style={{fontSize:19,fontFamily:'Poppins-Medium',color:'lightgrey',marginTop:20}}>MESSAGE</Text>

         <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey'}}
              placeholder=""
             returnKeyType='go'

              onChangeText={(text)=> this.setState({message : text})}
              secureTextEntry={false}
              autoCorrect={false}
           />
     </View>

     <Button
     style={{fontSize:19,fontFamily:'Poppins-Medium',color: 'white',alignSelf:'center'}}
     containerStyle={{height:60,width:333,marginLeft:15,backgroundColor:'#0592CC',marginTop:30,justifyContent:'center'}}
     onPress={() =>this.submitEnq()}>
     SUBMIT
     </Button>


    </View>

    </View>


  </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
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

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})