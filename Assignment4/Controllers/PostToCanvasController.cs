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
    // Postar data till Canvas API som lägger in en bokning i schemat.
    public class PostToCanvasController : ControllerBase
    {
        private const string Z = "+01:00"; //Time zone utc+1
        private const string T = "T:";
        private const string token = "Bearer 3755~YPKPwpVYGZxHgMBOur8V4akVQ5vCsOWBCThnTtiazZEGsBwUN8dQ7yW9j1ycwlzR"; //Johans Token (dvs, bokningar i Canvas syns bara för honom)


        /// <summary>
        /// "Hämtar data från modal då en inbokning redigeras"
        /// </summary>
        /// <param name="title">Titel</param>
        /// /// <param name="date">Datum</param>
        /// /// <param name="startTime">Starttid</param>
        /// /// <param name="endTime">Sluttid</param>
        /// /// <param name="comment">Kommentar/Information</param>
        [Route("{title}/{date}/{startTime}/{endTime}/{comment}")]
        [HttpGet]
        public void GetCanvasData(string title, string date, string startTime, string endTime, string comment)
        {
            _ = PostCanvasAsync(title, date, startTime, endTime, comment);
        }

        /// <summary>
        /// "Postar till data till Canvas API"
        /// </summary>
        /// <param name="title">Titel</param>
        /// /// <param name="date">Datum</param>
        /// /// <param name="startTime">Starttid</param>
        /// /// <param name="endTime">Sluttid</param>
        /// /// <param name="comment">Kommentar/Information</param>
        private async Task PostCanvasAsync(string title, string date, string startTime, string endTime, string comment)
        {
            using (var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(new HttpMethod("POST"), "https://ltu.instructure.com/api/v1/calendar_events.json"))
                {
                    request.Headers.TryAddWithoutValidation("Authorization", token);

                    var multipartContent = new MultipartFormDataContent();
                    multipartContent.Add(new StringContent("user_66806"), "calendar_event[context_code]");
                    multipartContent.Add(new StringContent(title), "calendar_event[title]");
                    multipartContent.Add(new StringContent(date + T + startTime + Z), "calendar_event[start_at]");
                    multipartContent.Add(new StringContent(date + T + endTime + Z), "calendar_event[end_at]");
                    multipartContent.Add(new StringContent(comment), "calendar_event[description]");
                    request.Content = multipartContent;

                    var response = await httpClient.SendAsync(request);
                }
            }
        }
    }
}