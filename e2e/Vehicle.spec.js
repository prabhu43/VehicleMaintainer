/* eslint-env detox/detox, mocha */ describe('Vehicle', () => {
    it('should add new vehicle', async () => {
        await expect(
            element(by.label('My Vehicles').and(by.traits(['header']))),
        ).toBeVisible();
        await expect(element(by.id('AddVehicleButton'))).toBeVisible();
        await element(by.id('AddVehicleButton')).tap();

        await expect(
            element(by.label('Add Vehicle').and(by.traits(['header']))),
        ).toBeVisible();

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
        await expect(element(by.id('PurchaseDate'))).toHaveText(
            'December 28, 2019',
        );

        await element(by.id('SubmitButton')).tap();

        await expect(element(by.label('Success'))).toBeVisible();
        await expect(
            element(by.label('Your vehicle added successfully')),
        ).toBeVisible();

        await element(
            by.label('Ok').and(by.type('_UIAlertControllerActionView')),
        ).tap();

        await expect(
            element(by.label('My Vehicles').and(by.traits(['header']))),
        ).toBeVisible();
        await expect(element(by.label('MyBike'))).toBeVisible();
    });

    it('should show my vehicle info', async () => {
        await expect(
            element(by.label('My Vehicles').and(by.traits(['header']))),
        ).toBeVisible();
        await expect(
            element(by.label('MyBike Honda  Hornet Hornet STD ABS')),
        ).toBeVisible();

        await element(by.label('MyBike Honda  Hornet Hornet STD ABS')).tap();

        await expect(
            element(by.label('MyBike').and(by.traits(['header']))),
        ).toBeVisible();
        await expect(
            element(by.id('make').and(by.label('Honda'))),
        ).toBeVisible();
        await expect(
            element(by.id('model').and(by.label('Hornet'))),
        ).toBeVisible();
        await expect(
            element(by.id('variant').and(by.label('Hornet STD ABS'))),
        ).toBeVisible();
        await expect(
            element(by.id('purchaseDate').and(by.label('December 28, 2019'))),
        ).toBeVisible();
    });

    it('should edit my vehicle info', async () => {
        await expect(element(by.id('options'))).toBeVisible();
        await element(by.id('options')).tap();

        await expect(element(by.id('editVehicle'))).toBeVisible();
        await element(by.id('editVehicle')).tap();

        await expect(
            element(by.label('Edit Vehicle').and(by.traits(['header']))),
        ).toBeVisible();

        await element(
            by.label('Hornet STD ABS').withAncestor(by.id('Variant')),
        ).tap();
        await element(by.label('Hornet ABS')).tap();

        await element(by.id('SubmitButton')).tap();

        await expect(element(by.label('Success'))).toBeVisible();
        await expect(
            element(by.label('Your vehicle updated successfully')),
        ).toBeVisible();

        await element(
            by.label('Ok').and(by.type('_UIAlertControllerActionView')),
        ).tap();

        await expect(
            element(by.label('MyBike').and(by.traits(['header']))),
        ).toBeVisible();
        await expect(
            element(by.id('variant').and(by.label('Hornet ABS'))),
        ).toBeVisible();
    });

    it('should delete the vehicle', async () => {
        await expect(element(by.id('options'))).toBeVisible();
        await element(by.id('options')).tap();

        await expect(element(by.id('deleteVehicle'))).toBeVisible();
        await element(by.id('deleteVehicle')).tap();
        await element(
            by.label('Confirm').and(by.type('_UIAlertControllerActionView')),
        ).tap();

        await expect(
            element(by.label('My Vehicles').and(by.traits(['header']))),
        ).toBeVisible();

        await expect(element(by.label('MyBike'))).toNotExist();
    });
});
