import React, {Component} from 'react';
import { StyleSheet, Text, View, Button,Dimensions,Image,TouchableOpacity } from 'react-native';
import Backend from "./Backend.js";
import { GiftedChat } from "react-native-gifted-chat";
import ImagePicker from 'react-native-image-picker';
import Bubble from "react-native-gifted-chat/lib/Bubble";
import {NavigationActions, StackActions} from "react-navigation";

const GLOBAL = require('./Global');
const window = Dimensions.get('window');
type Props = {};
const options = {
    title: 'Select Avatar',
    maxWidth:300,
    maxHeight:500,
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class Chat extends Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    constructor(props) {
        super(props);


        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            mystatus:false,
            results: [],
            messages: [],
            texts:'',

        };

    }





    // renderBubble(props) {
    //
    //     return (
    //         <View>
    //             <Text style={{color:'black'}}>{props.currentMessage.user.name}</Text>
    //         </View>
    //     );
    // }
    componentWillMount() {


    }
    renderBubble = (props,index) => {
        var a = false;
        if (props.currentMessage.status == true){
        a = true;
        }else{
            a = false;
        }
        //
        // if (props.currentMessage.user_id != GLOBAL.user_id ){
        //
        // }
        return (

                <View style={{paddingRight: 12}}>




                    <Bubble {...props} />
                    {props.currentMessage.user_id != GLOBAL.user_id  &&  (
                        <View>

                        </View>
                    )}

                    {props.currentMessage.user_id == GLOBAL.user_id  &&  (
                        <View>
                            {a == true && (

                                <Image style={{width:15, height:15, resizeMode:'contain', alignSelf:'flex-end'}}
                                source={require('./seen.png')}/>

                            )}

                            {a != true && (

                                <Image style={{width:15, height:15, resizeMode:'contain', alignSelf:'flex-end'}}
                                source={require('./unseen.png')}/>

                            )}

                        </View>
                    )}






                </View>

        )
    }

    uploadImage = () => {
        const ext = this.state.imageUri.split('.').pop(); // Extract image extension
        const filename = `${uuid()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });
        firebase
            .storage()
            .ref(`tutorials/images/${filename}`)
            .putFile(this.state.imageUri)
            .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {
                    let state = {};
                    state = {
                        ...state,
                        progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
                    };
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        const allImages = this.state.images;
                        allImages.push(snapshot.downloadURL);
                        state = {
                            ...state,
                            uploading: false,
                            imgSource: '',
                            imageUri: '',
                            progress: 0,
                            images: allImages
                        };
                        AsyncStorage.setItem('images', JSON.stringify(allImages));
                    }
                    this.setState(state);
                },
                error => {
                    unsubscribe();
                    alert('Sorry, Try again.');
                }
            );
    };

    showActionSheet= ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };




                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }



    getlogs = ()=>{


        const url =  GLOBAL.BASE_URL  + 'start_stop_chat_video_time'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "booking_id": GLOBAL.mybookingid,
                "what":"1"






            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {






                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    getlog = ()=>{


        const url =  GLOBAL.BASE_URL  + 'timer'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "booking_id": GLOBAL.mybookingid,






            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {


                    this.getlog()

                    if (responseJson.time == 1){

                    }else{
                        this.props.navigation.goBack()
                    }

                }else{
                    this.props.navigation.goBack()
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }


    renderActions=() =>{
        return(
            <TouchableOpacity onPress={()=>this.showActionSheet()}>
                <Image style={{width:22, height:22, resizeMode:'contain', marginLeft:9, marginBottom:12}}
                       source={require('./paperclip.png')}/>
            </TouchableOpacity>
        )
    }
    login = () => {
        this.props
            .navigation
            .dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Landing',
                        params: { someParams: 'parameters goes here...' },
                    }),
                ],
            }))
    }

    render() {


        return (
            <View style = {{width:'100%',flex:1}}>

                <View style = {{width:'100%',height:54,backgroundColor:'white',borderBottomWidth:1,borderBottomColor:'#e1e1e1'}}>

                    <Text style = {{alignSelf:'center',marginTop: 30,fontSize:20}}>
                        {this.state.texts}
                    </Text>

                </View>

                <GiftedChat
                    renderActions={this.renderActions}
                    extraData={this.state}
                    renderUsernameOnMessage = {true}
                    messages={this.state.messages}
                    onSend={message => {
                        if (this.state.messages.length == 0) {
                            this.getlogs()
                        }


                        Backend.sendMessage(message);

                    }}
                    renderBubble={this.renderBubble}
                    onInputTextChanged = {text =>{
                        Backend.updateTyping(text)

                        // alert(text)

                    }

                    }
                    user={{
                        _id: GLOBAL.user_id,
                        name: GLOBAL.myname
                    }}
                />
            </View>





        );
    }


    componentDidMount() {
        this.getlog()
      //  GLOBAL.mystatus = "Online";



        // Backend.updateMessage(message => {
        //     alert(JSON.stringify(message))
        //
        //
        // })


        Backend.loadMessages(message => {
          //  alert(JSON.stringify(message))

            if (message.text == ''){


                for (var i = 0; i< this.state.messages.length;i++){

                         //  if (this.state.messages[i].anotherid == GLOBAL.user_id) {


                               if (this.state.messages[i].status == false) {

                                   let {messages} = this.state;
                                   let targetPost = messages[i];

                                   // Flip the 'liked' property of the targetPost
                                   targetPost.status = true;

                                   // Then update targetPost in 'posts'
                                   // You probably don't need the following line.
                                   // posts[index] = targetPost;

                                   // Then reset the 'state.posts' property
                                   this.setState({messages});
                               }
                         //  }
                   // alert(JSON.stringify(this.state.messages))
                }

                                   this.setState({messages:this.state.messages});

                return {
                    messages: this.state.messages
                };
                       //  var a = this.state.messages[i]
                       //
                       //
                       //  a.status = true
                       //
                       // // this.setState({messages:a})
                  //  this.setState({messages:})
             //   }


            } else {

                this.setState(previousState => {


                    return {
                        messages: GiftedChat.append(previousState.messages, message)
                    };
                });
            }
        });


       ;

        // Backend.updateMessage(message => {
        //     alert(JSON.stringify(message))
        //
        //
        // })

        Backend.loadMessagess(message => {
          // alert(JSON.stringify(message.typinganother))
            if (message.typinganother == true){
                var s = message.name +  ' is typing ...'
                this.setState({texts:s})
            }else{
                this.setState({texts:''})
            }

        });
    }
    componentWillUnmount() {
        Backend.closeChat();
    }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex: 1,
        backgroundColor :'#001739'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
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
    }
})