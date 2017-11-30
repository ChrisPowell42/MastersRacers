using System;
using System.ComponentModel.DataAnnotations;

namespace MastersRacers.Data.Models.RefData
{
    public class RaceEventType : IDBObject
    {

        public static readonly Guid RaceId = Guid.Parse("{D43B51F9-3822-4B95-A266-1401F20DDA21}");
        public static readonly Guid TrainId = Guid.Parse("{0F9AEFFE-132F-412E-8CE3-6008053FD5FB}");

        [Key]
        public Guid Id { get; set; }

        [MaxLength(50)]
        public string TypeName { get; set; }
    }
}
