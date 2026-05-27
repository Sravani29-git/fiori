sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("fragment.controller.View14", {

        onInit: function () {

            var oFormData = {
                empId: "",
                empName: "",
                department: "",
                project: "",
                projectText: "",
                skills: [],
                location: "",
                shift: "",
                shiftText: "",
                certifications: [],
                status: "ACTIVE",
                remarks: ""
            };

            var oUIData = {
                editable: true,
                skillsCountText: "0 Skills Selected"
            };

            var oData = {
                departments: [
                    { key: "", text: "-- Select Department --" },
                    { key: "SAP", text: "SAP" },
                    { key: "AIML", text: "AI/ML" },
                    { key: "CLOUD", text: "Cloud" },
                    { key: "TESTING", text: "Testing" },
                    { key: "UI5", text: "UI5/Fiori" },
                    { key: "ABAP", text: "ABAP" }
                ],

                allProjects: [
                    { key: "S4", text: "S4 Migration", department: "SAP" },
                    { key: "FIORI", text: "Fiori Upgrade", department: "UI5" },
                    { key: "CHATBOT", text: "AI Chatbot", department: "AIML" },
                    { key: "INVOICE", text: "Invoice Automation", department: "SAP" },
                    { key: "BTP", text: "BTP Integration", department: "CLOUD" },
                    { key: "DASHBOARD", text: "Analytics Dashboard", department: "UI5" },
                    { key: "TESTAUTO", text: "Testing Automation", department: "TESTING" },
                    { key: "RICEF", text: "RICEF Development", department: "ABAP" }
                ],

                filteredProjects: [],

                skills: [
                    { key: "JS", text: "JavaScript" },
                    { key: "UI5", text: "SAPUI5" },
                    { key: "ABAP", text: "ABAP" },
                    { key: "PYTHON", text: "Python" },
                    { key: "ODATA", text: "OData" },
                    { key: "BTP", text: "BTP" },
                    { key: "CAPM", text: "CAPM" },
                    { key: "HANA", text: "HANA" },
                    { key: "CSS", text: "CSS" },
                    { key: "HTML", text: "HTML" }
                ],

                locations: [
                    { key: "", text: "-- Select Location --" },
                    { key: "HYD", text: "Hyderabad" },
                    { key: "BLR", text: "Bangalore" },
                    { key: "PUNE", text: "Pune" },
                    { key: "CHN", text: "Chennai" },
                    { key: "REMOTE", text: "Remote" }
                ],

                shifts: [
                    { key: "MORNING", text: "Morning" },
                    { key: "GENERAL", text: "General" },
                    { key: "NIGHT", text: "Night" },
                    { key: "FLEXIBLE", text: "Flexible" }
                ],

                certifications: [
                    { key: "AWS", text: "AWS" },
                    { key: "AZURE", text: "Azure" },
                    { key: "SAPCERT", text: "SAP Certified" },
                    { key: "GCP", text: "Google Cloud" },
                    { key: "AI", text: "AI Associate" },
                    { key: "SCRUM", text: "Scrum Master" }
                ],

                statusList: [
                    { key: "ACTIVE", text: "Active" },
                    { key: "INACTIVE", text: "Inactive" },
                    { key: "BENCH", text: "Bench" }
                ]
            };

            this.getView().setModel(new JSONModel(oFormData), "formModel");
            this.getView().setModel(new JSONModel(oUIData), "uiModel");
            this.getView().setModel(new JSONModel(oData), "dataModel");
        },

        onDepartmentChange: function () {
            var oFormModel = this.getView().getModel("formModel");
            var oDataModel = this.getView().getModel("dataModel");

            var sDepartment = oFormModel.getProperty("/department");
            var aAllProjects = oDataModel.getProperty("/allProjects");

            var aFilteredProjects = aAllProjects.filter(function (oProject) {
                return oProject.department === sDepartment;
            });

            oDataModel.setProperty("/filteredProjects", aFilteredProjects);

            oFormModel.setProperty("/project", "");
            oFormModel.setProperty("/projectText", "");

            MessageToast.show("Projects filtered based on Department");
        },

        onSkillsChange: function () {
            var aSkills = this.getView().getModel("formModel").getProperty("/skills");

            this.getView().getModel("uiModel").setProperty(
                "/skillsCountText",
                aSkills.length + " Skills Selected"
            );
        },

        onEditModeChange: function (oEvent) {
            var bState = oEvent.getParameter("state");

            if (bState) {
                MessageToast.show("Form is editable now");
            } else {
                MessageToast.show("Form is disabled now");
            }
        },

        onSave: function () {
            var oFormData = this.getView().getModel("formModel").getData();

            if (!oFormData.empId) {
                MessageBox.error("Please enter Employee ID");
                return;
            }

            if (!oFormData.empName) {
                MessageBox.error("Please enter Employee Name");
                return;
            }

            if (!oFormData.department) {
                MessageBox.error("Please select Department");
                return;
            }

            if (!oFormData.project && !oFormData.projectText) {
                MessageBox.error("Please select or enter Project");
                return;
            }

            var sMessage =
                "Employee ID: " + oFormData.empId + "\n" +
                "Employee Name: " + oFormData.empName + "\n" +
                "Department: " + oFormData.department + "\n" +
                "Project: " + (oFormData.projectText || oFormData.project) + "\n" +
                "Skills: " + oFormData.skills.join(", ") + "\n" +
                "Location: " + oFormData.location + "\n" +
                "Shift: " + (oFormData.shiftText || oFormData.shift) + "\n" +
                "Certifications: " + oFormData.certifications.join(", ") + "\n" +
                "Status: " + oFormData.status + "\n" +
                "Remarks: " + oFormData.remarks;

            MessageBox.success(sMessage);
        },

        onClear: function () {
            var oEmptyData = {
                empId: "",
                empName: "",
                department: "",
                project: "",
                projectText: "",
                skills: [],
                location: "",
                shift: "",
                shiftText: "",
                certifications: [],
                status: "ACTIVE",
                remarks: ""
            };

            this.getView().getModel("formModel").setData(oEmptyData);
            this.getView().getModel("dataModel").setProperty("/filteredProjects", []);
            this.getView().getModel("uiModel").setProperty("/skillsCountText", "0 Skills Selected");

            MessageToast.show("Form cleared");
        }

    });
});