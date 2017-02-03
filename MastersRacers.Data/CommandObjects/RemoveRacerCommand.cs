using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.CommandObjects
{
    public interface IRemoveRacerCommand: IDisposable
    {
        Task<bool> RemoveRacer(Guid id);
    }

    public class RemoveRacerCommand : CommandObjectBase, IRemoveRacerCommand
    {

        public RemoveRacerCommand(IRaceContext dbContext):base(dbContext)
        {
        }

        public async Task<bool> RemoveRacer(Guid id)
        {
            Racer toDelete = await _dbContext.Racers.SingleOrDefaultAsync(x => x.ID.Equals(id));

            if (toDelete == null)
                return false;
            else
            {
                _dbContext.Racers.Remove(toDelete);
                _dbContext.SaveChanges();

                return true;
            }

        }
    }
}
