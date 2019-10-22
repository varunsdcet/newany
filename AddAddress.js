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
const GLOBAL = require('./Global');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class AddAddress extends Component {
    state = {
        height :'',
        weight:'',
        blood_group :'',
        allergies :'',
        illnesses :'',
        surgeries :'',
        loading:false,
        visible:false,
        stateslist:[{"code": "AN","name": "Andaman and Nicobar Islands"},
{"code": "AP","name": "Andhra Pradesh"},
{"code": "AR","name": "Arunachal Pradesh"},
{"code": "AS","name": "Assam"},
{"code": "BR","name": "Bihar"},
{"code": "CG","name": "Chandigarh"},
{"code": "CH","name": "Chhattisgarh"},
{"code": "DH","name": "Dadra and Nagar Haveli"},
{"code": "DD","name": "Daman and Diu"},
{"code": "DL","name": "Delhi"},
{"code": "GA","name": "Goa"},
{"code": "GJ","name": "Gujarat"},
{"code": "HR","name": "Haryana"},
{"code": "HP","name": "Himachal Pradesh"},
{"code": "JK","name": "Jammu and Kashmir"},
{"code": "JH","name": "Jharkhand"},
{"code": "KA","name": "Karnataka"},
{"code": "KL","name": "Kerala"},
{"code": "LD","name": "Lakshadweep"},
{"code": "MP","name": "Madhya Pradesh"},
{"code": "MH","name": "Maharashtra"},
{"code": "MN","name": "Manipur"},
{"code": "ML","name": "Meghalaya"},
{"code": "MZ","name": "Mizoram"},
{"code": "NL","name": "Nagaland"},
{"code": "OR","name": "Odisha"},
{"code": "PY","name": "Puducherry"},
{"code": "PB","name": "Punjab"},
{"code": "RJ","name": "Rajasthan"},
{"code": "SK","name": "Sikkim"},
{"code": "TN","name": "Tamil Nadu"},
{"code": "TS","name": "Telangana"},
{"code": "TR","name": "Tripura"},
{"code": "UK","name": "Uttarakhand"},
{"code": "UP","name": "Uttar Pradesh"},
{"code": "WB","name": "West Bengal"}],
        selected:false,listvis:false,
        data:[],

    };


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {

            //   header: () => null,
            title: 'ADD ADDRESS',
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

    _saveDetails() {
        Alert.alert('clicked save');
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this._saveDetails });
    }
    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

    selectedFirst=(item,index)=>{
//alert(JSON.stringify(item))
    this.setState({blood_group: item.name})
    this.setState({listvis:false})
    }

    _renderItems = ({item,index}) => {

        return (


            <TouchableOpacity onPress={() => this.selectedFirst(item,index)
            }>


                    <View style={{height:30,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,
                        width:'100%',borderRadius: 0 ,backgroundColor: 'white', borderBottomWidth:1, borderBottomColor:'#bfbfbf'
                    }}>



                        <Text style={{color:'#707070',fontSize:16}}>
                            {item.name}

                        </Text>


                    </View>
            </TouchableOpacity>




        )
    }

    login = () => {
        if(this.state.height ==''){
            alert('Please enter address')
        }else if(this.state.weight == ''){
            alert('Please enter area')
        }else if(this.state.allergies == ''){
            alert('Please select state')
        }else if(this.state.blood_group==''){
            alert('Please enter pincode')
        }else{
        const url = GLOBAL.BASE_URL +  'add_address'

        this.showLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id : GLOBAL.user_id,
                address: this.state.height,
                area:this.state.weight,
                pincode:this.state.allergies,
                city_state:this.state.blood_group,
              
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
//                alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
  //                  alert(JSON.stringify(responseJson))
                        alert('Address added successfully!')
                        this.props.navigation.goBack()

                }else {
                    alert(responseJson.message)
                }
            })
            .catch((error) => {
                console.error(error);
            });

        }
    }

openState=()=>{
    this.setState({listvis: !this.state.listvis})
}

    render() {

        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (

                <View style={styles.container}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'2%'}}>



                                <TextInput style={styles.input}
                                           placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                           onChangeText={(text) => this.setState({height:text})

                                           } placeholder={" Address"}/>



                                <TextInput style={styles.input}
                                           placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                           onChangeText={(text) => this.setState({weight:text})} placeholder={" Area"}/>



                        <TouchableOpacity onPress={()=> this.openState()}>

                            <View style = {styles.input}>
                                <TextInput style = {{ fontFamily:'Poppins-Medium',
                                    fontSize:18,
                                    marginTop:14, color: 'rgba(0, 0, 0, 0.6)',marginLeft:4}}
                                           placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                           editable={false}
                                           value={this.state.blood_group}
                                           onChangeText={(text) => this.setState({blood_group:text})} placeholder={" State"}/>

                            </View>

                        </TouchableOpacity>


                        {this.state.listvis == true && (

                          <FlatList style= {{flexGrow:0,margin:8, height:200, borderWidth:1, borderColor:'#bfbfbf',borderRadius:5}}
                              data={this.state.stateslist}
                              numColumns={1}
                              horizontal={false}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

                            )}
                            

                            <TextInput style={styles.input}
                                       placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                       maxLength={10}
                                       keyboardType={'numeric'}
                                       onChangeText={(text) => this.setState({allergies:text})} placeholder={" Pincode"}/>
                        

                        </View>


                        <Button
                            style={{padding:4,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            SAVE
                        </Button>
                    </KeyboardAwareScrollView>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'white'
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

    inputContainer: {
        borderLeftWidth: 4,
        borderRightWidth: 4,
        height: 70
    },
    input: {
        height : 50,
        borderWidth:1,
        borderColor:'#e6e7f0',
        borderRadius:4,
        color: 'rgba(0, 0, 0, 0.6)',
        fontFamily:'Poppins-Medium',
        fontSize:18,
        marginTop:20,


        width:'100%'
    },


})