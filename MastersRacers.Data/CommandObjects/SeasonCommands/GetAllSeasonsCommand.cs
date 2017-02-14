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
    public class GetAllSeasonsCommand : GetAllCommand<Season>
    {
        public GetAllSeasonsCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async override Task<ICollection<Season>> GetAll()
        {
            return await _dbContext.Seasons.OrderBy(x=>x.StartYear).ToListAsync();
        }

    }
}
