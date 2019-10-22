import React, {Component, PureComponent} from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity,
    Dimensions, Modal, NativeModules, Image
} from 'react-native'

import {Surface, ActivityIndicator} from 'react-native-paper'
const GLOBAL = require('./Global');
import {RtcEngine, AgoraView} from 'react-native-agora'

import {APPID} from './settings'

const {Agora} = NativeModules
console.log(Agora)

if (!Agora) {
    throw new Error("Agora load failed in react-native, please check ur compiler environments")
}

const {
    FPS30,
    AudioProfileDefault,
    AudioScenarioDefault,
    Host,
    Adaptative
} = Agora

const BtnEndCall = () => require('./btn_endcall.png')
const BtnMute = () => require('./btn_mute.png')
const BtnSwitchCamera = () => require('./btn_switch_camera.png')
const IconMuted = () => require('./icon_muted.png')

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    absView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
    },
    videoView: {
        padding: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        zIndex: 100
    },
    localView: {
        flex: 1
    },
    remoteView: {
        width: (width - 40) / 3,
        height: (width - 40) / 3,
        margin: 5
    },
    bottomView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

class OperateButton extends PureComponent {
    render() {
        const {onPress, source, style, imgStyle = {width: 50, height: 50}} = this.props
        return (
            <TouchableOpacity
                style={style}
                onPress={onPress}
                activeOpacity={.7}
            >
                <Image
                    style={imgStyle}
                    source={source}
                />
            </TouchableOpacity>
        )
    }
}

type Props = {
    channelProfile: Number,
    channelName: String,
    clientRole: Number,
    onCancel: Function,
    uid: Number,
}

class VideoCall extends Component<Props> {
    state = {
        peerIds: [],
        joinSucceed: false,
        isMute: false,
        hideButton: false,
        visible: false,
        selectedUid: undefined,
        animating: true
    }

    componentWillMount () {

        // const options = {
        //     appid: 'ef38b64215ed49d2acc3c6d8e20439f4',
        //     channelProfile: 1,
        //     videoProfile: 40,
        //     clientRole: 1,
        //     swapWidthAndHeight: true
        // };
        // RtcEngine.init(options);


        const config = {
            appid: APPID,
            channelProfile: this.props.channelProfile,
            clientRole: this.props.clientRole,
            videoEncoderConfig: {
                width: 360,
                height: 480,
                bitrate: 1,
                frameRate: FPS30,
                orientationMode: Adaptative,
            },
            swapWidthAndHeight:true,
            audioProfile: AudioProfileDefault,
            audioScenario: AudioScenarioDefault
        }
        console.log("[CONFIG]", JSON.stringify(config));
        console.log("[CONFIG.encoderConfig", config.videoEncoderConfig);
        RtcEngine.on('videoSizeChanged', (data) => {
            console.log("[RtcEngine] videoSizeChanged ", data)
        })
        RtcEngine.on('remoteVideoStateChanged', (data) => {
            console.log('[RtcEngine] `remoteVideoStateChanged`', data);
        })
        RtcEngine.on('userJoined', (data) => {
            console.log('[RtcEngine] onUserJoined', data);
            const {peerIds} = this.state;
            if (peerIds.indexOf(data.uid) === -1) {
                this.setState({
                    peerIds: [...peerIds, data.uid]
                })
            }
        })
        RtcEngine.on('userOffline', (data) => {
            console.log('[RtcEngine] onUserOffline', data);
            this.setState({
                peerIds: this.state.peerIds.filter(uid => uid !== data.uid)
            })
            console.log('peerIds', this.state.peerIds, 'data.uid ', data.uid)
        })
        RtcEngine.on('joinChannelSuccess', (data) => {
            console.log('[RtcEngine] onJoinChannelSuccess', data);
            RtcEngine.startPreview().then(_ => {
                this.setState({
                    joinSucceed: true,
                    animating: false
                })
            })
        })
        RtcEngine.on('audioVolumeIndication', (data) => {
            console.log('[RtcEngine] onAudioVolumeIndication', data);
        })
        RtcEngine.on('clientRoleChanged', (data) => {
            console.log("[RtcEngine] onClientRoleChanged", data);
        })
        RtcEngine.on('videoSizeChanged', (data) => {
            console.log("[RtcEngine] videoSizeChanged", data);
        })
        RtcEngine.on('error', (data) => {
            console.log('[RtcEngine] onError', data);
            if (data.error === 17) {
                RtcEngine.leaveChannel().then(_ => {
                    this.setState({
                        joinSucceed: false
                    })
                    const { state, goBack } = this.props.navigation;
                    this.props.onCancel(data);
                    goBack();
                })
            }
        })
        RtcEngine.init(config);
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
    componentDidMount () {
        this.getlog()

        RtcEngine.getSdkVersion((version) => {
            console.log('[RtcEngine] getSdkVersion', version);
        })

        console.log('[joinChannel] ' + this.props.channelName);
        RtcEngine.joinChannel(this.props.channelName, this.props.uid)
            .then(result => {
                /**
                 * ADD the code snippet after join channel success.
                 */
            });
        RtcEngine.enableAudioVolumeIndication(500, 3);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.navigation.isFocused();
    }


    componentWillUnmount () {
        if (this.state.joinSucceed) {
            RtcEngine.leaveChannel().then(res => {
                RtcEngine.destroy()
            }).catch(err => {
                RtcEngine.destroy()
                console.log("leave channel failed", err);
            })
        } else {
            RtcEngine.destroy()
        }
    }

    handleCancel = () => {
        const { goBack } = this.props.navigation;
        RtcEngine.leaveChannel().then(_ => {
            this.setState({
                joinSucceed: false
            })
            goBack()
        }).catch(err => {
            console.log("[agora]: err", err)
        })
    }

    switchCamera = () => {
        RtcEngine.switchCamera();
    }

    toggleAllRemoteAudioStreams = () => {
        this.setState({
            isMute: !this.state.isMute
        }, () => {
            RtcEngine.muteAllRemoteAudioStreams(this.state.isMute).then(_ => {
                /**
                 * ADD the code snippet after muteAllRemoteAudioStreams success.
                 */
            })
        })
    }

    toggleHideButtons = () => {
        this.setState({
            hideButton: !this.state.hideButton
        })
    }

    onPressVideo = (uid) => {
        this.setState({
            selectedUid: uid
        }, () => {
            this.setState({
                visible: true
            })
        })
    }

    toolBar = ({hideButton, isMute}) => {
        if (!hideButton) {
            return (
                <View>
                    <View style={styles.bottomView}>
                        <OperateButton
                            onPress={this.toggleAllRemoteAudioStreams}
                            source={isMute ? IconMuted() : BtnMute()}
                        />
                        <OperateButton
                            style={{alignSelf: 'center', marginBottom: -10}}
                            onPress={this.handleCancel}
                            imgStyle={{width: 60, height: 60}}
                            source={BtnEndCall()}
                        />
                        <OperateButton
                            onPress={this.switchCamera}
                            source={BtnSwitchCamera()}
                        />
                    </View>
                </View>)
        }
    }

    agoraPeerViews = ({visible, peerIds}) => {
        return (visible ?
            <View style={styles.videoView} /> :
            <View style={styles.videoView}>{
                peerIds.map((uid, key) => (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onPressVideo(uid)}
                        key={key}>
                        {/*               <Text>uid: {uid}</Text>*/}
                        <AgoraView
                            mode={1}
                            key={uid}
                            style={styles.remoteView}
                            zOrderMediaOverlay={true}
                            remoteUid={uid}
                        />
                    </TouchableOpacity>
                ))
            }</View>)
    }

    selectedView = ({visible}) => {
        return (
            <Modal
                visible={visible}
                presentationStyle={'fullScreen'}
                animationType={'slide'}
                onRequestClose={() => {}}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{flex: 1}}
                    onPress={() => this.setState({
                        visible: false
                    })} >
                    <AgoraView
                        mode={1}
                        style={{flex: 1}}
                        zOrderMediaOverlay={true}
                        remoteUid={this.state.selectedUid}
                    />
                </TouchableOpacity>
            </Modal>)
    }

    render () {
        if (!this.state.joinSucceed) {
            return (
                <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator animating={this.state.animating} />
                </View>
            )
        }

        return (
            <Surface
                activeOpacity={1}
                onPress={this.toggleHideButtons}
                style={styles.container}
            >
                <AgoraView style={styles.localView} showLocalVideo={true} mode={1} />
                <View style={styles.absView}>
                    {/*      <Text>uid: {this.props.uid}, channelName: {this.props.channelName}, peers: {this.state.peerIds.join(",")}</Text>*/}
                    {this.agoraPeerViews(this.state)}
                    {this.toolBar(this.state)}
                </View>
                {this.selectedView(this.state)}
            </Surface>
        )
    }
}

export default function AgoraRTCViewContainer(props) {
    const { navigation } = props
    const channelProfile = navigation.getParam('channelProfile', 1)
    const clientRole = navigation.getParam('clientRole', Host)
    const channelName = navigation.getParam('channelName', 'agoratest')
    const uid = navigation.getParam('uid', Math.floor(Math.random() * 100))
    const onCancel = navigation.getParam('onCancel')

    return (<VideoCall
        channelProfile={channelProfile}
        channelName={channelName}
        clientRole={clientRole}
        uid={uid}
        onCancel={onCancel}
        {...props}
    ></VideoCall>)
}