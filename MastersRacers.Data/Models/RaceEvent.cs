using MastersRacers.Data.Models.RefData;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.Models
{
    public class RaceEvent : IDBObject
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid LocationId { get; set; }
        [Required]
        public Guid SeasonId { get; set; }
        [Required]
        public Guid RaceFormatId { get; set; }

        public int RunCount { get; set; }
        [MaxLength(255)]
        public string RaceName { get; set; }
        public DateTime ScheduledStartTime { get; set; }
        [MaxLength(8000)]
        public string Notes { get; set; }

        [ForeignKey("LocationId")]
        public virtual Location Location { get; set; }
        [ForeignKey("SeasonId")]
        public virtual Season Season { get; set; }
        [ForeignKey("RaceFormatId")]
        public virtual RaceFormat RaceFormat { get; set; }

    }
}
