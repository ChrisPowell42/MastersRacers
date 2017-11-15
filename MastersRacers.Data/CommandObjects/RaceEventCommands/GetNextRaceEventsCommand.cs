using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.CommandObjects.RaceEventCommands
{
    public interface IGetNextRaceEventsCommand : IDisposable {

        Task<ICollection<RaceEvent>> GetNextEvents(int eventCount, DateTime currentDate);

    }

    public class GetNextRaceEventsCommand : CommandObjectBase, IGetNextRaceEventsCommand
    {
        public GetNextRaceEventsCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<ICollection<RaceEvent>> GetNextEvents(int eventCount, DateTime currentDate)
        {
            ICollection<RaceEvent> returnValues = await _dbContext.RaceEvents.Where(x => x.ScheduledStartTime > currentDate )
                                                                             .OrderBy(x => x.ScheduledStartTime)
                                                                             .Take(eventCount)
                                                                             .Include(x => x.Location)
                                                                             .Include(x => x.RaceFormat)
                                                                             .Include(x => x.RacePhase)
                                                                             .Include(x => x.Season)
                                                                             .ToListAsync();

            return returnValues;
        }

    }
}
