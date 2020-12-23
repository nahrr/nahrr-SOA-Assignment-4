using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment4.Models
{
    public class CourseInfo
    {
        public string Namn { get; set; }
        public string Kurskod { get; set; }
        public string Kommentar { get; set; }

        //[JsonProperty("")]
        //public string blankString { get; set; }
}
}
