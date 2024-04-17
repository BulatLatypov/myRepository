namespace NavInvoiceWebApplication
{
    public class NavInvoice(string Name, string date, string AgreementId, decimal Amount)
    {
        public string NavName { get; set; } = Name;
        public string NavDate { get; set; } = date;
        public string NavPayDate { get; set; } = date;
        public string NavAgreementId { get; set; } = AgreementId;
        public decimal NavSumma { get; set; } = Amount;
    }
}
