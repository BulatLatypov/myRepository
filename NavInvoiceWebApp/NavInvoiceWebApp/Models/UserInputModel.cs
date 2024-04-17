using System.ComponentModel.DataAnnotations;

namespace NavInvoiceWebApp.Models
{
    public class UserInputModel
    {
        [Required]
        public string NavAgreementName { get; set; }

        [Required]
        public decimal NavInvoiceSumma { get; set; }
    }
}
