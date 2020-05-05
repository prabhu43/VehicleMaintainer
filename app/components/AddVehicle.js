/**
 * @format
 * @flow strict-local
 */

import React from "react";
import moment from "moment";
import {Button, Platform, View, Alert} from "react-native";
import BikesJSON from "../testdata/bikes.json";
import CarsJSON from "../testdata/cars.json"
import {Container, Content, DatePicker, Icon, Input, Item, Label, Picker} from "native-base";
import Realm from "realm";
let realm;

export default class AddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleOptions: {
                types: ["Bike", "Car"],
                bikes: [],
                cars: [],
            },
            selected: {
                name: "",
                type: "",
                make: "",
                model: "",
                variant: "",
                purchaseDate: "",
            },
            canSubmit: false,
        };

        realm = new Realm({ path: "VehicleMaintainerDB.realm" });

        this.getMakes = this.getMakes.bind(this);
        this.getModels = this.getModels.bind(this);
        this.getVariants = this.getVariants.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState(prevState => ({
            ...prevState,
            vehicleOptions: {
                ...prevState.vehicleOptions,
                bikes: BikesJSON,
                cars: CarsJSON
            }
        }));
    }

    getMakes(type) {
        if (!type) {
            return [];
        }
        if (type === "Bike") {
            return this.state.vehicleOptions.bikes
        } else if (type === "Car") {
            return this.state.vehicleOptions.cars
        }
        return [];
    }

    getModels(type, make) {
        if (!type || !make) {
            return [];
        }
        return this.getMakes(type).find(vehicle => vehicle.make === make)["models"];
    }

    getVariants(type, make, model) {
        if (!type || !make || !model) {
            return [];
        }
        return this.getModels(type, make).find(item => item.name === model)["variants"];
    }

    typeOptions() {
        let pickerItems = this.state.vehicleOptions.types.map(type => {
            let itemKey = type.toLowerCase().split(" ").join("");
            return <Picker.Item key={itemKey} value={type} label={type}/>
        });
        if (Platform.OS === "android") {
            pickerItems.unshift(<Picker.Item key={-1} value={""} label={"Select Type"} color={"lightgrey"}/>);
        }
        return pickerItems
    }

    makeOptions() {
        let type = this.state.selected.type;
        if (!type) {
            return;
        }

        let pickerItems = this.getMakes(type).map(vehicle => {
            let makeName = vehicle.make;
            let itemKey = makeName.toLowerCase().split(" ").join("");
            return <Picker.Item key={itemKey} value={makeName} label={makeName}/>
        });
        if (Platform.OS === "android") {
            pickerItems.unshift(<Picker.Item key={-1} value={""} label={"Select Make"} color={"lightgrey"}/>);
        }
        return pickerItems
    }


    modelOptions() {
        let {type, make} = this.state.selected;
        if (!type || !make) {
            return;
        }
        let pickerItems = this.getModels(type, make).map(model => {
            let modelName = model.name;
            let itemKey = modelName.toLowerCase().split(" ").join("");
            return <Picker.Item key={itemKey} value={modelName} label={modelName}/>
        });
        if (Platform.OS === "android") {
            pickerItems.unshift(<Picker.Item key={-1} value={""} label={"Select Model"} color={"lightgrey"}/>);
        }
        return pickerItems;
    }

    variantOptions() {
        let {type, make, model} = this.state.selected;
        if (!type || !make || !model) {
            return;
        }

        let pickerItems = this.getVariants(type, make, model).map(variant => {
            let variantName = variant.name;
            let itemKey = variantName.toLowerCase().split(" ").join("");
            return <Picker.Item key={itemKey} value={variantName} label={variantName}/>
        });
        if (Platform.OS === "android") {
            pickerItems.unshift(<Picker.Item key={-1} value={""} label={"Select Variant"} color={"lightgrey"}/>);
        }
        return pickerItems;
    }

    handleChange(name) {
        const executeChange = (value, inputName) => {
            // if (inputName == "purchaseDate") {
            //     value = moment(value).format("DD/MM/YYYY")
            // }
            let newChanges = {
                [inputName]: value,
            };
            switch (inputName) {
                case "model": {
                    newChanges["variant"] = "";
                    break;
                }
                case "make": {
                    newChanges["model"] = "";
                    newChanges["variant"] = "";
                    break;
                }
                case "type": {
                    newChanges["make"] = "";
                    newChanges["model"] = "";
                    newChanges["variant"] = "";
                    break;
                }
            }

            this.setState(prevState => ({
                ...prevState,
                selected: {...prevState.selected, ...newChanges},
            }), () => {
                let {name, type, make, model, variant, purchaseDate} = this.state.selected;
                let canSubmit = !!name && !!type && !!make && !!model && !!variant && !!purchaseDate;
                this.setState(prevState => ({
                    ...prevState,
                    canSubmit: canSubmit,
                }));
            });
        };

        return function (value) {
            executeChange(value, name);
        }
    }

    handleSubmit() {
        realm.write(() => {
            realm.create('vehicles', this.state.selected)
        });
        let that = this;
        Alert.alert(
            'Success',
            'Your vehicle added successfully',
            [
                {
                    text: 'Ok',
                    onPress: () => that.props.navigation.navigate("MyVehicles"),
                },
            ],
            { cancelable: false }
        );


    }
    render() {
        let selected = this.state.selected;
        return (

            <Container>
                <Content padder>
                    <View>
                        <Item>
                            <Label>Name</Label>
                            <Input placeholder={"Pet name of vehicle"}
                                   placeholderTextColor={"lightgrey"}
                                   onChangeText={this.handleChange("name")}
                                   value={selected.name}

                            />
                        </Item>
                        <Item picker>
                            <Label>Type</Label>
                            <Picker
                                iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                placeholder="Vehicle Type"
                                placeholderStyle={{color: "lightgrey"}}
                                placeholderIconColor="#007aff"
                                selectedValue={selected.type}
                                onValueChange={this.handleChange("type")}
                            >
                                {this.typeOptions()}
                            </Picker>
                        </Item>
                        <Item picker>
                            <Label>Make</Label>
                            <Picker
                                iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                placeholder="Make"
                                placeholderStyle={{color: "lightgrey"}}
                                placeholderIconColor="#007aff"
                                selectedValue={selected.make}
                                onValueChange={this.handleChange("make")}
                                enabled={this.state.selected.type !== ""}
                            >
                                {this.makeOptions()}
                            </Picker>
                        </Item>
                        <Item picker>
                            <Label>Model</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                placeholder="Model"
                                placeholderStyle={{color: "lightgrey"}}
                                placeholderIconColor="#007aff"
                                selectedValue={selected.model}
                                onValueChange={this.handleChange("model")}
                                enabled={this.state.selected.make !== ""}
                            >
                                {this.modelOptions()}
                            </Picker>
                        </Item>
                        <Item picker>
                            <Label>Variant</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                placeholder="Variant"
                                placeholderStyle={{color: "lightgrey"}}
                                placeholderIconColor="#007aff"
                                selectedValue={selected.variant}
                                onValueChange={this.handleChange("variant")}
                                enabled={this.state.selected.model !== ""}
                            >
                                {this.variantOptions()}
                            </Picker>
                        </Item>
                        <Item>
                            <Label>Purchase Date</Label>
                            <DatePicker
                                minimumDate={new Date(2000, 1, 1)}
                                maximumDate={new Date()}
                                modalTransparent={true}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                placeHolderTextStyle={{color: "lightgrey"}}
                                onDateChange={this.handleChange("purchaseDate")}
                                formatChosenDate={(value)=> moment(value).format("DD/MM/YYYY")}
                            />
                        </Item>

                        <Button
                            disabled={!this.state.canSubmit}
                            onPress={this.handleSubmit}
                            title="Submit"/>

                    </View>

                </Content>
            </Container>
        )
    }
}
