using MastersRacers.DTOs.RefData;
using System;

namespace MastersRacers.DTOs
{
    public class RacerDTO
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public int BibNumber { get; set; }
        public RaceSeriesDTO RaceSeries { get; set; }
    }
}
