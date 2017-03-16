using System;
using System.ComponentModel.DataAnnotations;

namespace MastersRacers.Data.Models.RefData
{
    public class RaceSeries : IDBObject
    {
        public static readonly Guid WomenBId = Guid.Parse("{6096C081-B4DC-4C23-B190-F035377560FA}");
        public static readonly Guid WomenSId = Guid.Parse("{9FE0C1DD-3E51-45AF-9C6D-BC63A9471F18}");
        public static readonly Guid WomenGId = Guid.Parse("{BFDBF659-4121-4BFF-B4BC-129817DDDE4C}");
        public static readonly Guid WomenPId = Guid.Parse("{4D2AFEC6-AB0F-4B1D-84F6-8E00FC69E52E}");
        public static readonly Guid MenBId = Guid.Parse("{DBC3AE64-1B76-40DA-B978-DFBE85992E40}");
        public static readonly Guid MenSId = Guid.Parse("{0B9D68F1-6AA4-413C-8D1B-A489D73552DB}");
        public static readonly Guid MenGId = Guid.Parse("{D80B0D83-6404-418C-B265-01A68BC143B2}");
        public static readonly Guid MenPId = Guid.Parse("{E998AF95-C9C4-40E4-8E23-A2A51860362A}");

        [Key]
        public Guid Id { get; set; }

        public int SortOrderIdx { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MaxLength(20)]
        public string Gender { get; set; }

    }
}
