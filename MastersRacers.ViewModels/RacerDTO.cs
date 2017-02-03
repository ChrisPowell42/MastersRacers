using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DTOs
{
    public class RacerDTO
    {
        public Guid ID { get; set; }

        public string Name { get; set; }
        public int BibNumber { get; set; }
        public string RaceSeries { get; set; }
    }
}
