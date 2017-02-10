using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace MastersRacers.Data.CommandObjects.RacerCommands
{
    public interface IGetAllRacersCommand: IDisposable
    {
        Task<ICollection<Racer>> GetAllRacers();
    }

    public class GetAllRacersCommand:CommandObjectBase,IGetAllRacersCommand
    {

        public GetAllRacersCommand(IRaceContext dbContext):base(dbContext)
        {
        }

        public async Task<ICollection<Racer>> GetAllRacers()
        {
            return await _dbContext.Racers.ToListAsync();
        }

    }
}
