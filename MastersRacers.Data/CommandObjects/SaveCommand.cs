using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects
{

    public interface ISaveCommand<T>:IDisposable where T: class, IDBObject
    {
        Task<T> Save(T toSave);
    }

    public class SaveCommand<T> : CommandObjectBase, ISaveCommand<T> where T : class, IDBObject
    {
        public SaveCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<T> Save(T toSave)
        {
            if (toSave.Id.Equals(Guid.Empty))
            {
                return await Add(toSave);
            }
            else
            {
                return await Edit(toSave);
            }
        }

        private async Task<T> Add(T toSave)
        {
            toSave.Id = Guid.NewGuid();

            _dbContext.Set<T>().Add(toSave);

            await _dbContext.SaveChangesAsync();

            return toSave;
        }

        private async Task<T> Edit(T toEdit)
        {
            _dbContext.Entry(toEdit).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return toEdit;
        }

    }

}
