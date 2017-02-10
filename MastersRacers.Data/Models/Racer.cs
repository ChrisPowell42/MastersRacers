using System;
using System.ComponentModel.DataAnnotations;

namespace MastersRacers.Data.Models
{
    public class Racer
    {
        [Key]
        public Guid ID { get; set; }

        [Required]
        [MaxLength(100)]
        public String Name { get; set; }

        public int BibNumber { get; set; }

        [MaxLength(100)]
        public string RaceSeries { get; set; }
    }
}
