using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Newsletters;
using Sabio.Models.Requests.NewsletterRequests;
using Sabio.Services;
using Sabio.Services.Interfaces.Newsletters;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers.NewsletterController
{
    [Route("api/newsletter")]
    [ApiController]
    public class NewsletterApiController : BaseApiController
    {
        #region -- Service/Authentication --
        private INewsletterService _service = null;
        private IAuthenticationService<int> _authService = null;
        public NewsletterApiController(INewsletterService service
            , ILogger<NewsletterApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        } 
        #endregion

        #region -- Post/Create --
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(NewsletterAddRequest model)
        {
            ObjectResult result = null;

            try
            {

                int id = _service.Add(model);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());

                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }
        #endregion

        #region -- Put/Update --
        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(NewsletterUpdateRequest model)
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
        #endregion

        #region -- Get By Id --
        [HttpGet("{id:int}")]
        public ActionResult<ItemsResponse<Newsletter>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<Newsletter> newsletter = _service.GetById(id);
                if (newsletter == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not Found");
                }
                else
                {
                    response = new ItemsResponse<Newsletter>() { Items = newsletter };
                }
            }
            catch (Exception ex)
            {

                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        #endregion

        #region -- Get Paginated List --
        [HttpGet("paginate")]
        public ActionResult<ItemsResponse<Newsletter>> Pagination(int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Newsletter> pagedList = _service.Pagination(pageIndex, pageSize);
                if (pagedList == null)
                {
                    result = NotFound404(new ErrorResponse("Record Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Newsletter>> response = new ItemResponse<Paged<Newsletter>>();
                    response.Item = pagedList;
                    result = StatusCode(200, response);
                }
            }
            catch (Exception ex)
            {

                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }
        #endregion

        #region -- Get Searched List --
        [HttpGet("search")]
        public ActionResult<ItemResponse<Newsletter>> Search(string query, int pageIndex, int pageSize)
        {
            ActionResult result = null;
            try
            {
                Paged<Newsletter> paged = _service.Search(query, pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Record not found"));
                }
                else
                {
                    ItemResponse<Paged<Newsletter>> response = new ItemResponse<Paged<Newsletter>>();
                    response.Item = paged;
                    result = StatusCode(200, response);
                }
            }
            catch (Exception ex)
            {

                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        } 
        #endregion

        #region -- Delete By Id --
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteById(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {

                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        } 
        #endregion
    }
}
