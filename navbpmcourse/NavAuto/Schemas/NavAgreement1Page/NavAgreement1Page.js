define("NavAgreement1Page", [], function() {
	return {
		entitySchemaName: "NavAgreement",
		attributes: {},
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
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Name3dd29787-feb0-4793-81ec-c37b3d728576",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "Name"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavAutoba8feac5-8995-452f-8d11-47da9fc861e1",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavAuto"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NavDate2fa47c28-46d5-4663-a6ed-e265d9d6a8e3",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavDate"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NavContact7732e5bd-7685-4d8e-a5a6-832e2a826e54",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavContact"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NavName8264130f-d797-4d11-9caf-ec79e9c37e3e",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NavSumma9040164e-a3a4-4cbf-add8-7f5ac8138b46",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "NavSumma"
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
				"name": "NavCredit",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NavCreditTabCaption"
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
				"name": "NavCreditGroupa28dd508",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NavCreditGroupa28dd508GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "NavCredit",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavCreditGridLayoutc83c584e",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "NavCreditGroupa28dd508",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavCreditPeriod58890127-6b37-424d-85cb-c7af0ce4d726",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "NavCreditGridLayoutc83c584e"
					},
					"bindTo": "NavCreditPeriod"
				},
				"parentName": "NavCreditGridLayoutc83c584e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NavFactSummae933e870-b20a-4d45-8321-68feb99eb8a5",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "NavCreditGridLayoutc83c584e"
					},
					"bindTo": "NavFactSumma"
				},
				"parentName": "NavCreditGridLayoutc83c584e",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "NavCreditAmountc061fa96-996e-4355-8e15-859a0edfd62f",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "NavCreditGridLayoutc83c584e"
					},
					"bindTo": "NavCreditAmount"
				},
				"parentName": "NavCreditGridLayoutc83c584e",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "NavInitialFeed6e97c00-fff0-4a04-a824-f4aa227f789a",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "NavCreditGridLayoutc83c584e"
					},
					"bindTo": "NavInitialFee"
				},
				"parentName": "NavCreditGridLayoutc83c584e",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NavFullCreditAmount7f5d8856-3e02-4661-b68b-0c8358a4428c",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "NavCreditGridLayoutc83c584e"
					},
					"bindTo": "NavFullCreditAmount"
				},
				"parentName": "NavCreditGridLayoutc83c584e",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "NavPaymentPlanDate6e8cc47c-1b6c-4277-b37c-2a497a8e054d",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "NavCreditGridLayoutc83c584e"
					},
					"bindTo": "NavPaymentPlanDate"
				},
				"parentName": "NavCreditGridLayoutc83c584e",
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
