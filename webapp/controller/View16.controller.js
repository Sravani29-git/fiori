sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History"
], function (Controller, JSONModel, History) {
    "use strict";

    return Controller.extend("fragment.controller.View16", {

        onInit: function () {
            this.getOwnerComponent()
                .getRouter()
                .getRoute("RouteView16")
                .attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sEmpId = oEvent.getParameter("arguments").empId;

            var aEmployees = [
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
            ];

            var oSelectedEmployee = aEmployees.find(function (oEmployee) {
                return oEmployee.empId === sEmpId;
            });

            this.getView().setModel(new JSONModel(oSelectedEmployee), "detailModel");
        },

        onBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("RouteView16", {}, true);
            }
        }

    });
});