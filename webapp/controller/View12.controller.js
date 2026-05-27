sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";


    return Controller.extend("fragment.controller.View12", {

        onInit: function () {
            var oData = {
                selectedDepartment: "All",

                departments: [
                    { key: "All", text: "All Departments" },
                    { key: "SAP", text: "SAP" },
                    { key: "UI5", text: "UI5" },
                    { key: "ABAP", text: "ABAP" },
                    { key: "Java", text: "Java" },
                    { key: "Testing", text: "Testing" },
                    { key: "HR", text: "HR" }
                ],

                employees: [
                    { EmpId: "E001", Name: "Sravani", Department: "SAP", Salary: 45000, LeaveStatus: "Approved", Month: "Jan" },
                    { EmpId: "E002", Name: "Meghana", Department: "UI5", Salary: 52000, LeaveStatus: "Pending", Month: "Jan" },
                    { EmpId: "E003", Name: "Rahul", Department: "ABAP", Salary: 48000, LeaveStatus: "Rejected", Month: "Feb" },
                    { EmpId: "E004", Name: "Anil", Department: "Java", Salary: 40000, LeaveStatus: "Approved", Month: "Feb" },
                    { EmpId: "E005", Name: "Divya", Department: "Testing", Salary: 35000, LeaveStatus: "Pending", Month: "Mar" },
                    { EmpId: "E006", Name: "Kiran", Department: "SAP", Salary: 60000, LeaveStatus: "Approved", Month: "Mar" },
                    { EmpId: "E007", Name: "Sunny", Department: "UI5", Salary: 55000, LeaveStatus: "Approved", Month: "Apr" },
                    { EmpId: "E008", Name: "Charan", Department: "ABAP", Salary: 47000, LeaveStatus: "Rejected", Month: "Apr" },
                    { EmpId: "E009", Name: "Swamy", Department: "HR", Salary: 30000, LeaveStatus: "Pending", Month: "May" },
                    { EmpId: "E010", Name: "Bing", Department: "Java", Salary: 42000, LeaveStatus: "Approved", Month: "May" },
                    { EmpId: "E011", Name: "Aditya", Department: "Testing", Salary: 38000, LeaveStatus: "Approved", Month: "Jun" },
                    { EmpId: "E012", Name: "Henry", Department: "SAP", Salary: 62000, LeaveStatus: "Pending", Month: "Jun" }
                ],

                deptChart: [],
                leaveChart: [],
                salaryChart: [],
                filteredEmployees: []
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "dashboardModel");

            this._prepareDashboardData("All");
            this._setChartProperties();
        },

        onDepartmentChange: function (oEvent) {
            var sDepartment = oEvent.getSource().getSelectedKey();
            this._prepareDashboardData(sDepartment);
        },

        onReset: function () {
            var oModel = this.getView().getModel("dashboardModel");
            oModel.setProperty("/selectedDepartment", "All");
            this._prepareDashboardData("All");
        },

        _prepareDashboardData: function (sDepartment) {
            var oModel = this.getView().getModel("dashboardModel");
            var aEmployees = oModel.getProperty("/employees");

            var aFilteredEmployees = [];

            if (sDepartment === "All") {
                aFilteredEmployees = aEmployees;
            } else {
                aFilteredEmployees = aEmployees.filter(function (emp) {
                    return emp.Department === sDepartment;
                });
            }

            oModel.setProperty("/filteredEmployees", aFilteredEmployees);
            oModel.setProperty("/deptChart", this._getDepartmentCount(aFilteredEmployees));
            oModel.setProperty("/leaveChart", this._getLeaveStatusCount(aFilteredEmployees));
            oModel.setProperty("/salaryChart", this._getMonthlySalary(aFilteredEmployees));
        },

        _getDepartmentCount: function (aEmployees) {
            var oResult = {};

            aEmployees.forEach(function (emp) {
                oResult[emp.Department] = (oResult[emp.Department] || 0) + 1;
            });

            return Object.keys(oResult).map(function (sDept) {
                return {
                    Department: sDept,
                    Count: oResult[sDept]
                };
            });
        },

        _getLeaveStatusCount: function (aEmployees) {
            var oResult = {};

            aEmployees.forEach(function (emp) {
                oResult[emp.LeaveStatus] = (oResult[emp.LeaveStatus] || 0) + 1;
            });

            return Object.keys(oResult).map(function (sStatus) {
                return {
                    Status: sStatus,
                    Count: oResult[sStatus]
                };
            });
        },

        _getMonthlySalary: function (aEmployees) {
            var oResult = {};

            aEmployees.forEach(function (emp) {
                oResult[emp.Month] = (oResult[emp.Month] || 0) + emp.Salary;
            });

            var aMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

            return aMonths.map(function (sMonth) {
                return {
                    Month: sMonth,
                    Salary: oResult[sMonth] || 0
                };
            });
        },

        _setChartProperties: function () {
            this.byId("idDeptChart").setVizProperties({
                title: { visible: false },
                plotArea: {
                    dataLabel: { visible: true }
                }
            });

            this.byId("idLeaveChart").setVizProperties({
                title: { visible: false },
                plotArea: {
                    dataLabel: { visible: true }
                }
            });

            this.byId("idSalaryChart").setVizProperties({
                title: { visible: false },
                plotArea: {
                    dataLabel: { visible: true }
                }
            });
        }

    });
});