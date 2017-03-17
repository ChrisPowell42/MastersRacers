﻿using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.Data.Contexts;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects.RacerCommands
{
    public interface IGetActiveRacersCommand : IDisposable
    {
        Task<ICollection<Racer>> GetActiveRacers();
    }

    public class GetActiveRacersCommand : CommandObjectBase, IGetActiveRacersCommand
    {
        public GetActiveRacersCommand(IRaceContext dbContext) : base(dbContext)
        {
        }

        public async Task<ICollection<Racer>> GetActiveRacers()
        {
            ICollection<Racer> returnResult = await _dbContext.Racers.Where(x => x.Active).ToListAsync();

            return returnResult;
        }
    }
}