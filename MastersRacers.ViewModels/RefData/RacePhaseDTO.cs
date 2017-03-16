using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DTOs.RefData
{
    public class RacePhaseDTO
    {
        public Guid Id { get; set; }
        public int SortIdx { get; set; }
        public string Phase { get; set; }
    }
}
