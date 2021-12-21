import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <View>
            <Image
              source={require('../booklogo.jpg')}
              style={{ width: 200, height: 200 }}
            />
            <Text style={{textAlign:"center",fontSize:30,fontFamily:"bold"}}>E-LOTS</Text>
          </View>
          <View style={styles.InputView}>
            <TextInput style={styles.InputBox} placeholder="Book Id" />
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.InputView}>
            <TextInput style={styles.InputBox} placeholder="Student Id" />
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // displayText: {
  //   fontSize: 15,
  //   textDecorationLine: 'underline',
  // },
  InputView: {
    flexDirection: 'row',
    margin: 20,
  },
  InputBox: {
    width: 200,
    height: 40,
    borderWidth: 2,
    borderRightWidth: 2,
  },
  scanButton: {
    backgroundColor: '#2196F3',
    width: 50,
    borderWidth: 2,
    borderLeftWidth: 0,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
