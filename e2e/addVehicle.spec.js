/* eslint-env detox/detox, mocha */
describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should add new vehicle', async () => {
    await expect(element(by.label('My Vehicles'))).toBeVisible();
    await expect(element(by.id('AddVehicleButton'))).toBeVisible();
    await element(by.id('AddVehicleButton')).tap();

    await expect(element(by.label('Add Vehicle'))).toBeVisible();

    await element(by.id('VehicleName')).typeText('MyBike');

    await element(by.label('Select Type')).tap();
    await element(by.label('Bike')).tap();

    await element(by.label('Select Make')).tap();
    await element(by.label('Honda')).tap();

    await element(by.label('Select Model')).tap();
    await element(by.label('Hornet')).tap();

    await element(by.label('Select Variant')).tap();
    await element(by.label('Hornet STD ABS')).tap();

    await element(by.label('Select Purchase Date')).tap();
    await expect(element(by.type('UIPickerView'))).toBeVisible();
    await element(by.type('UIPickerView')).setColumnToValue(2, '2019');
    await element(by.type('UIPickerView')).setColumnToValue(0, 'December');
    await element(by.type('UIPickerView')).setColumnToValue(1, '28');
    await element(by.label('Confirm')).tap();
    await expect(element(by.id('PurchaseDate'))).toHaveText('December 28, 2019');

    await element(by.id('SubmitButton')).tap();

    await expect(element(by.label('Success'))).toBeVisible();
    await expect(element(by.label('Your vehicle added successfully'))).toBeVisible();
    await element(by.label('Ok').and(by.type('_UIAlertControllerActionView'))).tap();

    await expect(element(by.label('My Vehicles'))).toBeVisible();
    await expect(element(by.label('MyBike Honda  Hornet Hornet STD ABS'))).toBeVisible();
  });
});
