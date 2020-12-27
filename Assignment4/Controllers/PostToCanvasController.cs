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

        private async Task PostCanvasAsync()
        {
            using (var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(new HttpMethod("POST"), "https://ltu.instructure.com/api/v1/calendar_events.json"))
                {
                    request.Headers.TryAddWithoutValidation("Authorization", "Bearer 3755~YPKPwpVYGZxHgMBOur8V4akVQ5vCsOWBCThnTtiazZEGsBwUN8dQ7yW9j1ycwlzR");

                    var multipartContent = new MultipartFormDataContent();
                    multipartContent.Add(new StringContent("user_66806"), "calendar_event[context_code]");
                    multipartContent.Add(new StringContent("apitest från .net"), "calendar_event[title]");
                    multipartContent.Add(new StringContent("2020-12-20T17:00:00Z"), "calendar_event[start_at]");
                    multipartContent.Add(new StringContent("2020-12-20T18:00:00Z"), "calendar_event[end_at]");
                    request.Content = multipartContent;

                    var response = await httpClient.SendAsync(request);
                }
            }
        }

    }
}
