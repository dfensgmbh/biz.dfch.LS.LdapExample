/// <reference path="viewModel.js" />

(function (lightSwitchApplication) {

    var $element = document.createElement("div");

    lightSwitchApplication.AddEditADUser.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditADUser
        },
        Details: {
            _$class: msls.ContentItem,
            _$name: "Details",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.AddEditADUser,
            data: lightSwitchApplication.AddEditADUser,
            value: lightSwitchApplication.AddEditADUser
        },
        SearchAdUser: {
            _$class: msls.ContentItem,
            _$name: "SearchAdUser",
            _$parentName: "Details",
            screen: lightSwitchApplication.AddEditADUser,
            data: lightSwitchApplication.AddEditADUser,
            value: String
        },
        columns: {
            _$class: msls.ContentItem,
            _$name: "columns",
            _$parentName: "Details",
            screen: lightSwitchApplication.AddEditADUser,
            data: lightSwitchApplication.AddEditADUser,
            value: lightSwitchApplication.ADUser
        },
        left: {
            _$class: msls.ContentItem,
            _$name: "left",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddEditADUser,
            data: lightSwitchApplication.ADUser,
            value: lightSwitchApplication.ADUser
        },
        UserName: {
            _$class: msls.ContentItem,
            _$name: "UserName",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditADUser,
            data: lightSwitchApplication.ADUser,
            value: String
        },
        Email: {
            _$class: msls.ContentItem,
            _$name: "Email",
            _$parentName: "left",
            screen: lightSwitchApplication.AddEditADUser,
            data: lightSwitchApplication.ADUser,
            value: String
        },
        right: {
            _$class: msls.ContentItem,
            _$name: "right",
            _$parentName: "columns",
            screen: lightSwitchApplication.AddEditADUser,
            data: lightSwitchApplication.ADUser,
            value: lightSwitchApplication.ADUser
        },
        Department: {
            _$class: msls.ContentItem,
            _$name: "Department",
            _$parentName: "right",
            screen: lightSwitchApplication.AddEditADUser,
            data: lightSwitchApplication.ADUser,
            value: String
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.AddEditADUser
        }
    };

    msls._addEntryPoints(lightSwitchApplication.AddEditADUser, {
        /// <field>
        /// Called when a new AddEditADUser screen is created.
        /// <br/>created(msls.application.AddEditADUser screen)
        /// </field>
        created: [lightSwitchApplication.AddEditADUser],
        /// <field>
        /// Called before changes on an active AddEditADUser screen are applied.
        /// <br/>beforeApplyChanges(msls.application.AddEditADUser screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.AddEditADUser],
        /// <field>
        /// Called after the Details content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Details_postRender: [$element, function () { return new lightSwitchApplication.AddEditADUser().findContentItem("Details"); }],
        /// <field>
        /// Called to render the SearchAdUser content item.
        /// <br/>render(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        SearchAdUser_render: [$element, function () { return new lightSwitchApplication.AddEditADUser().findContentItem("SearchAdUser"); }],
        /// <field>
        /// Called after the columns content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        columns_postRender: [$element, function () { return new lightSwitchApplication.AddEditADUser().findContentItem("columns"); }],
        /// <field>
        /// Called after the left content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        left_postRender: [$element, function () { return new lightSwitchApplication.AddEditADUser().findContentItem("left"); }],
        /// <field>
        /// Called after the UserName content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        UserName_postRender: [$element, function () { return new lightSwitchApplication.AddEditADUser().findContentItem("UserName"); }],
        /// <field>
        /// Called after the Email content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Email_postRender: [$element, function () { return new lightSwitchApplication.AddEditADUser().findContentItem("Email"); }],
        /// <field>
        /// Called after the right content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        right_postRender: [$element, function () { return new lightSwitchApplication.AddEditADUser().findContentItem("right"); }],
        /// <field>
        /// Called after the Department content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Department_postRender: [$element, function () { return new lightSwitchApplication.AddEditADUser().findContentItem("Department"); }]
    });

    lightSwitchApplication.BrowseADUsers.prototype._$contentItems = {
        Tabs: {
            _$class: msls.ContentItem,
            _$name: "Tabs",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.BrowseADUsers
        },
        ADUserList: {
            _$class: msls.ContentItem,
            _$name: "ADUserList",
            _$parentName: "Tabs",
            screen: lightSwitchApplication.BrowseADUsers,
            data: lightSwitchApplication.BrowseADUsers,
            value: lightSwitchApplication.BrowseADUsers
        },
        ADUsers: {
            _$class: msls.ContentItem,
            _$name: "ADUsers",
            _$parentName: "ADUserList",
            screen: lightSwitchApplication.BrowseADUsers,
            data: lightSwitchApplication.BrowseADUsers,
            value: {
                _$class: msls.VisualCollection,
                screen: lightSwitchApplication.BrowseADUsers,
                _$entry: {
                    elementType: lightSwitchApplication.ADUser
                }
            }
        },
        rows: {
            _$class: msls.ContentItem,
            _$name: "rows",
            _$parentName: "ADUsers",
            screen: lightSwitchApplication.BrowseADUsers,
            data: lightSwitchApplication.ADUser,
            value: lightSwitchApplication.ADUser
        },
        UserName: {
            _$class: msls.ContentItem,
            _$name: "UserName",
            _$parentName: "rows",
            screen: lightSwitchApplication.BrowseADUsers,
            data: lightSwitchApplication.ADUser,
            value: String
        },
        Email: {
            _$class: msls.ContentItem,
            _$name: "Email",
            _$parentName: "rows",
            screen: lightSwitchApplication.BrowseADUsers,
            data: lightSwitchApplication.ADUser,
            value: String
        },
        Department: {
            _$class: msls.ContentItem,
            _$name: "Department",
            _$parentName: "rows",
            screen: lightSwitchApplication.BrowseADUsers,
            data: lightSwitchApplication.ADUser,
            value: String
        },
        Popups: {
            _$class: msls.ContentItem,
            _$name: "Popups",
            _$parentName: "RootContentItem",
            screen: lightSwitchApplication.BrowseADUsers
        }
    };

    msls._addEntryPoints(lightSwitchApplication.BrowseADUsers, {
        /// <field>
        /// Called when a new BrowseADUsers screen is created.
        /// <br/>created(msls.application.BrowseADUsers screen)
        /// </field>
        created: [lightSwitchApplication.BrowseADUsers],
        /// <field>
        /// Called before changes on an active BrowseADUsers screen are applied.
        /// <br/>beforeApplyChanges(msls.application.BrowseADUsers screen)
        /// </field>
        beforeApplyChanges: [lightSwitchApplication.BrowseADUsers],
        /// <field>
        /// Called after the ADUserList content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ADUserList_postRender: [$element, function () { return new lightSwitchApplication.BrowseADUsers().findContentItem("ADUserList"); }],
        /// <field>
        /// Called after the ADUsers content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        ADUsers_postRender: [$element, function () { return new lightSwitchApplication.BrowseADUsers().findContentItem("ADUsers"); }],
        /// <field>
        /// Called after the rows content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        rows_postRender: [$element, function () { return new lightSwitchApplication.BrowseADUsers().findContentItem("rows"); }],
        /// <field>
        /// Called after the UserName content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        UserName_postRender: [$element, function () { return new lightSwitchApplication.BrowseADUsers().findContentItem("UserName"); }],
        /// <field>
        /// Called after the Email content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Email_postRender: [$element, function () { return new lightSwitchApplication.BrowseADUsers().findContentItem("Email"); }],
        /// <field>
        /// Called after the Department content item has been rendered.
        /// <br/>postRender(HTMLElement element, msls.ContentItem contentItem)
        /// </field>
        Department_postRender: [$element, function () { return new lightSwitchApplication.BrowseADUsers().findContentItem("Department"); }]
    });

}(msls.application));