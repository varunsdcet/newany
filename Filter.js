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
import RangeSlider from 'rn-range-slider';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
import store from 'react-native-simple-store';
type Props = {};

const GLOBAL = require('./Global');

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Filter extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',

        hospital:'',
        department :'',
        speciality :'',
        loading:false,
        visible:false,
        low:0,
        high:0,

        selected:false,
        data:[],

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'FILTER',
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

    fetchHospitalss = (res) => {
        if (res.length == 0 || res == null){
            this.setState({speciality:false})

        }else {
            this.setState({speciality:true})
        }
    }

    fetchHospitals = (res) => {
//        alert('ss')
        if (res.length == 0 || res == null){
            this.setState({department:false})

        }else {
            this.setState({department:true})
        }
    }

    fetchHospital = (res) => {
        if (res.length == 0 || res == null){
            this.setState({hospital:false})

        }else {
            this.setState({hospital:true})
        }
    }

    _handleStateChange = (state)=>{
        store.get('hospital')
            .then((res) =>
                //  alert(JSON.stringify(res))
                this.fetchHospital(res)
            )
        store.get('departments')
            .then((res) =>
                //  alert(JSON.stringify(res))
                this.fetchHospitals(res)
            )

        store.get('speciality')
            .then((res) =>
                //  alert(JSON.stringify(res))
                this.fetchHospitalss(res)
            )
    }
    componentDidMount(){
        this.props.navigation.addListener('willFocus',this._handleStateChange);


    }




    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
       // alert('dd')
        this.setState({selected:true})
    }
    setModalVisible = () =>{
        this.props.navigation.navigate('Department')
    }

    setModalVisibless = () => {
        this.props.navigation.navigate('HospitalFilter')
    }

    setModalVisibles = () => {
        this.props.navigation.navigate('SpecialityFilter')
    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }
    login = ()=>{
        GLOBAL.appply = 0
        GLOBAL.low = 0
        GLOBAL.high = 0
        store.delete('hospital')
        store.delete('speciality')
        store.delete('departments')
    }

    logins= ()=>{
        AsyncStorage.setItem('apply', true);
        GLOBAL.appply = 1
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

                <View style={styles.container}>
                    <KeyboardAwareScrollView>

                        <View style={{marginTop: 10,marginLeft:10,width:window.width-20 }}>
                            <TouchableOpacity onPress={()=>this.setModalVisible()}>


                                <View>




 <View style = {{flexDirection:'row'}}>
                                <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular',width:window.width- 50}}>Department Filter-</Text>


                                {this.state.department == true && (
                                <Image style = {{width :22 ,height: 22,resizeMode: 'contain',marginTop:7}}
                                       source={require('./check.png')}/>
                                )}
 </View>
                                    <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                    </View>


</View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.setModalVisibles()}>
                                <View>




                                    <View style = {{flexDirection:'row'}}>
                                        <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular',width:window.width- 50}}>Speciality Filter-</Text>


                                        {this.state.speciality == true && (
                                            <Image style = {{width :22 ,height: 22,resizeMode: 'contain',marginTop:7}}
                                                   source={require('./check.png')}/>
                                        )}
                                    </View>
                                    <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                    </View>


                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.setModalVisibless()}>
                                <View>




                                    <View style = {{flexDirection:'row'}}>
                                        <Text style={{fontSize: 16, color:'black', fontFamily: 'Poppins-Regular',width:window.width- 50}}>Hospital Filter-</Text>


                                        {this.state.hospital == true && (
                                            <Image style = {{width :22 ,height: 22,resizeMode: 'contain',marginTop:7}}
                                                   source={require('./check.png')}/>
                                        )}
                                    </View>
                                    <View style = {{backgroundColor:'#e1e1e1',width:'100%',height:1,marginTop: 10,marginBottom:10}}>
                                    </View>


                                </View>
                            </TouchableOpacity>


                        </View>



                            <Text style={{fontSize: 20,marginLeft:10,marginTop:40, color:'black', fontFamily: 'Poppins-Medium'}}>Choose Price Range</Text>





                        <RangeSlider
                            style={{width: 300,alignSelf:'center', height: 80}}
                            gravity={'center'}
                            min={0}
                            max={10000}
                            initialLowValue = {GLOBAL.low}
                            initialHighValue = {GLOBAL.high}
                            step={20}
                            selectionColor="#000"
                            blankColor="#e1e3e4"
                            onValueChanged={(low, high, fromUser) => {
                                GLOBAL.low = low
                                GLOBAL.high = high
                                AsyncStorage.setItem('low', low);
                                AsyncStorage.setItem('high', high);
                                this.setState({rangeLow: low, rangeHigh: high})
                            }}/>






<View style = {{flexDirection:'row',alignSelf:'center'}}>

    <Button
        style={{padding:4,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'grey',marginLeft:'5%',width:window.width/2 - 50,height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
        styleDisabled={{color: 'red'}}
        onPress={() => this.logins()}>
        APPLY
    </Button>
                        <Button
                            style={{padding:4,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:window.width/2 - 50,height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            CLEAR
                        </Button>
</View>


                    </KeyboardAwareScrollView>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

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