using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.Models
{
    public class Season:IDBObject
    {
        [Key]
        public Guid Id { get; set; }

        public int StartYear { get; set; }
        public int EndYear { get; set; }

        [MaxLength(8000)]
        public string Notes { get; set; }

        public Boolean IsCurrentSeason { get; set; }

    }
}
