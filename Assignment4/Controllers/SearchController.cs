using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Assignment4.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]

    public class SearchController : ControllerBase
    {
        private string search;

        
        public SearchController(string search)
        {
           this.search = search;
        }


        [Route("{courseCode}")]
        [HttpGet]
        public string GetCourseCode(string courseCode)
        {
            if (string.IsNullOrEmpty(courseCode))
            {
                throw new ArgumentException($"'{nameof(courseCode)}' cannot be null or empty", nameof(courseCode));
            }

            return courseCode;
        }

    }
}
