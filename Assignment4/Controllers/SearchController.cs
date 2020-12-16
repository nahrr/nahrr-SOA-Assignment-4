using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

    public class SearchController : ControllerBase
    {

        public string searchUrl = "";
        public string objectId;
        

        //[Route("{courseCode}")]
        //[HttpPost]
        //Tar sökinput från frontend (DENNA KOD GÖR INGENTING NU, FIXA SÅ DEN NÅS FRÅN .JS-FILEN O KÖR FELHANTERING HÄR ELLER KÖR FELHANTERING HELT I .JS-FILEN)
        //public string GetSearchInput(string courseCode)
        //{
        //    if (string.IsNullOrEmpty(courseCode))
        //    {
        //        throw new ArgumentException($"'{nameof(courseCode)}' cannot be null or empty", nameof(courseCode));
        //    }

        //    return GetSearchCourse(courseCode);
        //}

        //Bygger sök-url efter kurskod
        [Route("{courseCode}")]
        [HttpPost]
        public void GetSearchCourse(string courseCode)
        {
            string sourceUrl = "https://cloud.timeedit.net/ltu/web/schedule1/objects.txt?max=15&fr=t&partajax=t&im=f&sid=3&l=sv_SE&search_text=course&types=28";
            searchUrl = sourceUrl.Replace("course", courseCode);

            GetObjectIdByCourseCode(searchUrl);
            //GetRecordsOfCourse(searchUrl);
        }

        //Tar ut alla objectids för aktuell kurs från JSON-data
        private void GetObjectIdByCourseCode(string searchUrl)
        {
            var jsonData = new WebClient().DownloadString(searchUrl);
            var userObj = JObject.Parse(jsonData);

            if (((JObject)userObj).Count != 0)
            {
                objectId = userObj.SelectToken("ids")
                .ToString(); // titta på denna.

                // lägger till objektidn till en string array
                string[] objectIdArray = objectId.Split(',');

                // rensar upp string arrayen, lägger till .28 och kör GetScheduleByObjectId med varje objekt-id
                for (int i = 0; i < objectIdArray.Length; i++)
                {
                    objectIdArray[i] = objectIdArray[i]
                        .Replace("[", string.Empty)
                        .Replace("]", string.Empty)
                        .Replace("\r\n", string.Empty)
                        .Replace(" ", string.Empty);
                    objectIdArray[i] += ".28";

                    GetScheduleByObjectId(objectIdArray[i]);
                }                         
            }
            else {
                return;
            }
        }

        //Hämtar schema via objekt-id
        private void GetScheduleByObjectId(string objectId)
        {
            var url = "https://cloud.timeedit.net/ltu/web/schedule1/ri.json?h=t&sid=3&p=20200901.x,20300117.x&objects=insertObj&ox=0&types=0&fe=0";
            var correctUrl = url.Replace("insertObj", objectId);
            string json = new WebClient().DownloadString(correctUrl);

            Root scheduleCollection = JsonConvert.DeserializeObject<Root>(json);
            Console.WriteLine(scheduleCollection.reservations.Count); // för test, t.ex. för D0031N är det 16 lektioner (16 reservations)   
        }
    }
}

