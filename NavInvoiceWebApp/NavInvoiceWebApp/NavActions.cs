using Newtonsoft.Json;
using System.Diagnostics;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml;
using System.Xml.Linq;

namespace NavInvoiceWebApplication
{
    public static class NavActions
    {
        /// <summary>
        /// Получение куки для аутентификации 
        /// </summary>
        /// <returns></returns>
        public static async Task<IEnumerable<string>> GetAuthenticationCookiesAsync()
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost:99/ServiceModel/AuthService.svc/Login ");
            request.Headers.Add("ForceUseSession", "true");
            var content = new StringContent("{  \r\n  \"UserName\":\"Supervisor\",\r\n  \"UserPassword\":\"Supervisor\"\r\n}", null, "application/json");
            request.Content = content;
            var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var headers = response.Headers;
            var setCookieHeaders = headers.GetValues("Set-Cookie");

            return setCookieHeaders;
        }

        /// <summary>
        /// Метод для получения Id договора по его имени
        /// </summary>
        /// <param name="BPMCSRF"></param>
        /// <param name="ASPXAUTH"></param>
        /// <param name="agreementNavName"></param>
        /// <returns></returns>
        public static async Task<string> GetAgreementIdAsync(string BPMCSRF, string ASPXAUTH, string agreementNavName)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:99/0/odata/navagreement?$filter=navname eq '" + agreementNavName + "'");
            request.Headers.Add("ForceUseSession", "true");
            request.Headers.Add("BPMCSRF", BPMCSRF);
            request.Headers.Add("Cookie", ASPXAUTH);
            var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            var responseBody = await response.Content.ReadAsStringAsync();
            
            
            dynamic agreement = JsonConvert.DeserializeObject(responseBody);
            if (agreement.value.Count > 0)
                return agreement.value[0].Id.ToString();
            else
                return "";
        }

        /// <summary>
        /// Метод для создания нового счета
        /// </summary>
        /// <param name="BPMCSRF"></param>
        /// <param name="ASPXAUTH"></param>
        /// <param name="NavAgreementId"></param>
        /// <param name="summa"></param>
        /// <returns></returns>
        public static async Task<bool> CreateInvoiceAsync(string BPMCSRF, string ASPXAUTH, string NavAgreementId, decimal summa)
        {
            string date = DateTime.Now.ToString("yyyy-MM-dd");
            string invoiceName = "Счет от " + DateTime.Now.ToString("dd.MM.yyyy");
            
            NavInvoice invoice = new NavInvoice(invoiceName, date, NavAgreementId, summa);
            string invoiceDataJson = JsonConvert.SerializeObject(invoice);
            
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost:99/0/odata/navinvoice");
            request.Headers.Add("ForceUseSession", "true");
            request.Headers.Add("BPMCSRF", BPMCSRF);
            request.Headers.Add("Cookie", ASPXAUTH);
            var content = new StringContent(invoiceDataJson, null, "application/json");
            request.Content = content;
            var response = await client.SendAsync(request);
            return response.IsSuccessStatusCode;
            
        }
    }   
      
}


