using System;
using System.ComponentModel.DataAnnotations;

namespace MastersRacers.Data.Models.RefData
{
    public class RaceFormat:IDBObject
    {
        public static readonly Guid SlalomId = Guid.Parse("{BA949AEF-A951-4B7F-8B6D-01DC00B9BF32}");
        public static readonly Guid GSlalomId = Guid.Parse("{AF859119-0CD7-4389-8B3D-A31D5989C9B7}");

        [Key]
        public Guid Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(3)]
        public string Code { get; set; }

    }
}
