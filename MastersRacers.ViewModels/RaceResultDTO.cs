using System;
using System.Collections.Generic;

namespace MastersRacers.DTOs
{
    public class RaceResultDTO
    {
        public Guid Id { get; set; }

        public Guid RaceEventId { get; set; }
        public Guid RacerId { get; set; }

        public double TotalRaceTime { get; set; }
        public bool IsDsqOrDnf { get; set; }
        public int Place { get; set; }
        public int Points { get; set; }

        public RaceEventDTO RaceEvent { get; set; }
        public RacerDTO Racer { get; set; }

        public ICollection<RunResultDTO> RunResults { get; set; }

    }
}
