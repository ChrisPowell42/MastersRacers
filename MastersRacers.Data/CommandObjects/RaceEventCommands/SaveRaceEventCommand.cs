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
    public interface ISaveRaceEventCommand: ISaveCommand<RaceEvent>
    {

    }

    public class SaveRaceEventCommand : SaveCommand<RaceEvent>, ISaveRaceEventCommand
    {
        public SaveRaceEventCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        protected override async Task<RaceEvent> Add(RaceEvent toSave)
        {
            toSave.Id = Guid.NewGuid();

            _dbContext.Set<RaceEvent>().Add(toSave);
            _dbContext.Entry(toSave.Location).State = EntityState.Unchanged;
            _dbContext.Entry(toSave.RaceFormat).State = EntityState.Unchanged;
            _dbContext.Entry(toSave.Season).State = EntityState.Unchanged;

            await _dbContext.SaveChangesAsync();

            return toSave;
        }


    }
}
