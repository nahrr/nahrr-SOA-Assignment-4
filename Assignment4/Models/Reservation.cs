using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment4.Models
{
    public class Reservation
    {
        //string id;
        //string startdate;
        //string starttime;
        //string enddate;
        //string endtime;
        //List<string> columns;

        //public string Id { get => id; set => id = value; }
        //public string Startdate { get => startdate; set => startdate = value; }
        //public string Starttime { get => starttime; set => starttime = value; }
        //public string Enddate { get => enddate; set => enddate = value; }
        //public string Endtime { get => endtime; set => endtime = value; }
        //public List<string> Columns { get => columns; set => columns = value; }

        public string id { get; set; }
        public string startdate { get; set; }
        public string starttime { get; set; }
        public string enddate { get; set; }
        public string endtime { get; set; }
        public List<string> columns { get; set; }

    }
}
