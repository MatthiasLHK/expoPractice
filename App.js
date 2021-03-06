import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
//<Image source={logo} style={{width: 305, height: 159}}/>
//<Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={{ width: 305, height: 159 }} />

export default function App() {

    const [selectedImage, setSelectedImage] = React.useState(null);
    // block for the access of media on the phone
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted == false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        // selecting image
        if (pickerResult.cancelled == true) {
            return; // do nothing
        }

        setSelectedImage({localUri: pickerResult.uri}); // set state to selected image
    };
    //

    let openShareDialogAsync = async () => { // for sharing image block
        if (!(await Sharing.isAvailableAsync())) {
            alert("Uh oh, sharing isn't available on your platform");
        }
        await Sharing.shareAsync(selectedImage.localUri);
    };

    if (selectedImage != null) { // check if the state is null
        return (
            <View style={styles.container}>
              <Image
                source={{uri: selectedImage.localUri}}
                style={styles.thumbnail}
                />
                <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Share this photo</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Image source={logo} style={styles.logo}/>
            <Text style = {styles.instructions}>To share a photo from your phone with a friend, just press the button below!</Text>
            <StatusBar style="auto" />

            <TouchableOpacity
                 onPress={openImagePickerAsync}
                 style={styles.button}>
                 <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>

        </View>
      );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 10,
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 100,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
});
