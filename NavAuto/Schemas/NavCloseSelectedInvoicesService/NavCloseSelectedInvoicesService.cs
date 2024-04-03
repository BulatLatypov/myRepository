namespace Terrasoft.Configuration.NavCloseSelectedInvoicesServiceNamespace
{
using System;
	using System.ServiceModel;
	using System.ServiceModel.Web;
	using System.ServiceModel.Activation;
	using Terrasoft.Core;
	using Terrasoft.Web.Common;
	using Terrasoft.Core.Entities;
	using System.Collections.Generic;
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class NavCloseSelectedInvoicesService: BaseService
	{
		// Метод, закрывающий выбранные счета по id 
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json)]
		public void NavCloseSelectedInvoices(List<string> SelectedItems) 
		{
			if(SelectedItems != null)
			{
				var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, nameof(NavInvoice));
				var Id = esq.AddColumn("Id");
				var NavFact = esq.AddColumn("NavFact");
				esq.AddAllSchemaColumns();
				var esqFilter = esq.CreateFilterWithParameters(FilterComparisonType.Equal, "Id", SelectedItems.ToArray());

				esq.Filters.Add(esqFilter);

				var entities = esq.GetEntityCollection(UserConnection);
				if (entities.Count > 0)
				{
					foreach(var entity in entities)
					{
						entity.SetColumnValue(NavFact.Name, true);
						entity.Save();				
					}			
				}
			}
		}
	}
}
