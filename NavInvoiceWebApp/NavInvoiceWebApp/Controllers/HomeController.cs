using Microsoft.AspNetCore.Mvc;
using NavInvoiceWebApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Xml;
using System.Xml.Linq;

namespace NavInvoiceWebApplication.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(UserInputModel userInputModel) 
        {
            var authCookies = await NavActions.GetAuthenticationCookiesAsync();
            if (authCookies != null) 
            {
                var BPMCSRF = authCookies.ElementAt(2).Replace("BPMCSRF=", "").Replace("; path=/", "");
                var ASPXAUTH = authCookies.ElementAt(1);
                var agreementID = await NavActions.GetAgreementIdAsync(BPMCSRF, ASPXAUTH, userInputModel.NavAgreementName);
                if (agreementID != "")
                {
                    bool isCreated = await NavActions.CreateInvoiceAsync(BPMCSRF, ASPXAUTH, agreementID, userInputModel.NavInvoiceSumma);
                    if (isCreated)
                    {
                        return View();
                    }
                    else
                    {
                        ModelState.AddModelError(nameof(userInputModel.NavInvoiceSumma), "Не удалось создать счет для данного договора с указанной суммой");
                        return View(userInputModel);

                    }
                }
                else
                {
                    ModelState.AddModelError(nameof(userInputModel.NavAgreementName), "Такого договора не существует");
                    return View(userInputModel);
                }
            }
            
            return View(); 
        }

    }

    
}
