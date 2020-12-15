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
       
        [Route("{courseCode}")]
        [HttpPost]
        //Tar sökinput från frontend
        public string GetSearchInput(string courseCode)
        {
            if (string.IsNullOrEmpty(courseCode))
            {
                throw new ArgumentException($"'{nameof(courseCode)}' cannot be null or empty", nameof(courseCode));
            }

            return GetSearchCourse(courseCode);
        }

        //Bygger sök-url efter kurskod
        public string GetSearchCourse(string courseCode)
        {
            //pepeHacker
            string sourceUrl = "https://cloud.timeedit.net/ltu/web/schedule1/objects.txt?max=15&fr=t&partajax=t&im=f&sid=3&l=sv_SE&search_text=course&types=28";

            var searchUrl = sourceUrl.Replace("course", courseCode);

            return "";
        }

        public string GetObjectIdByCourseCode(string courseCode)
        {
            return "";
        }

    }
}

