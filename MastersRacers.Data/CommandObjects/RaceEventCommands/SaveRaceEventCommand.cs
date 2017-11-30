using MastersRacers.Data.Models;
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

        protected override void SetUnchangedItems(RaceEvent toSave)
        {
            _dbContext.Entry(toSave.Location).State = EntityState.Unchanged;
            _dbContext.Entry(toSave.RaceFormat).State = EntityState.Unchanged;
            _dbContext.Entry(toSave.Season).State = EntityState.Unchanged;
            _dbContext.Entry(toSave.RaceEventType).State = EntityState.Unchanged;
        }
    }
}
