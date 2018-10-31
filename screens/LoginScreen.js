import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity, // This is a touchable button component
    StyleSheet,
    Image,
} from 'react-native';

export default class LoginScreen extends Component {
    constructor(props) {
        // In the constructor, the superclass constructor must be called. This step is easy to forget.
        super(props);

        // Whenever a function uses 'this', we need to bind 'this' to App,
        // so 'this' in function is the same as 'this' in App
        this.onPressSubmit = this.onPressSubmit.bind(this);
    }

    // Called when the submit button is pressed
    onPressSubmit() {
        this.props.navigation.navigate('ToDoList');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{
                        width: 350,
                        height: 120,
                        marginVertical: 50,
                    }}
                    source={require('../AppLabLogo.png')}
                />

                <Text style={styles.text}>
                    Username
                </Text>
                <TextInput
                    style={styles.textField}
                    onChangeText={(text) => this.setState({username: text})}
                    containerStyle={{width: '100%'}}
                />

                <Text style={styles.text}>
                    Password
                </Text>
                <TextInput
                    style={styles.textField}
                    onChangeText={(text) => this.setState({password: text})}
                    // We mask the password by setting the secureTextEntry prop to TRUE
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPressSubmit}
                >
                    <Text style={styles.buttonText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    text: {
        alignSelf: 'flex-start',
        marginVertical: 5,
    },
    textField: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        height: 40,
        width: '100%',
        borderColor: '#4ABBEB',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
    },
    button: {
        height: 50,
        width: '100%',
        backgroundColor: '#4ABBEB',
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'Helvetica Neue',
    }
});
