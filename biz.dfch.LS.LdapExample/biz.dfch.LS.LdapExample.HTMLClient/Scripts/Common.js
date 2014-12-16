var svcAdUrl = msls.application.rootUri + "/utilities.svc/$metadata";
var ctxAdData = "42";
$(document).ready(function () {
    msls.application.options.showContentBehindDialog = false;
    msls.application.options.disableUrlScreenParameters = false;


    $data.initService(svcAdUrl)
        .then(function (context) {
            ctxAdData = context;
        });
});