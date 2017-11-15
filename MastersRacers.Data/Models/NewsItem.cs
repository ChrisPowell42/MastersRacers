using MastersRacers.Data.Models.RefData;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MastersRacers.Data.Models
{
    public class NewsItem : IDBObject
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ArticleTypeId { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set;}
        [Required]
        public string ArticleText { get; set; }
        public DateTime PostedOn { get; set; }
        [MaxLength(50)]
        public string PostedBy { get; set; }

        [ForeignKey("ArticleTypeId")]
        public virtual ArticleType ArticleType { get; set; }
    }
}
