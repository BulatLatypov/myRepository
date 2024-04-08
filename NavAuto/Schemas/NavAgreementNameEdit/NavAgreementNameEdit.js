define("NavAgreementNameEdit", [], function (){
	Ext.define("Terrasoft.controls.NavAgreementNameEdit", {
		extend: "Terrasoft.controls.BaseEdit",
		alternateClassName: "Terrasoft.NavAgreementNameEdit",
		onBlur: function(){
			this.callParent(arguments);
			var NavName = this.getValue();
			this.setValue(NavName.replace(/[^0-9-]/g, ''));
		},
		
	});	
	
	
	
});