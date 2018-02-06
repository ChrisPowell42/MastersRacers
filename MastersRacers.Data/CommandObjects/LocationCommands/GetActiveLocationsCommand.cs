using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace MastersRacers.Data.CommandObjects.LocationCommands
{
    public interface IGetActiveLocationsCommand
    {
        Task<ICollection<Location>> GetActiveLocations();
    }

    public class GetActiveLocationsCommand: CommandObjectBase, IGetActiveLocationsCommand
    {
        public GetActiveLocationsCommand(IRaceContext dbContext) : base(dbContext)
        {

        }

        public async Task<ICollection<Location>> GetActiveLocations()
        {
            ICollection<Location> returnLocations = await _dbContext.Locations.Where(x => x.Active).ToListAsync();

            return returnLocations;
        }
    }
}
