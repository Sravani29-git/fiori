sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fragment.controller.View4",  {

       onInit: function () {

            var oData = {
                name: "Sravani",
                date: "2026-04-24",
                time: "14:30:00",
                dateTime: "2026-04-24T14:30:00",
                salary: 50000,
                currency: "INR",
                rating: 4.5
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "empModel");
        }

    });
});