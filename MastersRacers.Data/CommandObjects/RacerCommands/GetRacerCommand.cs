using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.CommandObjects.RacerCommands
{
    public interface IGetRacerCommand: IDisposable
    {
        Task<Racer> GetRacerAsync(Guid id);
    }

    public class GetRacerCommand : CommandObjectBase, IGetRacerCommand
    {

        public GetRacerCommand(IRaceContext dbContext):base(dbContext)
        {
        }

        public async Task<Racer> GetRacerAsync(Guid id)
        {
            return await _dbContext.Racers.FirstOrDefaultAsync(x => x.Id.Equals(id));
        }
    }
}
