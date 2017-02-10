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
    public interface ISaveLocationCommand:IDisposable
    {
        Task<Location> SaveLocation(Location toSave);
    }

    public class SaveLocationCommand : CommandObjectBase, ISaveLocationCommand
    {
        public SaveLocationCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<Location> SaveLocation(Location toSave)
        {
            if (toSave.ID.Equals(Guid.Empty))
            {
                return await Add(toSave);
            }
            else
            {
                return await Edit(toSave);
            }

        }

        private async Task<Location> Add(Location toSave)
        {
            toSave.ID = Guid.NewGuid();

            _dbContext.Locations.Add(toSave);
            await _dbContext.SaveChangesAsync();

            return toSave;
        }

        private async Task<Location> Edit(Location toEdit)
        {
            _dbContext.Entry(toEdit).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return toEdit;
        }
    }
}
