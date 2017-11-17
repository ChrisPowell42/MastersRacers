using MastersRacers.Data.Models;
using MastersRacers.Data.Contexts;

namespace MastersRacers.Data.CommandObjects.SeasonCommands
{
    public class SaveSeasonCommand : SaveCommand<Season>
    {
        public SaveSeasonCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        protected override void SetUnchangedItems(Season toSave)
        {
            //Do nothing
        }
    }
}
