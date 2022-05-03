using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Requests.NewsletterSubsctiption;
using Sabio.Services.Newsletters;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers.NewsletterController
{
    [Route("api/newsletter/subs")]
    [ApiController]
    public class NewsletterSubApiController : ControllerBase
    {
        private INewslettersSubscriptionService _service = null;

        public NewsletterSubApiController(INewslettersSubscriptionService service)
        {
            _service = service;
        }
        [HttpPut]
        public ActionResult<SuccessResponse> Update(NewsletterSubscriptionAddRequest model)
        {
            int code = 200;

            BaseResponse response = null;

            try
            {
                _service.Update(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}
