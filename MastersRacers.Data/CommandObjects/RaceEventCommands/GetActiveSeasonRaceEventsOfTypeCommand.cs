using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects.RaceEventCommands
{
    public interface IGetActiveSeasonRaceEventsOfTypeCommand : IDisposable
    {
        Task<ICollection<RaceEvent>> GetAllActiveOfType(Guid eventTypeId);
    }

    public class GetActiveSeasonRaceEventsOfTypeCommand : CommandObjectBase, IGetActiveSeasonRaceEventsOfTypeCommand
    {
        public GetActiveSeasonRaceEventsOfTypeCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<ICollection<RaceEvent>> GetAllActiveOfType(Guid eventTypeId)
        {
            ICollection<RaceEvent> returnValues = await _dbContext.RaceEvents.Where(x => x.Season.IsCurrentSeason && x.RaceEventTypeId == eventTypeId)
                                                                             .Include(x => x.Location)
                                                                             .Include(x => x.RaceFormat)
                                                                             .Include(x => x.RacePhase)
                                                                             .Include(x => x.Season)
                                                                             .ToListAsync();

            return returnValues;
        }
    }
}
