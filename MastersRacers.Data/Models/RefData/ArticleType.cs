using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.Models.RefData
{
    public class ArticleType: IDBObject
    {

        public static readonly Guid RaceId = Guid.Parse("{844EA7B7-DFFF-40E1-97C1-DC6C62C75F6E}");
        public static readonly Guid TrainingId = Guid.Parse("{DC4FF799-3C45-47F7-829F-C7C454E730AA}");
        public static readonly Guid MastersId = Guid.Parse("{273CD19B-379D-4F3E-AAD9-A978D2BCB523}");
        public static readonly Guid TechId = Guid.Parse("{20E27E68-AF09-4C34-BDBB-F8E6DCE1D9A8}");


        [Key]
        public Guid Id { get; set; }
        [MaxLength(50)]
        public string TypeName { get; set; }
    }
}
