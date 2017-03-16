using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.Models
{
    public class RaceResult : IDBObject
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid RaceEventId { get; set; }
        [Required]
        public Guid RacerId { get; set; }

        public double TotalRaceTime { get; set; }
        public bool IsDsqOrDnf { get; set; }
        public int Place { get; set; }
        public int Points { get; set; }

        [ForeignKey("RaceEventId")]
        public virtual RaceEvent RaceEvent { get; set; }
        [ForeignKey("RacerId")]
        public virtual Racer Racer { get; set; }

        public virtual ICollection<RunResult> RunResults { get; set; }

    }
}
