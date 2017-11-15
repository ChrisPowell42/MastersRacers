using MastersRacers.DTOs.RefData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DTOs
{
    public class NewsItemDTO
    {
        public Guid Id { get; set; }
        public Guid ArticleTypeId { get; set; }

        public string Title { get; set; }
        public string ArticleText { get; set; }
        public DateTime PostedOn { get; set; }
        public string PostedBy { get; set; }

        public ArticleTypeDTO ArticleType { get; set; }

    }
}
