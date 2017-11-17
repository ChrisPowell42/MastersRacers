using MastersRacers.Data.Models;
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

        protected override void SetUnchangedItems(Racer toSave)
        {
            _dbContext.Entry(toSave.RaceSeries).State = EntityState.Unchanged;
        }
    }
}
