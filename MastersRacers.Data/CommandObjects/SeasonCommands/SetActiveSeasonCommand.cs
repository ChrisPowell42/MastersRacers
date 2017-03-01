using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;

namespace MastersRacers.Data.CommandObjects.SeasonCommands
{
    public interface ISetActiveSeasonCommand: IDisposable
    {
        Task<Boolean> SetActiveSeason(Guid id);
    }

    public class SetActiveSeasonCommand : CommandObjectBase, ISetActiveSeasonCommand
    {
        public SetActiveSeasonCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<bool> SetActiveSeason(Guid id)
        {
            _dbContext.Seasons.ToList().ForEach(x => x.IsCurrentSeason = (x.Id == id));
            await _dbContext.SaveChangesAsync();

            return true;
        }

    }
}
