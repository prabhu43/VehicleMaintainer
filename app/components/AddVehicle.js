/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import moment from 'moment';
import {Alert, Button, Platform, StyleSheet, View} from 'react-native';
import BikesJSON from '../testdata/bikes.json';
import CarsJSON from '../testdata/cars.json';
import {
  Container,
  Content,
  DatePicker,
  Icon,
  Input,
  Item,
  Label,
  Picker,
} from 'native-base';
import Realm from 'realm';

let realm;

export default class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleOptions: {
        types: ['Bike', 'Car'],
        bikes: BikesJSON,
        cars: CarsJSON,
      },
      canSubmit: false,
    };

    realm = new Realm({path: 'VehicleMaintainerDB.realm'});
    let {mode} = props.route.params;
    switch (mode) {
      case 'create': {
        console.log('Add new vehicle!!');
        this.state = {
          ...this.state,
          selected: {
            name: '',
            type: '',
            make: '',
            model: '',
            variant: '',
            purchaseDate: '',
          },
          mode: 'create',
        };
        break;
      }
      case 'edit': {
        console.log('Edit existing vehicle!!!');
        let {name} = props.route.params;
        let vehicleDetails = realm.objectForPrimaryKey('vehicles', name);
        this.state = {
          ...this.state,
          selected: vehicleDetails,
          mode: 'edit',
        };
        break;
      }
      default: {
        console.log('Invalid Mode!! Navigating to home page');
        props.navigation.navigate('MyVehicles');
      }
    }

    this.getMakes = this.getMakes.bind(this);
    this.getModels = this.getModels.bind(this);
    this.getVariants = this.getVariants.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getMakes(type) {
    if (!type) {
      return [];
    }
    if (type === 'Bike') {
      return this.state.vehicleOptions.bikes;
    } else if (type === 'Car') {
      return this.state.vehicleOptions.cars;
    }
    return [];
  }

  getModels(type, make) {
    if (!type || !make) {
      return [];
    }
    return this.getMakes(type).find(vehicle => vehicle.make === make).models;
  }

  getVariants(type, make, model) {
    if (!type || !make || !model) {
      return [];
    }
    return this.getModels(type, make).find(item => item.name === model)
      .variants;
  }

  typeOptions() {
    let pickerItems = this.state.vehicleOptions.types.map(type => {
      let itemKey = type
        .toLowerCase()
        .split(' ')
        .join('');
      return <Picker.Item key={itemKey} value={type} label={type} />;
    });
    if (Platform.OS === 'android') {
      pickerItems.unshift(
        <Picker.Item
          key={-1}
          value={''}
          label={'Select Type'}
          color={'lightgrey'}
        />,
      );
    }
    return pickerItems;
  }

  makeOptions() {
    let type = this.state.selected.type;
    if (!type) {
      return;
    }

    let pickerItems = this.getMakes(type).map(vehicle => {
      let makeName = vehicle.make;
      let itemKey = makeName
        .toLowerCase()
        .split(' ')
        .join('');
      return <Picker.Item key={itemKey} value={makeName} label={makeName} />;
    });
    if (Platform.OS === 'android') {
      pickerItems.unshift(
        <Picker.Item
          key={-1}
          value={''}
          label={'Select Make'}
          color={'lightgrey'}
        />,
      );
    }
    return pickerItems;
  }

  modelOptions() {
    let {type, make} = this.state.selected;
    if (!type || !make) {
      return;
    }
    let pickerItems = this.getModels(type, make).map(model => {
      let modelName = model.name;
      let itemKey = modelName
        .toLowerCase()
        .split(' ')
        .join('');
      return <Picker.Item key={itemKey} value={modelName} label={modelName} />;
    });
    if (Platform.OS === 'android') {
      pickerItems.unshift(
        <Picker.Item
          key={-1}
          value={''}
          label={'Select Model'}
          color={'lightgrey'}
        />,
      );
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
      let itemKey = variantName
        .toLowerCase()
        .split(' ')
        .join('');
      return (
        <Picker.Item key={itemKey} value={variantName} label={variantName} />
      );
    });
    if (Platform.OS === 'android') {
      pickerItems.unshift(
        <Picker.Item
          key={-1}
          value={''}
          label={'Select Variant'}
          color={'lightgrey'}
        />,
      );
    }
    return pickerItems;
  }

  handleChange(fieldName) {
    const executeChange = (value, inputName) => {
      let newChanges = {
        [inputName]: value,
      };
      switch (inputName) {
        case 'model': {
          newChanges.variant = '';
          break;
        }
        case 'make': {
          newChanges.model = '';
          newChanges.variant = '';
          break;
        }
        case 'type': {
          newChanges.make = '';
          newChanges.model = '';
          newChanges.variant = '';
          break;
        }
      }

      this.setState(
        prevState => {
          let prevSelected = JSON.parse(JSON.stringify(prevState.selected));
          return {
            selected: Object.assign(prevSelected, newChanges),
          };
        },
        () => {
          let {
            name,
            type,
            make,
            model,
            variant,
            purchaseDate,
          } = this.state.selected;
          let canSubmit =
            !!name &&
            !!type &&
            !!make &&
            !!model &&
            !!variant &&
            !!purchaseDate;
          this.setState({
            canSubmit: canSubmit,
          });
        },
      );
    };

    return function(value) {
      executeChange(value, fieldName);
    };
  }

  handleSubmit() {
    realm.write(() => {
      let {mode} = this.state;
      let that = this;
      if (mode === 'create') {
        realm.create('vehicles', this.state.selected);
        Alert.alert(
          'Success',
          'Your vehicle added successfully',
          [
            {
              text: 'Ok',
              onPress: () => that.props.navigation.navigate('MyVehicles'),
            },
          ],
          {cancelable: false},
        );
      } else {
        let vehicleDetails = realm.objectForPrimaryKey(
          'vehicles',
          this.state.selected.name,
        );
        let updatedVehicleInfo = Object.assign({}, this.state.selected);
        delete updatedVehicleInfo.name;
        Object.assign(vehicleDetails, updatedVehicleInfo);

        Alert.alert(
          'Success',
          'Your vehicle updated successfully',
          [
            {
              text: 'Ok',
              onPress: () => that.props.navigation.goBack(),
            },
          ],
          {cancelable: false},
        );
      }
    });
  }

  render() {
    let {selected} = this.state;
    return (
      <Container>
        <Content padder>
          <View>
            <Item>
              <Label>Name</Label>
              <Input
                placeholder={'Pet name of vehicle'}
                placeholderTextColor={'lightgrey'}
                onChangeText={this.handleChange('name')}
                value={selected.name}
                editable={this.state.mode === 'create'}
              />
            </Item>
            <Item picker>
              <Label>Type</Label>
              <Picker
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Vehicle Type"
                placeholderStyle={styles.placeholderStyle}
                placeholderIconColor="#007aff"
                selectedValue={selected.type}
                onValueChange={this.handleChange('type')}>
                {this.typeOptions()}
              </Picker>
            </Item>
            <Item picker>
              <Label>Make</Label>
              <Picker
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Make"
                placeholderStyle={styles.placeholderStyle}
                placeholderIconColor="#007aff"
                selectedValue={selected.make}
                onValueChange={this.handleChange('make')}
                enabled={selected.type !== ''}>
                {this.makeOptions()}
              </Picker>
            </Item>
            <Item picker>
              <Label>Model</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Model"
                placeholderStyle={styles.placeholderStyle}
                placeholderIconColor="#007aff"
                selectedValue={selected.model}
                onValueChange={this.handleChange('model')}
                enabled={selected.make !== ''}>
                {this.modelOptions()}
              </Picker>
            </Item>
            <Item picker>
              <Label>Variant</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Variant"
                placeholderStyle={styles.placeholderStyle}
                placeholderIconColor="#007aff"
                selectedValue={selected.variant}
                onValueChange={this.handleChange('variant')}
                enabled={selected.model !== ''}>
                {this.variantOptions()}
              </Picker>
            </Item>
            <Item>
              <Label>Purchase Date</Label>
              <DatePicker
                mode={'date'}
                defaultDate={this.state.selected.purchaseDate}
                minimumDate={new Date(2000, 1, 1)}
                maximumDate={new Date()}
                modalTransparent={true}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText={
                  !this.state.selected.purchaseDate ? 'Select date' : null
                }
                placeHolderTextStyle={styles.placeholderStyle}
                onDateChange={this.handleChange('purchaseDate')}
                formatChosenDate={value => moment(value).format('MMM DD, YYYY')}
              />
            </Item>
            <Button
              disabled={!this.state.canSubmit}
              onPress={this.handleSubmit}
              title="Submit"
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  placeholderStyle: {
    color: 'lightgrey',
  },
});
