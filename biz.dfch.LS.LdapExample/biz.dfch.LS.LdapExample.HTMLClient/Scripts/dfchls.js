

var dfchls = {
    addAdSearchBox: function ($element, contentItem, options) {
        try {
            //check if options are set:
            if ((undefined === options) || (null === options)) {
                var options = {}
            }
            checkSelect2Options(options);
            //add html
            var $divMaster = $("<div class='dfchlsMasterDiv' />");
            $element.append($divMaster);
            addControl($divMaster, contentItem, options);
        }
        catch (e) {
            console.log(e.message + "; description:" + e.description);
        }
    }
}

function checkSelect2Options(options) {

    /* usage example and description of options:
    description:
    placeholder: '[ResourceId of placeholder, defined in .resjson]' -- placeholder text 
        quietMillis: 1000   --- time until controls will search (in ms)   
        minimumInputLength: 3   --- minimum lenght of characters until starting search   
        dataType: json   --- data type of results
        page_limit: 10   --- limit of pages of results
        dropdownCssClass: 'bigdrop'   --- style of control (defined in select2)
        initialItemsMin:5   --- count of controls which are initially displayed  
        minimumItems: 1   --- min. count of select2 controls for contentItem
        maximumItems: 3   --- max. count of select2 controls for contentItem 
        searchMode: 'startsWith'   --- mode for searching (startsWith | indexOf)
        width: '100px'   --- width of control (int, % or px)
        btnAddItemTitle: '[ResourceId of btnAddItemTitle, defined in .resjson]'   --- button text
        mode: 'single' | 'multi'   --- specifies if one or multiple select2 controls will be shown (with add/remove button)
    usage:
    var options = { 
        placeholder: '[ResourceId of placeholder, defined in .resjson]',  
        quietMillis: 1000,   
        minimumInputLength: 3,   
        dataType: json,
        page_limit: 10,
        dropdownCssClass: 'bigdrop',
        initialItemsMin:5, 
        minimumItems: 1,
        maximumItems: 3, 
        searchMode: 'startsWith',
        width: '100px',
        btnAddItemTitle: '[ResourceId of btnAddItemTitle, defined in .resjson]',
        mode: 'single'
    }
    
    */
    if (!options.hasOwnProperty("placeholder")) { options["placeholder"] = 'Search User'; }
    if (!options.hasOwnProperty("quietMillis")) { options["quietMillis"] = 1000; }
    if (!options.hasOwnProperty("minimumInputLength")) { options["minimumInputLength"] = 3; }
    if (!options.hasOwnProperty("dataType")) { options["dataType"] = 'json'; }
    if (!options.hasOwnProperty("page_limit")) { options["page_limit"] = '10'; }
    if (!options.hasOwnProperty("dropdownCssClass")) { options["dropdownCssClass"] = 'bigdrop'; }
    if (!options.hasOwnProperty("width")) { options["width"] = '100%'; }

}

function getActiveDirectoryData(data, searchTerm) {

    //ctxAdData is defined and set in common.js
    var promise = null;
    var tableProperties = { table: 'ActiveDirectoryUsers', id: 'sAMAccountName', name: 'displayName' };
    var idField = tableProperties['id'];
    var displayField = tableProperties['name'];
    data.results = [];
    ctxAdData.prepareRequest = function (r) {
        r[0].requestUri += "('*" + searchTerm + "*')";
    }
    promise = ctxAdData[tableProperties['table']]

    .forEach(function (dataItem) {
        data.results.push({
            id: dataItem[idField],
            text: dataItem[displayField] + " - " + dataItem["department"],
            username: dataItem["sAMAccountName"],
            displayname: dataItem["displayName"],
            email: dataItem["mail"],
            department: dataItem["department"],
            firstname: dataItem["givenName"],
            lastname: dataItem["sn"]
        });
    });
    return promise;
}

function addControl($divMaster, contentItem, options) {
    checkSelect2Options(options);
    var $divChild = $('<div class="dfchlsChildDiv" />');
    var $input = $("<input data-role='none' type='text'>");
    $divChild.append($input);
    $divMaster.append($divChild);
    var placeholderText = options["placeholder"];
    $input
        .select2({
            placeholder: placeholderText,
            quietMillis: options["quietMillis"],
            minimumInputLength: options["minimumInputLength"],
            page_limit: options["page_limit"],
            width: options["width"],
            query: function (query) {
                var items = [];
                getActiveDirectoryData(items, query.term)
                    .then(function () {
                        query.callback(items);
                    });
            }
        })
        .on("change", function (e) {
            contentItem.screen.findContentItem("UserName").value = e.added.username;
            contentItem.screen.findContentItem("Email").value = e.added.email;
            contentItem.screen.findContentItem("Department").value = e.added.department;
        });
    addAttributeDataRole($divMaster, 'select2-focusser select2-offscreen');
    
    
}

function addAttributeDataRole($ctrl, classToFind) {
    try {

        $ctrl.find("input[type=text]").each(function () {
            var $this = $(this);
            //select input boxes with CssClass select2-focusser.
            //These are inputs rendered by select2-Control and are 
            //used for item searching. Adding attribute "data-role=none" prevent input from being wrapped by jQuery-mobile:

            if ($this.hasClass(classToFind)) {
                $this.attr('data-role', 'none');
            }
        });

    } catch (e) {
        console.log(e.message + "; description:" + e.description);
    }

}



