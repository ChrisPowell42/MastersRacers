using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using System.Data.Entity;

namespace MastersRacers.Data.CommandObjects.NewsItemCommands
{
    public interface ISaveNewsItemCommand: ISaveCommand<NewsItem>
    {
    }

    public class SaveNewsItemCommand: SaveCommand<NewsItem>, ISaveNewsItemCommand
    {
        public SaveNewsItemCommand(IRaceContext raceContext): base(raceContext)
        {
        }

        protected override void SetUnchangedItems(NewsItem toSave)
        {
            _dbContext.Entry(toSave.ArticleType).State = EntityState.Unchanged;
        }
    }
}
