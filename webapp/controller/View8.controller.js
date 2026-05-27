sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, Fragment, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("fragment.controller.View8", {

        onInit: function () {
            var oData = {
                items: [
                    {
                        itemNo: "10",
                        material: "MAT-1001",
                        description: "Cement Bags",
                        quantity: 100,
                        price: 450,
                        currency: "INR"
                    },
                    {
                        itemNo: "20",
                        material: "MAT-1002",
                        description: "Steel Rods",
                        quantity: 50,
                        price: 1200,
                        currency: "INR"
                    },
                    {
                        itemNo: "30",
                        material: "MAT-1003",
                        description: "Paint Buckets",
                        quantity: 25,
                        price: 850,
                        currency: "INR"
                    },
                    {
                        itemNo: "40",
                        material: "MAT-1004",
                        description: "Electrical Items",
                        quantity: 70,
                        price: 600,
                        currency: "INR"
                    }
                ],

                lineForm: {
                    lineItemNo: "20",
                    itemCategory: "Standard Item",
                    plant: "1000",
                    storageLocation: "0001",
                    deliveryDate: "06/20/2025",
                    netValue: "25000",
                    remarks: "Line item form data loaded from fragment"
                }
            };

            this.getView().setModel(new JSONModel(oData), "contractModel");
        },

        onLineItem1: function () {
            var oView = this.getView();

            if (!this.oTableDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "fragment.fragment.LineItemTable",
                    controller: this
                }).then(function (oDialog) {
                    this.oTableDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this.oTableDialog.open();
            }
        },

        onLineItem2: function () {
            var oView = this.getView();

            if (!this.oFormDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "fragment.fragment.LineItemForm",
                    controller: this
                }).then(function (oDialog) {
                    this.oFormDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this.oFormDialog.open();
            }
        },

        onCloseTableDialog: function () {
            this.oTableDialog.close();
        },

        onCloseFormDialog: function () {
            this.oFormDialog.close();
        },

        onSaveLineForm: function () {
            MessageToast.show("Line Item Form Saved");
            this.oFormDialog.close();
        }

    });
});