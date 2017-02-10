using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects.LocationCommands
{
    public interface IRemoveLocationCommand : IDisposable
    {
        Task<bool> RemoveLocation(Guid id);
    }

    public class RemoveLocationCommand : CommandObjectBase, IRemoveLocationCommand
    {
        public RemoveLocationCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<bool> RemoveLocation(Guid id)
        {
            Location toDelete = await _dbContext.Locations.SingleOrDefaultAsync(x => x.ID.Equals(id));

            if (toDelete == null)
                return false;
            else
            {
                _dbContext.Locations.Remove(toDelete);
                await _dbContext.SaveChangesAsync();

                return true;
            }
        }
    }
}
