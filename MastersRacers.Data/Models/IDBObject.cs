using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.Models
{
    public interface IDBObject
    {
        Guid Id { get; set; }
    }
}
