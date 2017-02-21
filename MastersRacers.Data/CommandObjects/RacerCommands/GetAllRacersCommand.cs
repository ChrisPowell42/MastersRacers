using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects.RacerCommands
{
    public class GetAllRacersCommand : GetAllCommand<Racer>
    {
        public GetAllRacersCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public override async Task<ICollection<Racer>> GetAll()
        {
            return await _dbContext.Racers.Include(x => x.RaceSeries).ToListAsync();
        }
    }
}
