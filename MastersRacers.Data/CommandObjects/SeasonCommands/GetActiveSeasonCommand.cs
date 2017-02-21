using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects.SeasonCommands
{
    public interface IGetActiveSeasonCommand : IDisposable
    {
        Task<Season> GetActiveSeason();
    }

    public class GetActiveSeasonCommand : CommandObjectBase, IGetActiveSeasonCommand
    {
        public GetActiveSeasonCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<Season> GetActiveSeason()
        {
            Season returnSeason = await _dbContext.Seasons.SingleOrDefaultAsync(x => x.IsCurrentSeason);

            return returnSeason;
        }

    }
}
