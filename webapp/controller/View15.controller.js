sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fragment.controller.View15", {

        onInit: function () {
            var oData = {
                employees: [
                    {
                        empId: "E001",
                        name: "Sravani",
                        department: "SAP UI5",
                        salary: 45000
                    },
                    {
                        empId: "E002",
                        name: "Meghana",
                        department: "ABAP",
                        salary: 50000
                    },
                    {
                        empId: "E003",
                        name: "Rahul",
                        department: "OData",
                        salary: 55000
                    }
                ]
            };

            this.getView().setModel(new JSONModel(oData), "empModel");
        },

        onEmployeePress: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");

            var oContext = oItem.getBindingContext("empModel");

            var sEmpId = oContext.getProperty("empId");

            this.getOwnerComponent().getRouter().navTo("RouteView16", {
                empId: sEmpId
            });
        }

    });
});