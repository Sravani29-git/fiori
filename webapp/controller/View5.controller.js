sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "fragment/model/formatter"
], function (Controller, JSONModel, formatter) {
    "use strict";

    return Controller.extend("fragment.controller.View5", {

        formatter: formatter,

        onInit: function () {
            var oData = {
                firstName: "Sravani",
                lastName: "Ruttala",
                salary: 50000,
                rating: 4.5,
                isActive: true
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "empModel");
        }

    });
});