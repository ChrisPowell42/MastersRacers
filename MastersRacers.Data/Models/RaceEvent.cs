using MastersRacers.Data.Models.RefData;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [Required]
        public Guid RacePhaseId { get; set; }
        [Required]
        public Guid RaceEventTypeId { get; set; }

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
        [ForeignKey("RacePhaseId")]
        public virtual RacePhase RacePhase { get; set; }
        [ForeignKey("RaceEventTypeId")]
        public virtual RaceEventType RaceEventType { get; set; }

        public virtual ICollection<RaceResult> RaceResults { get; set; }

    }
}
