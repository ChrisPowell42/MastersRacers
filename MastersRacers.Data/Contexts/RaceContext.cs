using MastersRacers.Data.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.Data.Contexts
{
    public interface IRaceContext : IDisposable
    {
        IDbSet<Racer> Racers { get; set; }
        IDbSet<Location> Locations { get; set; }

        int SaveChanges();
        Task<int> SaveChangesAsync();
        DbEntityEntry Entry(object entry);
    }

    public class RaceContext: DbContext, IRaceContext
    {
        public RaceContext() : base("RaceContext")
        {
        }

        public IDbSet<Racer> Racers { get; set; }
        public IDbSet<Location> Locations { get; set; }
    }
}
