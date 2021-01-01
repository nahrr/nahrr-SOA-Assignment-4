using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Assignment4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostToCanvasController : ControllerBase
    {
   
        [Route("{title}/{date}/{startTime}/{endTime}/{comment}")]
        [HttpGet]
        //Lite kladd, men det fungerar att skapa ett pass i Canvas, title är dynamisk. 
        public string  GetCanvasData(string title, string date, string startTime, string endTime, string comment)
        {
            _ = PostCanvasAsync(title);
            return "";
        }
        private async Task PostCanvasAsync(string title)
        {
            using (var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(new HttpMethod("POST"), "https://ltu.instructure.com/api/v1/calendar_events.json"))
                {
                    request.Headers.TryAddWithoutValidation("Authorization", "Bearer 3755~YPKPwpVYGZxHgMBOur8V4akVQ5vCsOWBCThnTtiazZEGsBwUN8dQ7yW9j1ycwlzR");

                    var multipartContent = new MultipartFormDataContent();
                    multipartContent.Add(new StringContent("user_66806"), "calendar_event[context_code]");
                    multipartContent.Add(new StringContent(title), "calendar_event[title]");
                    multipartContent.Add(new StringContent("2020-12-30T17:00:00Z"), "calendar_event[start_at]");
                    multipartContent.Add(new StringContent("2020-12-30T18:00:00Z"), "calendar_event[end_at]");
                    request.Content = multipartContent;

                    var response = await httpClient.SendAsync(request);
                }
            }
        }

    }
}
