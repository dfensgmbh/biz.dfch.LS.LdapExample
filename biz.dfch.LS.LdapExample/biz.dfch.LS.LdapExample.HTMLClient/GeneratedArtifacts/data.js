/// <reference path="../Scripts/msls.js" />

window.myapp = msls.application;

(function (lightSwitchApplication) {

    var $Entity = msls.Entity,
        $DataService = msls.DataService,
        $DataWorkspace = msls.DataWorkspace,
        $defineEntity = msls._defineEntity,
        $defineDataService = msls._defineDataService,
        $defineDataWorkspace = msls._defineDataWorkspace,
        $DataServiceQuery = msls.DataServiceQuery,
        $toODataString = msls._toODataString;

    function ADUser(entitySet) {
        /// <summary>
        /// Represents the ADUser entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this aDUser.
        /// </param>
        /// <field name="Id" type="Number">
        /// Gets or sets the id for this aDUser.
        /// </field>
        /// <field name="UserName" type="String">
        /// Gets or sets the userName for this aDUser.
        /// </field>
        /// <field name="Email" type="String">
        /// Gets or sets the email for this aDUser.
        /// </field>
        /// <field name="Department" type="String">
        /// Gets or sets the department for this aDUser.
        /// </field>
        /// <field name="CreatedBy" type="String">
        /// Gets or sets the createdBy for this aDUser.
        /// </field>
        /// <field name="Created" type="Date">
        /// Gets or sets the created for this aDUser.
        /// </field>
        /// <field name="ModifiedBy" type="String">
        /// Gets or sets the modifiedBy for this aDUser.
        /// </field>
        /// <field name="Modified" type="Date">
        /// Gets or sets the modified for this aDUser.
        /// </field>
        /// <field name="RowVersion" type="Array">
        /// Gets or sets the rowVersion for this aDUser.
        /// </field>
        /// <field name="details" type="msls.application.ADUser.Details">
        /// Gets the details for this aDUser.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function ApplicationData(dataWorkspace) {
        /// <summary>
        /// Represents the ApplicationData data service.
        /// </summary>
        /// <param name="dataWorkspace" type="msls.DataWorkspace">
        /// The data workspace that created this data service.
        /// </param>
        /// <field name="ADUsers" type="msls.EntitySet">
        /// Gets the ADUsers entity set.
        /// </field>
        /// <field name="details" type="msls.application.ApplicationData.Details">
        /// Gets the details for this data service.
        /// </field>
        $DataService.call(this, dataWorkspace);
    };
    function DataWorkspace() {
        /// <summary>
        /// Represents the data workspace.
        /// </summary>
        /// <field name="ApplicationData" type="msls.application.ApplicationData">
        /// Gets the ApplicationData data service.
        /// </field>
        /// <field name="details" type="msls.application.DataWorkspace.Details">
        /// Gets the details for this data workspace.
        /// </field>
        $DataWorkspace.call(this);
    };

    msls._addToNamespace("msls.application", {

        ADUser: $defineEntity(ADUser, [
            { name: "Id", type: Number },
            { name: "UserName", type: String },
            { name: "Email", type: String },
            { name: "Department", type: String },
            { name: "CreatedBy", type: String, isReadOnly: true },
            { name: "Created", type: Date, isReadOnly: true },
            { name: "ModifiedBy", type: String, isReadOnly: true },
            { name: "Modified", type: Date, isReadOnly: true },
            { name: "RowVersion", type: Array }
        ]),

        ApplicationData: $defineDataService(ApplicationData, lightSwitchApplication.rootUri + "/ApplicationData.svc", [
            { name: "ADUsers", elementType: ADUser }
        ], [
            {
                name: "ADUsers_SingleOrDefault", value: function (Id) {
                    return new $DataServiceQuery({ _entitySet: this.ADUsers },
                        lightSwitchApplication.rootUri + "/ApplicationData.svc" + "/ADUsers(" + "Id=" + $toODataString(Id, "Int32?") + ")"
                    );
                }
            }
        ]),

        DataWorkspace: $defineDataWorkspace(DataWorkspace, [
            { name: "ApplicationData", type: ApplicationData }
        ])

    });

}(msls.application));
