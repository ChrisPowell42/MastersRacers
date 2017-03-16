using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System;
using System.Data.Entity;
using System.Threading.Tasks;

namespace MastersRacers.Data.CommandObjects
{
    public interface IGetCommand<T> : IDisposable where T : class, IDBObject
    {
        Task<T> Get(Guid id);
    }

    public class GetCommand<T> : CommandObjectBase, IGetCommand<T> where T : class, IDBObject
    {
        public GetCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<T> Get(Guid id)
        {
            T returnValue = await _dbContext.Set<T>().SingleOrDefaultAsync(x => x.Id.Equals(id));

            return returnValue;
        }
    }
}
