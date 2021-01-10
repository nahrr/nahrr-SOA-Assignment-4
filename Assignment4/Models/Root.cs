using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment4.Models
{
    public class Root
    {
        /// <summary>
        /// "Denna klass (och underliggande klasser) Populeras med JSON-data från TimeEdit"
        /// </summary>
        public List<string> columnheaders { get; set; }
        public Info info { get; set; }
        public List<Reservation> reservations { get; set; }
        public CourseInfo courseinfo { get; set; } 
    }
}
