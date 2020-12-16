using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment4.Models
{
    public class Reservation
    {
        public string id { get; set; }
        public string startdate { get; set; }
        public string starttime { get; set; }
        public string enddate { get; set; }
        public string endtime { get; set; }
        public List<string> columns { get; set; }
    }
}
