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
    public interface ISaveNewsItemCommand: ISaveCommand<NewsItem>
    {

    }

    public class SaveNewsItemCommand: SaveCommand<NewsItem>, ISaveNewsItemCommand
    {
        public SaveNewsItemCommand(IRaceContext raceContext): base(raceContext)
        {

        }

        protected override async Task<NewsItem> Add(NewsItem toSave)
        {
            toSave.Id = Guid.NewGuid();

            _dbContext.Set<NewsItem>().Add(toSave);
            _dbContext.Entry(toSave.ArticleType).State = EntityState.Unchanged;

            await _dbContext.SaveChangesAsync();

            return toSave;

        }

    }
}
