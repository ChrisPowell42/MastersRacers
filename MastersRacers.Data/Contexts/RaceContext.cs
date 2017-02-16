using MastersRacers.Data.Models;
using MastersRacers.Data.Models.RefData;
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
        IDbSet<Season> Seasons { get; set; }
        IDbSet<RaceEvent> RaceEvents { get; set; }

        IDbSet<RaceFormat> RaceFormats { get; set; }
        IDbSet<RaceSeries> RaceSeries { get; set; }


        int SaveChanges();
        Task<int> SaveChangesAsync();
        DbEntityEntry Entry(object entry);

        DbSet<T> Set<T>() where T:class;

    }

    public class RaceContext: DbContext, IRaceContext
    {
        public RaceContext() : base("RaceContext")
        {
        }

        public IDbSet<Racer> Racers { get; set; }
        public IDbSet<Location> Locations { get; set; }
        public IDbSet<Season> Seasons { get; set; }
        public IDbSet<RaceEvent> RaceEvents { get; set; }
        public IDbSet<RaceFormat> RaceFormats { get; set; }
        public IDbSet<RaceSeries> RaceSeries { get; set; }

    }
}
