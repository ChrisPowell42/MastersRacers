using MastersRacers.Data.Models;
using MastersRacers.Data.Contexts;

namespace MastersRacers.Data.CommandObjects.LocationCommands
{

    public class SaveLocationCommand : SaveCommand<Location>
    {
        public SaveLocationCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        protected override void SetUnchangedItems(Location toSave)
        {
            //Do nothing
        }

    }
}
