using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects.LocationCommands
{

    public interface IGetAllLocationsCommand : IDisposable
    {
        Task<ICollection<Location>> GetAllLocations();
    }
    public class GetAllLocationsCommand : CommandObjectBase, IGetAllLocationsCommand
    {
        public GetAllLocationsCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<ICollection<Location>> GetAllLocations()
        {
            return await _dbContext.Locations.ToListAsync();
        }
    }
}
