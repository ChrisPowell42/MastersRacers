using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace MastersRacers.Data.CommandObjects
{
    public interface IGetAllCommand<T> : IDisposable where T:class, IDBObject
    {
        Task<ICollection<T>> GetAll();
    }

    public class GetAllCommand<T> : CommandObjectBase, IGetAllCommand<T> where T : class, IDBObject
    {
        public GetAllCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async virtual Task<ICollection<T>> GetAll()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }
    }
}
