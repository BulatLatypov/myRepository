define("NavAgreement1Page", ["NavAgreementNameEdit"], function() { //
	return {
		entitySchemaName: "NavAgreement",
		attributes: {
	
			"IsVisibleNavCredit": {
 				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
 				value: false
			},
			"OnChangedNavAutoandNavContact":{
				"dependencies" : [
					{
					"columns": ["NavContact", "NavAuto"],
					"methodName": "isVisibleNavCredit"
					} 
				]
			},
			"OnSelectedAuto":{
				"dependencies" : [
					{
					"columns": ["NavAuto"],
					"methodName": "setNavSumma"
					} 
				]
			},
			"OnSelectedCredit":{
				"dependencies" : [
					{
					"columns": ["NavCredit"],
					"methodName": "isSelectedNavCredit"
					} 
				]
			},
			"NavCredit":{
				"lookupListConfig":{
					"columns": ["NavCreditPeriod", "NavDateStart", "NavDateEnd", "NavPercent"]
				}
			},
			"NavAuto":{
				"lookupListConfig":{
					"columns": ["NavAmount", "NavUsed", "NavModel.NavRecommendedAmount"]
				}
			},
			
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "NavAgreementFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "NavAgreement"
				}
			},
			"NavSchema65084d83Detail64b14a49": {
				"schemaName": "NavSchema65084d83Detail",
				"entitySchemaName": "NavInvoice",
				"filter": {
					"detailColumn": "NavAgreement",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		methods: {
			isVisibleNavCredit: function(){
				var auto = this.$NavAuto?.value;
				var contact = this.$NavContact?.value;
				if(auto && contact){
					this.set("IsVisibleNavCredit", true);
				}
			},
			
			isSelectedNavCredit: function(){
				
				this.$NavCreditPeriod = this.$NavCredit["NavCreditPeriod"];
				
			},
			
			setNavSumma: function(){
				if(this.$NavAuto?.value){
					if(this.$NavAuto["NavUsed"]){
						this.$NavSumma = this.$NavAuto["NavAmount"];
					}
					else{
						this.$NavSumma = this.$NavAuto["NavModel.NavRecommendedAmount"];
					}
				}
			},
			
			onRecalculateCredit: function(){
				if(this.$NavCredit?.value){
					this.$NavCreditAmount = this.$NavSumma - this.$NavInitialFee;
					this.$NavFullCreditAmount = (this.$NavCredit["NavPercent"]/100 * this.$NavCreditPeriod * this.$NavCreditAmount) + this.$NavCreditAmount;
				}
			},
			
			save: function(){
				if(this.$NavCredit["NavDateEnd"] < this.$NavDate){
					this.showInformationDialog("Дата договора не может быть позже даты завершения кредита");
				}
				else{
					this.callParent(arguments);
				}
			},
			
			onEntityInitialized: function(){
				this.callParent(arguments);
				if(this.$NavAuto?.value && this.$NavContact?.value){
					this.set("IsVisibleNavCredit", true);
				}	
			}

		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Tab620f0c6fTabLabel": {
				"11c82ca3-cd53-4827-91fc-0c174c72b820": {
					"uId": "11c82ca3-cd53-4827-91fc-0c174c72b820",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "NavCredit"
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "ActionButtonsContainer",
				"propertyName": "items",
				"name": "RecalculateCredit",
				"values": {
					itemType: Terrasoft.ViewItemType.BUTTON,
					caption: "Пересчитать кредит",
					click: {bindTo: "onRecalculateCredit"},
					"layout":{
						"column": 1,
						"row": 6,
						"colSpan": 1,
					}
				}
			},
			{
				"operation": "insert",
				"name": "NavAutoba8feac5-8995-452f-8d11-47da9fc861e1",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavAuto"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavDate2fa47c28-46d5-4663-a6ed-e265d9d6a8e3",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavDate"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NavContact7732e5bd-7685-4d8e-a5a6-832e2a826e54",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavContact",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NavName8264130f-d797-4d11-9caf-ec79e9c37e3e",
				"values": {
					"className": "Terrasoft.NavAgreementNameEdit",
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NavSumma9040164e-a3a4-4cbf-add8-7f5ac8138b46",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavSumma"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NavCredit73d58804-e55c-4c07-8637-565627b127d4",
				"values": {
					"visible": {
						"bindTo": "IsVisibleNavCredit"
					},
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavCredit"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NavInvoice",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NavInvoiceTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavSchema65084d83Detail64b14a49",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "NavInvoice",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab620f0c6fTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab620f0c6fTabLabelTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab620f0c6fTabLabelGroup81d2aad9",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab620f0c6fTabLabelGroup81d2aad9GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab620f0c6fTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab620f0c6fTabLabelGridLayoute90a2b4e",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab620f0c6fTabLabelGroup81d2aad9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavCreditPeriodaf90449f-2f46-4876-82f9-1c8dfccee948",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab620f0c6fTabLabelGridLayoute90a2b4e"
					},
					"bindTo": "NavCreditPeriod"
				},
				"parentName": "Tab620f0c6fTabLabelGridLayoute90a2b4e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavCreditAmount38cff3ae-51a3-46be-b7c3-4b8da40ad80a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab620f0c6fTabLabelGridLayoute90a2b4e"
					},
					"bindTo": "NavCreditAmount"
				},
				"parentName": "Tab620f0c6fTabLabelGridLayoute90a2b4e",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NavFullCreditAmountec334bdc-5321-4d84-9f31-3f7c3d013af4",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab620f0c6fTabLabelGridLayoute90a2b4e"
					},
					"bindTo": "NavFullCreditAmount"
				},
				"parentName": "Tab620f0c6fTabLabelGridLayoute90a2b4e",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NavInitialFee47ef6f40-f530-489e-a7e9-49dcae334cc7",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Tab620f0c6fTabLabelGridLayoute90a2b4e"
					},
					"bindTo": "NavInitialFee"
				},
				"parentName": "Tab620f0c6fTabLabelGridLayoute90a2b4e",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NavFactSummae89312ae-1c5e-49be-bddc-85703ae367dd",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Tab620f0c6fTabLabelGridLayoute90a2b4e"
					},
					"bindTo": "NavFactSumma"
				},
				"parentName": "Tab620f0c6fTabLabelGridLayoute90a2b4e",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NavPaymentPlanDate1ac73f3e-435c-4fcb-b5c5-d72552d70122",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "Tab620f0c6fTabLabelGridLayoute90a2b4e"
					},
					"bindTo": "NavPaymentPlanDate"
				},
				"parentName": "Tab620f0c6fTabLabelGridLayoute90a2b4e",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 2
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "NavNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/
	};
});
