using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects.SeasonCommands
{
    public interface ICreateActiveSeasonCommand:IDisposable
    {
        Task<Season> CreateActiveSeason();
    }

    public class CreateActiveSeasonCommand : CommandObjectBase, ICreateActiveSeasonCommand
    {
        public CreateActiveSeasonCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<Season> CreateActiveSeason()
        {
            int maxEndYear = _dbContext.Seasons.Max(x => x.EndYear);
            _dbContext.Seasons.ToList().ForEach(s => s.IsCurrentSeason = false);

            Season newSeason = new Season { Id = Guid.NewGuid(), StartYear = maxEndYear, EndYear = maxEndYear + 1, IsCurrentSeason = true };
            _dbContext.Seasons.Add(newSeason);
            await _dbContext.SaveChangesAsync();

            return newSeason;

        }

    }

}
