/// <reference path="data.js" />

(function (lightSwitchApplication) {

    msls._addEntryPoints(lightSwitchApplication.ADUser, {
        /// <field>
        /// Called when a new aDUser is created.
        /// <br/>created(msls.application.ADUser entity)
        /// </field>
        created: [lightSwitchApplication.ADUser]
    });

}(msls.application));
