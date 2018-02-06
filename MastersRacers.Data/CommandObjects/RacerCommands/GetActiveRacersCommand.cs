using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace MastersRacers.Data.CommandObjects.RacerCommands
{
    public interface IGetActiveRacersCommand : IDisposable
    {
        Task<ICollection<Racer>> GetActiveRacers();
    }

    public class GetActiveRacersCommand : CommandObjectBase, IGetActiveRacersCommand
    {
        public GetActiveRacersCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<ICollection<Racer>> GetActiveRacers()
        {
            ICollection<Racer> returnResult = await _dbContext.Racers.Where(x => x.Active)
                                                                     .Include(x => x.RaceSeries)
                                                                     .OrderBy(x => x.RaceSeries.SortOrderIdx)
                                                                     .ThenBy(x => x.BibNumber)
                                                                     .ToListAsync();

            return returnResult;
        }
    }
}
