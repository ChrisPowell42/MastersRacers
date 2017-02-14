using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DTOs
{
    public class SeasonDTO
    {
        public Guid Id { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public string Notes { get; set; }
        public Boolean IsCurrentSeason { get; set; }
    }
}
