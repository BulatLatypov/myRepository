 namespace Terrasoft.Configuration
{
    using System;
    using Terrasoft.Common;
    using Terrasoft.Configuration.Dev.Pkg.NavAuto.Schemas.NavCloseSelectedInvoicesService;
    using Terrasoft.Configuration.RightsService;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Entities.Events;
	using SystemSettings = Terrasoft.Core.Configuration.SysSettings;


	/// <summary>
	/// Переопределенные методы для событий в сущности "счет"
	/// </summary>
	[EntityEventListener(SchemaName = "NavInvoice")]
	public class NavInvoiceEventListener : BaseEntityEventListener
	{
		public override void OnSaving(object sender, EntityBeforeEventArgs e) 
		{
			var entity = (Entity) sender;
			var invoice = (NavInvoice)entity;

			if(invoice.NavInvoiceTypeId == Guid.Empty){
				invoice.NavInvoiceTypeId = NavInvoiceConstants.manualCreating;
			}				
			base.OnSaving(sender, e);
			
		}
		public override void OnInserting(object sender, EntityBeforeEventArgs e)
		{
			CheckInvoiceExisting(sender, e);
            RecalculateFactSumma(sender, e);
            base.OnInserting(sender, e);	
		}
		public override void OnUpdating(object sender, EntityBeforeEventArgs e)
		{
			CheckInvoiceExisting(sender, e);
            RecalculateFactSumma(sender, e);
            base.OnUpdating(sender, e);
		}
		public override void OnDeleting(object sender, EntityBeforeEventArgs e)
		{
            RecalculateFactSumma(sender, e);
			base.OnDeleting(sender, e);
		}

		/// <summary>
		/// Метод для пересчета оплаченной суммы при измении счетов
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		/// <exception cref="Exception"></exception>
		public static void RecalculateFactSumma(object sender, EntityBeforeEventArgs e)
		{
            var entity = (Entity)sender;
            var invoice = (NavInvoice)entity;
            var userConnection = entity.UserConnection;
            if (invoice.NavFact == true)
			{
                var agreementEsq = new EntitySchemaQuery(userConnection.EntitySchemaManager, nameof(NavAgreement));
                agreementEsq.AddAllSchemaColumns();
                var agreementEntity  = agreementEsq.GetEntity(userConnection, invoice.NavAgreementId);
                decimal agreementSumma = agreementEntity.GetTypedColumnValue<decimal>("NavSumma");

                var invoiceEsq = new EntitySchemaQuery(userConnection.EntitySchemaManager, nameof(NavInvoice));
                invoiceEsq.AddAllSchemaColumns();
                var esqFilter = invoiceEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavAgreement.Id", invoice.NavAgreementId);
                invoiceEsq.Filters.Add(esqFilter);
                var invoiceEntities = invoiceEsq.GetEntityCollection(userConnection);
				decimal FactSumma = 0;

                

                foreach (var invoiceEntity in invoiceEntities)
				{
					FactSumma += invoiceEntity.GetTypedColumnValue<decimal>("NavAmount");
				}

				if(FactSumma > agreementSumma)
				{
					throw new Exception("Общая сумма оплаченных счетов превышает сумму договора");
				}
				else
				{
                    if (FactSumma == agreementSumma)
                    {
                        agreementEntity.SetColumnValue("NavFact", true);
                    }
                    agreementEntity.SetColumnValue("NavFactSumma", FactSumma);
					invoice.SetColumnValue("NavPayDate", DateTime.Now.Date);
                    agreementEntity.Save();
                }
				
            }
        }

		/// <summary>
		/// Метод для проверки дублирования счетов 
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="e"></param>
		/// <exception cref="Exception"></exception>
        public static void CheckInvoiceExisting(object sender, EntityBeforeEventArgs e)
        {
            var entity = (Entity)sender;
            var invoice = (NavInvoice)entity;
            var userConnection = entity.UserConnection;
            var invoiceEsq = new EntitySchemaQuery(userConnection.EntitySchemaManager, nameof(NavInvoice));
            invoiceEsq.AddAllSchemaColumns();
            var EsqDateFilter = invoiceEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavAgreement.Id", invoice.NavAgreementId);
            var EsqAgreementFilter = invoiceEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "NavDate", invoice.NavDate);

            invoiceEsq.Filters.Add(EsqDateFilter);
            invoiceEsq.Filters.Add(EsqAgreementFilter);
            var invoiceEntities = invoiceEsq.GetEntityCollection(userConnection);
            if (invoiceEntities.Count > 1)
            {
				throw new Exception("Счет для данного договора с такой датой уже существует");
            }
        }
    }
	
	

	
}