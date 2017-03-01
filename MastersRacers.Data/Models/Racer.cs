using MastersRacers.Data.Models.RefData;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MastersRacers.Data.Models
{
    public class Racer:IDBObject
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid RaceSeriesId { get; set; }

        [Required]
        [MaxLength(100)]
        public String Name { get; set; }

        public int BibNumber { get; set; }

        public bool Active { get; set; }

        [ForeignKey("RaceSeriesId")]
        public virtual RaceSeries RaceSeries { get; set; }
    }
}
