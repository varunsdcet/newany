import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    AsyncStorage,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';

import { DrawerActions } from 'react-navigation';
const GLOBAL = require('./Global');
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
type props={};
export default class Home extends Component<Props>{
    state = {
        location: '',

    };
    onPressFemale(){
        //   this.props.navigation.navigate('Duration')
    }

    render(){
        return(

            <View style={{ flex: 1 }}>
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    minLength={1} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={"search"}
                    listViewDisplayed="false"
                    fetchDetails={true}
                    renderDescription={row =>
                        row.description || row.formatted_address || row.name

                    }
                    onPress={(data, details = null) => {
                        if(GLOBAL.like==2){
                        GLOBAL.lat =  details.geometry.location.lat
                        GLOBAL.long =  details.geometry.location.lng
                        GLOBAL.locationliketogo =  data.description

                        this.props.navigation.goBack()
                        }else if(GLOBAL.like==1){
                        GLOBAL.lat =  details.geometry.location.lat
                        GLOBAL.long =  details.geometry.location.lng
                        GLOBAL.currLoc =  data.description

                        this.props.navigation.goBack()
     
                        }else{
                        GLOBAL.lat =  details.geometry.location.lat
                        GLOBAL.long =  details.geometry.location.lng
                        GLOBAL.location =  data.description

                        this.props.navigation.goBack()

                        }

                    }}
                    getDefaultValue={() => {
                        return ""; // text input default value
                    }}
                    query={{
                        key: "AIzaSyBWX-QNm_gVzt6U2K6xeU4cmF5dkX8XUQ0",
                        language: "en", // language of the results
                        types: "(cities)" // default: 'geocode'
                    }}
                    styles={{
                        description: {
                            fontWeight: "bold"
                        },
                        predefinedPlacesDescription: {
                            color: "#1faadb"
                        }
                    }}
                    enablePoweredByContainer={true}
                    nearbyPlacesAPI="GoogleReverseGeocoding"
                    GooglePlacesSearchQuery={{
                        rankby: "distance",
                        types: ""
                    }}
                    filterReverseGeocodingByTypes={[
                        "locality",
                        "administrative_area_level_3"
                    ]}
                    debounce={200}
                />
            </View>
        );
    }
}