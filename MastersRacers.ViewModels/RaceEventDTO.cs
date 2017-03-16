using MastersRacers.DTOs.RefData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DTOs
{
    public class RaceEventDTO
    {
        public Guid Id { get; set; }

        public Guid LocationId { get; set; }
        public Guid SeasonId { get; set; }
        public Guid RaceFormatId { get; set; }
        public Guid RacePhaseId { get; set; }

        public int RunCount { get; set; }
        public string RaceName { get; set; }
        public DateTime ScheduledStartTime { get; set; }
        public string Notes { get; set; }

        public SeasonDTO Season { get; set; }
        public LocationDTO Location { get; set; }
        public RaceFormatDTO RaceFormat { get; set; }
        public RacePhaseDTO RacePhase { get; set; }

    }
}
