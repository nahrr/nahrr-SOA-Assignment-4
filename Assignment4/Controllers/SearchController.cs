using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Assignment4.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Assignment4.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]

    public class SearchController : Controller
    {

        public string searchUrl;
        public string objectId;
        public string startDate;
        public string endDate;
        public string dateString;

        //Bygger sök-url efter kurskod och kör metoden DateStringBuilder(), returnerar lista på schemainbokningar genom GetListOfSchedules()
        [Route("{courseCode}/{startDate}/{endDate}")]
        [HttpGet]
        public List<Root> GetSearchCourse(string courseCode, string startDate, string endDate)
        {
            string sourceUrl = "https://cloud.timeedit.net/ltu/web/schedule1/objects.txt?max=15&fr=t&partajax=t&im=f&sid=3&l=sv_SE&search_text=course&types=28";
            searchUrl = sourceUrl.Replace("course", courseCode);

            DateStringBuilder(startDate, endDate);

            return GetListOfSchedules(searchUrl);
        }

        // bygger datumsträng för att skjuta in i URL.
        private string DateStringBuilder(string startDate, string endDate)
        {
            startDate = startDate.Replace("-", string.Empty);
            startDate += ".x";

            endDate = endDate.Replace("-", string.Empty);
            endDate += ".x";

            dateString = startDate + "," + endDate;

            return dateString;
        }

        //Tar ut alla objectids för sökt kurs från JSON-data från TimeEdit. 
        //Returnerar lista med scheman som har bokningar för aktuell tidpunkt.
        private List<Root> GetListOfSchedules(string searchUrl)
        {
            var jsonData = new WebClient().DownloadString(searchUrl);
            var userObj = JObject.Parse(jsonData);
            List<Root> scheduleList = new List<Root>();

            if (((JObject)userObj).Count != 0)
            {
                objectId = userObj.SelectToken("ids")
                .ToString(); 

                // lägger till objektidn till en string array
                string[] objectIdArray = objectId.Split(',');

                // rensar upp string arrayen, lägger till .28 och kör GetScheduleByObjectId med varje objekt-id.
                for (int i = 0; i < objectIdArray.Length; i++)
                {
                    objectIdArray[i] = objectIdArray[i]
                        .Replace("[", string.Empty)
                        .Replace("]", string.Empty)
                        .Replace("\r\n", string.Empty)
                        .Replace(" ", string.Empty);
                    objectIdArray[i] += ".28";

                    var root = GetScheduleByObjectId(objectIdArray[i], dateString);

                    // saknas aktuella bokningar läggs inte det schemat till i scheduleList.
                    if (root.reservations.Count > 0)
                        scheduleList.Add(root);
                    
                }              
            }

            return scheduleList;
        }

        //Hämtar JSON-objekt för aktuellt schema via objekt-id. 
        //Returnerar ett objekt av typen Root (ett schema).
        private Root GetScheduleByObjectId(string objectId, string dateString)
        {
            var url = "https://cloud.timeedit.net/ltu/web/schedule1/ri.json?h=t&sid=3&p=insertDate&objects=insertObj&ox=0&types=0&fe=0";

            var correctUrl = url
                .Replace("insertObj", objectId)
                .Replace("insertDate", dateString);
           
            // returnerar JSON-data
            string json = new WebClient().DownloadString(correctUrl);
            if (json == null)
            {
                errorMessage();
            }

            // mappar JSON-data till klasser i Assignment4.Models 
            Root scheduleCollection = JsonConvert.DeserializeObject<Root>(json);

            return scheduleCollection;
        }

        public string errorMessage()
        {
            return "Kursen hittades ej";
        }
    }
}

