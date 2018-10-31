import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

export default class WeatherScreen extends Component {
    constructor(props) {
        super(props);
        this.fetchWeatherData = this.fetchWeatherData.bind(this);
        this.API_KEY = "534695a9249e02707edde0c2485f4c3a";
        this.state = {
            cityName: null,
        }
    }

    fetchWeatherData() {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.cityName + "&APPID=" + this.API_KEY)
            .then((response) => {
                return response.json();
            })
            .then((jsonResponse) => {
                console.log(jsonResponse);
                if (jsonResponse.cod == 404) {
                    this.setState({
                        weather: "City not found",
                    });
                    return;
                }
                const rawWeather = jsonResponse.weather[0].description;
                const uppercaseWeather = rawWeather.charAt(0).toUpperCase() + rawWeather.substr(1);
                this.setState({
                    weather: uppercaseWeather,
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.header}>
                    {this.state.weather}
                </Text>

                <Text style={styles.paragraph}>
                    Input a city name and then press submit
                </Text>

                <TextInput
                    style={styles.textfield}
                    onChangeText={cityName => this.setState({cityName: cityName})}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.fetchWeatherData}
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#FFFFFF',
    },
    header: {
        margin: 10,
        fontSize: 36,
        fontWeight: '300',
        textAlign: 'center',
        color: '#34495e',
    },
    paragraph: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
    textfield: {
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
