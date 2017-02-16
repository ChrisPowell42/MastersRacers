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

        public Guid LocationId { get; set; }
        public Guid SeasonId { get; set; }
        public Guid RaceFormatId { get; set; }

        public int RunCount { get; set; }
        [MaxLength(255)]
        public string RaceName { get; set; }
        public DateTime ScheduledStartTime { get; set; }
        [MaxLength(8000)]
        public string Notes { get; set; }

        public virtual Location Location { get; set; }
        public virtual Season Season { get; set; }
        public virtual RaceFormat RaceFormat { get; set; }

    }
}
