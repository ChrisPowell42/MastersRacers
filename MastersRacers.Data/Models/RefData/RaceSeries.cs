using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.Models.RefData
{
    public class RaceSeries : IDBObject
    {
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
