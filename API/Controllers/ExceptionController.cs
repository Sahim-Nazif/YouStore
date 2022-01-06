
using System;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ExceptionController:BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound() 
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails{Title="This is a bad request"});
        }
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthuorized()
        {
            return NotFound();
        }
        [HttpGet("validation-error")]
        public ActionResult  GetValidationError()
        {
             ModelState.AddModelError("Problem1", "This is the first error");
              ModelState.AddModelError("Problem2", "This is the second error");
              return ValidationProblem();

        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}