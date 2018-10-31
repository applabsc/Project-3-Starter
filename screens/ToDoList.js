import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    TextInput,
    Keyboard,
    Platform,
} from "react-native";

const isAndroid = Platform.OS === "android";
const viewPadding = 10;

export default class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            taskText: "",
        }
    }

    changeTextHandler = text => {
        this.setState({ text: text });
    };

    getKeyForList = () => {
        return Math.floor((Math.random() * 10000)).toString();
    };

    addTask = () => {
        if (this.state.text == null) {
            return;
        }
        // If the input text field is empty, do nothing
        if (this.state.text.trim().length === 0) {
            return;
        }

        let { tasks, text } = this.state;
        // Items need a key if they are being displayed in a FlatList (in render method)
        const newTask = { key: this.getKeyForList(), text: text };

        // Add task to tasks and reset text of the task textfield
        this.setState({
            tasks: tasks.concat(newTask),
            text: ""
        });
    };

    deleteTask = i => {
        this.setState(
            prevState => {
                // New tasks is a DEEP COPY of prevState.tasks
                // Slice does the deep copy for us, otherwise we'd be modifying the array passed by reference
                let newTasks = prevState.tasks.slice();

                // We use the splice function to remove the element at index i from the array
                // DOCUMENTATION FOR SPLICE FUNCTION
                // The splice method can be used to add or remove elements from an array.
                //    The first argument specifies the location at which to begin adding or removing elements.
                //    The second argument specifies the number of elements to remove.
                //    The third and subsequent arguments are optional; they specify elements to be added to the array.
                newTasks.splice(i, 1);

                return { tasks: newTasks };
            },
        )
    };

    componentDidMount() {
        Keyboard.addListener(
            isAndroid ? "keyboardDidShow" : "keyboardWillShow",
            e => this.setState({ viewPadding: e.endCoordinates.height - 55 })
        );

        Keyboard.addListener(
            isAndroid ? "keyboardDidHide" : "keyboardWillHide",
            () => this.setState({ viewPadding: viewPadding })
        );
    }

    render() {
        return (
            <View
                style={[styles.container, { paddingBottom: this.state.viewPadding }]}
            >
                <FlatList
                    style={styles.list}
                    data={this.state.tasks}
                    renderItem={({ item, index }) =>
                        <View style={styles.listItemView}>
                            <Text style={styles.listItemText}>
                                {item.text}
                            </Text>
                            <Button title="╳" onPress={() => this.deleteTask(index)} />
                        </View>
                    }
                />

                <TextInput
                    style={styles.textInput}
                    onChangeText={this.changeTextHandler}
                    onSubmitEditing={this.addTask}
                    value={this.state.text}
                    placeholder="Add Tasks"
                    returnKeyType="done"
                    returnKeyLabel="done"
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        padding: viewPadding,
        paddingTop: 40,
        paddingHorizontal: 15,
    },
    list: {
        width: "100%"
    },
    listItemText: {
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 18,
    },
    listItemView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textInput: {
        height: 40,
        marginBottom: 20,
        borderColor: '#4ABBEB',
        borderWidth: isAndroid ? 0 : 2,
        borderRadius: 10,
        width: "100%",
        fontSize: 18,
        padding: 5,
    },
});
