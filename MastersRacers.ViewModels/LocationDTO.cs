using System;

namespace MastersRacers.DTOs
{
    public class LocationDTO
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double LatPos { get; set; }
        public double LongPos { get; set; }
    }
}
