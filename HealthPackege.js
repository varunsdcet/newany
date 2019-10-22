
import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
    Linking,
    FlatList,
    Dimensions,



} from 'react-native';


const GLOBAL = require('./Global');


import Button from 'react-native-button';



class  HealthPackege extends React.Component{
    constructor() {
        super();

        this.state = {
            FlatListItems: [
                {"key": "#1",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },
                {"key": "#2",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },
                {"key": "#3",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },
                {"key": "#4",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },
                {"key": "#5",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },

            ]}
    }

    componentDidMount(){
        const url =  GLOBAL.BASE_URL  + 'lab_test_package2'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {

              //  alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.list})
                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    selectedFirst = (item) =>{
        GLOBAL.lab = item
        this.props.navigation.navigate('PackageMember')
       // alert(JSON.stringify(item))
    }

    renderItem=({item}) => {
        var test_included = item.test_included
        var s = "";
        if (test_included.length == 1){
            s = test_included[0]
        }else {
            s = test_included.join(",")
        }
        return(
            <TouchableOpacity onPress={() => this.selectedFirst(item)
            }>

            <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,margin: 10,borderRadius :6,width : Dimensions.get('window').width-20, shadowColor: '#D3D3D3',
                shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5}}>
                <View style={{flexDirection: 'row', marginTop:6}}>
                    <Text style={{color:'black', fontSize:15,marginLeft:5,fontFamily:'Poppins-Medium',alignItems:'flex-start'}}>{item.package_name}</Text>

                </View>

                <View style={{flexDirection:'column', marginTop:5}}>
                    <View style={{flexDirection:'row', marginTop:5}}>
                        <Text style={{color:'#808080', fontSize:13,fontFamily:'Poppins-Regular',marginLeft:5}}>
                            includes
                        </Text>
                        <Text style={{color:'black',fontSize:13,fontFamily:'Poppins-Medium',marginLeft:3}}>{item.total_test} Tests</Text>
                    </View>
                    <Text style={{color:'#808080',fontFamily:'Poppins-Regular',fontSize:15,marginTop:3,marginLeft:5}}>{s}</Text>
                </View>


                <View style={{flexDirection:'row',marginTop:8}}>
                    <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:5}}
                            containerStyle={{height:25,width:183,backgroundColor:'white',overflow:'hidden',marginLeft:5,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>Recomended for:</Text>
                        {item.recommed_for}
                    </Button>

                    <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:40}}
                            containerStyle={{height:25,width:122,backgroundColor:'white',overflow:'hidden',marginLeft:9,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>Age group:</Text>
                        {item.age_group}yrs.
                    </Button>

                </View>


                <View style={{flexDirection:'row',marginTop:10,alignItems:'center',width:'100%',marginBottom:10}}>
                    <View style = {{flexDirection:'row',width:'50%'}}>
                    {item.discount_price != "0.00" && (

                        <Text style={{fontSize:15,color:'#FF2D00',textDecorationLine:'line-through',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹{item.base_price}/-</Text>

                    )}
                    {item.discount_price != "0.00" && (

                        <Text style={{fontSize:15,color:'black',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹{item.discount_price}/-</Text>

                    )}

                    {item.discount_price == "0.00" && (

                        <Text style={{fontSize:15,color:'#FF2D00',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹{item.base_price}/-</Text>

                    )}
                    {item.discount_price == "0.00" && (

                        <Text style={{fontSize:15,color:'#FF2D00',textDecorationLine:'line-through',marginLeft:5,fontFamily:'Poppins-Medium'}}></Text>

                    )}

                    </View>


                </View>



            </View>
            </TouchableOpacity>

        );
    }

    _keyExtractor=(item, index)=>item.key;

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'HEALTH PACKAGES',
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



    render(){
        return(
            <View style={{justifyContent: 'center',flex:1,backgroundColor:'#F5F5F5'}}>
                <FlatList
                    data={this.state.results}

                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>

        );
    }
}

export default HealthPackege;
