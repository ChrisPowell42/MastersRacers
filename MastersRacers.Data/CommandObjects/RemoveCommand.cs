using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects
{
    public interface IRemoveCommand<T> : IDisposable where T: class, IDBObject
    {
        Task<bool> RemoveItem(Guid id);
    }

    public class RemoveCommand<T> : CommandObjectBase, IRemoveCommand<T> where T : class, IDBObject
    {
        public RemoveCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<bool> RemoveItem(Guid id)
        {

            T toDelete = await _dbContext.Set<T>().SingleOrDefaultAsync(x=>x.Id.Equals(id));

            if (toDelete == null)
                return false;
            else
            {
                _dbContext.Set<T>().Remove(toDelete);
                await _dbContext.SaveChangesAsync();

                return true;
            }

        }

    }
}
