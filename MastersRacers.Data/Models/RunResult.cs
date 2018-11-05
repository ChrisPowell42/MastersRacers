using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MastersRacers.Data.Models
{
    public class RunResult : IDBObject
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid RaceResultId { get; set; }

        [Required]
        public int RunIdx { get; set; }
        public double? RunTime { get; set; }
        public bool IsDSQ { get; set; }
        public bool IsDNF { get; set; }

        [ForeignKey("RaceResultId")]
        public virtual RaceResult RaceResult { get; set; }

    }
}
