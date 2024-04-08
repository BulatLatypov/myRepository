 namespace Terrasoft.Configuration
{
	using System;
	using Terrasoft.Common;
	using Terrasoft.Configuration.RightsService;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Entities.Events;
	using SystemSettings = Terrasoft.Core.Configuration.SysSettings;


    /// <summary>
    /// Переопределенные методы для событий в сущности "договор"
    /// </summary>
    [EntityEventListener(SchemaName = "NavAgreement")]
	public class NavAgreementEventListener : BaseEntityEventListener
	{
		public override void OnSaving(object sender, EntityBeforeEventArgs e) {
			var entity = (Entity) sender;
			var agreement = (NavAgreement)entity;

            var userConnection = entity.UserConnection;
            var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, nameof(NavAgreement));
            
            var contactId = esq.AddColumn("NavContact.Id");

            esq.AddAllSchemaColumns();

            var esqFilter = esq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavContact.Id", agreement.NavContactId);
            esq.Filters.Add(esqFilter);

            var entities = esq.GetEntityCollection(userConnection);

			if(entities.Count == 1)
			{
                var contactEsq = new EntitySchemaQuery(userConnection.EntitySchemaManager, nameof(Contact));
                var contactNavDate = contactEsq.AddColumn("NavDate");
                contactEsq.AddAllSchemaColumns();

				var contactEntity = contactEsq.GetEntity(userConnection, agreement.NavContactId);
				if (contactEntity != null)
				{
					contactEntity.SetColumnValue(contactNavDate.Name, agreement.NavDate);
					contactEntity.Save();
				}
            }
			
            base.OnSaving(sender, e);
			
		}
	}
}