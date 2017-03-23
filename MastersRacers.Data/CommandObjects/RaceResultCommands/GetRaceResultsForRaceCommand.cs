using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects.RaceResultCommands
{
    public interface IGetRaceResultsForRaceCommand: IDisposable
    {
        Task<ICollection<RaceResult>> GetRaceResultsForRace(Guid raceEventId);
    }

    public class GetRaceResultsForRaceCommand : CommandObjectBase, IGetRaceResultsForRaceCommand
    {
        public GetRaceResultsForRaceCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<ICollection<RaceResult>> GetRaceResultsForRace(Guid raceEventId)
        {
            ICollection<RaceResult> results = await _dbContext.RaceResults.Where(x => x.RaceEventId == raceEventId)
                                                                          .Include(x => x.Racer)
                                                                          .Include(x => x.RaceEvent)
                                                                          .ToListAsync();

            return results;
        }

    }
}
