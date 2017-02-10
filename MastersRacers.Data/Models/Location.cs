using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.Models
{
    public class Location
    {
        [Key]
        public Guid ID { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }
        [MaxLength(2000)]
        public string Description { get; set; }
        public double LatPos { get; set; }
        public double LongPos { get; set; }
    }
}
