using System;
using System.ComponentModel.DataAnnotations;

namespace MastersRacers.Data.Models.RefData
{
    public class RacePhase : IDBObject
    {
        public static Guid ScheduledId = Guid.Parse("{A0DA96DF-A0C5-4361-8ADD-05D9A0DF240B}");
        public static Guid RecordingId = Guid.Parse("{BDD2A2B3-37B7-4B8D-9969-3C06DF660C1C}");
        public static Guid FinalizedId = Guid.Parse("{2D5B8ACC-6CAA-4133-8251-710D715B7002}");

        [Key]
        public Guid Id { get; set; }

        [Required]
        public int SortIdx { get; set; }
        [Required, MaxLength(50)]
        public string Phase { get; set; }
    }
}
