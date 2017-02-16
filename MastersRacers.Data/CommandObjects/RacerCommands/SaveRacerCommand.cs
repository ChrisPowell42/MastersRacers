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
    public interface ISaveRacerCommand: ISaveCommand<Racer>
    {

    }

    public class SaveRacerCommand : SaveCommand<Racer>, ISaveRacerCommand
    {
        public SaveRacerCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        protected override async Task<Racer> Add(Racer toSave)
        {
            toSave.Id = Guid.NewGuid();

            _dbContext.Set<Racer>().Add(toSave);
            _dbContext.Entry(toSave.RaceSeries).State = EntityState.Unchanged;

            await _dbContext.SaveChangesAsync();

            return toSave;

        }
    }
}
