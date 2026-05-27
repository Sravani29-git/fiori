sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("fragment.controller.View9", {

        onInit: function () {
            var oModel = new JSONModel({
                items: [
                    this._total("20.00 USD"),
                    this._row("DFAM", "8000000007-00001", "25.00 USD", "12 EA", "Processed", "9000029280-002", "", "", "GF180002", "1343", "409458-001"),
                    this._total("25.00 USD"),
                    this._row("DFAM", "8000000008-00001", "2.08 USD", "1 EA", "Processed", "9000029280-002", "", "", "GF180002", "1343", "409459-001"),
                    this._total("2.08 USD"),
                    this._row("DFAM", "8000000009-00001", "1,200.00 USD", "4 EA", "Processed", "9000039588-001", "", "", "GF180002", "1343", "409460-001"),
                    this._total("1,200.00 USD"),
                    this._row("Vientiane, Lao Peo", "8000000010-00001", "150.00 USD", "1 EA", "Processed", "9000039589-001", "", "", "SC229906", "612", "409461-001"),
                    this._total("150.00 USD"),
                    this._row("Vientiane, Lao Peo", "8000000013-00001", "250.00 USD", "2 EA", "Processed", "9000039589-002", "", "", "SC240078", "63", "409462-001"),
                    this._total("250.00 USD", "", "100.00 USD"),
                    this._row("Vientiane, Lao Peo", "8000000016-00001", "350.00 USD", "3 EA", "Accepted", "9000039591-001", "", "", "SC240078", "45", "409465-001"),
this._total("350.00 USD"),

this._row("DFAM", "8000000017-00001", "450.00 USD", "4 EA", "Rejected", "9000039591-002", "", "", "GF180002", "30", "409466-001"),
this._total("450.00 USD"),
this._row("Vientiane, Lao Peo", "8000000016-00001", "350.00 USD", "3 EA", "Accepted", "9000039591-001", "", "", "SC240078", "45", "409465-001"),
this._total("350.00 USD"),

this._row("DFAM", "8000000017-00001", "450.00 USD", "4 EA", "Rejected", "9000039591-002", "", "", "GF180002", "30", "409466-001"),
this._total("450.00 USD")
                ]
            });

            this.getView().setModel(oModel, "chargeBackModel");
        },

        _row: function (office, order, amount, quantity, status, dfr, prq, po, grant, days, funds) {
            return {
                office: office,
                order: order,
                orderItemAmount: amount,
                orderQuantity: quantity,
                status: status,
                dfr: dfr,
                prqDifference: prq,
                poDifference: po,
                grant: grant,
                grantExpDays: days,
                fundsCommitment: funds,
                isTotal: false
            };
        },

        _total: function (amount, prq, po) {
            return {
                office: "",
                order: "Total Order Item Amount",
                orderItemAmount: amount,
                orderQuantity: "",
                status: "",
                dfr: "",
                prqDifference: prq || "",
                poDifference: po || "",
                grant: "",
                grantExpDays: "",
                fundsCommitment: "",
                isTotal: true
            };
        }

    });
});