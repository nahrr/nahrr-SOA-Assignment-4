using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment4.Models
{
    public class Root
    {
        //List<string> columnheaders;
        //Info info;
        //List<Reservation> schedules;

        //public List<string> Columnheaders { get => columnheaders; set => columnheaders = value; }
        //public Info Info { get => info; set => info = value; }
        //public List<Reservation> Schedules { get => schedules; set => schedules = value; }
        public List<string> columnheaders { get; set; }
        public Info info { get; set; }
        public List<Reservation> reservations { get; set; }

    }
}
