using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment4.Models
{
    public class Root
    {
        public List<string> columnheaders { get; set; }
        public Info info { get; set; }
        public List<Reservation> reservations { get; set; }

    }
}
