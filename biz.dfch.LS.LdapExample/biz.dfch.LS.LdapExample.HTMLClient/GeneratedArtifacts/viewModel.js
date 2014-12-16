/// <reference path="data.js" />

(function (lightSwitchApplication) {

    var $Screen = msls.Screen,
        $defineScreen = msls._defineScreen,
        $DataServiceQuery = msls.DataServiceQuery,
        $toODataString = msls._toODataString,
        $defineShowScreen = msls._defineShowScreen;

    function AddEditADUser(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the AddEditADUser screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="ADUser" type="msls.application.ADUser">
        /// Gets or sets the aDUser for this screen.
        /// </field>
        /// <field name="SearchAdUser" type="String">
        /// Gets or sets the searchAdUser for this screen.
        /// </field>
        /// <field name="details" type="msls.application.AddEditADUser.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "AddEditADUser", parameters);
    }

    function BrowseADUsers(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the BrowseADUsers screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="ADUsers" type="msls.VisualCollection" elementType="msls.application.ADUser">
        /// Gets the aDUsers for this screen.
        /// </field>
        /// <field name="details" type="msls.application.BrowseADUsers.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "BrowseADUsers", parameters);
    }

    msls._addToNamespace("msls.application", {

        AddEditADUser: $defineScreen(AddEditADUser, [
            { name: "ADUser", kind: "local", type: lightSwitchApplication.ADUser },
            { name: "SearchAdUser", kind: "local", type: String }
        ], [
        ]),

        BrowseADUsers: $defineScreen(BrowseADUsers, [
            {
                name: "ADUsers", kind: "collection", elementType: lightSwitchApplication.ADUser,
                createQuery: function () {
                    return this.dataWorkspace.ApplicationData.ADUsers;
                }
            }
        ], [
        ]),

        showAddEditADUser: $defineShowScreen(function showAddEditADUser(ADUser, options) {
            /// <summary>
            /// Asynchronously navigates forward to the AddEditADUser screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("AddEditADUser", parameters, options);
        }),

        showBrowseADUsers: $defineShowScreen(function showBrowseADUsers(options) {
            /// <summary>
            /// Asynchronously navigates forward to the BrowseADUsers screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 0);
            return lightSwitchApplication.showScreen("BrowseADUsers", parameters, options);
        })

    });

}(msls.application));
