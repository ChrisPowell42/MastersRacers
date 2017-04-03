using System;

namespace MastersRacers.DTOs
{
    public class RunResultDTO
    {
        public Guid Id { get; set; }
        public Guid RaceResultId { get; set; }

        public int RunIdx { get; set; }
        public double? RunTime { get; set; }
        public bool IsDSQ { get; set; }
        public bool IsDNF { get; set; }

    }
}
