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
    public interface ISaveRacerCommand: IDisposable
    {
        Task<Racer> SaveRacer(Racer toSave);
    }

    public class SaveRacerCommand : CommandObjectBase, ISaveRacerCommand
    {

        public SaveRacerCommand(IRaceContext dbContext):base(dbContext)
        {
        }

        public async Task<Racer> SaveRacer(Racer toSave)
        {

            if (toSave.ID.Equals(Guid.Empty))
            {
                return await AddRacer(toSave);
            }
            else
            {
                return await EditRacer(toSave);
            }
            
        }

        private async Task<Racer> EditRacer(Racer toEdit)
        {
            _dbContext.Entry(toEdit).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return toEdit;
        }

        private async Task<Racer> AddRacer(Racer toAdd)
        {
            toAdd.ID = Guid.NewGuid();

            _dbContext.Racers.Add(toAdd);
            await _dbContext.SaveChangesAsync();

            return toAdd;
        }

    }
}
