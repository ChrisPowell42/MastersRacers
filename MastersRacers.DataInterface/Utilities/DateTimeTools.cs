using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DataInterface.Utilities
{
    public interface IDateTimeTools
    {
        DateTime GetUTCNow();

    }

    // Just a wrapper class for DateTime. 
    // To faciliate testing by making the interface available for mocking.
    public class DateTimeTools : IDateTimeTools
    {
        public DateTime GetUTCNow()
        {
            return DateTime.UtcNow;
        }
    }
}
