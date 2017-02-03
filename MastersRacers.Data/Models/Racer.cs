using System;
using System.ComponentModel.DataAnnotations;

namespace MastersRacers.Data.Models
{
    public class Racer
    {
        [Key]
        public Guid ID { get; set; }

        [Required]
        public String Name { get; set; }

        public int BibNumber { get; set; }
        public string RaceSeries { get; set; }
    }
}
