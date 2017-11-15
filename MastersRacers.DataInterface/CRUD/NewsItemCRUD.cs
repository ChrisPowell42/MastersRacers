using AutoMapper;
using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.Models;
using MastersRacers.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DataInterface.CRUD
{
    public interface INewsItemCRUD: IDisposable
    {

        Task<ICollection<NewsItemDTO>> GetAll();
        Task<NewsItemDTO> Get(Guid id);
        Task<bool> Remove(Guid id);
        Task<NewsItemDTO> Put(NewsItemDTO location);

    }

    public class NewsItemCRUD : INewsItemCRUD
    {
        private readonly IGetCommand<NewsItem> _getNewsItemCmd;
        private readonly IGetAllCommand<NewsItem> _getAllNewsItemCmd;
        private readonly IRemoveCommand<NewsItem> _removeNewsItemCmd;
        private readonly ISaveCommand<NewsItem> _saveNewsItemCmd;

        private readonly IMapper _mapper;

        public NewsItemCRUD(IGetCommand<NewsItem> getNewsItemCmd, 
                            IGetAllCommand<NewsItem> getAllNewsItemCmd,
                            IRemoveCommand<NewsItem> removeNewsItemCmd,
                            ISaveCommand<NewsItem> saveNewsItemCmd,
                            IMapper mapper)
        {
            _getNewsItemCmd = getNewsItemCmd;
            _getAllNewsItemCmd = getAllNewsItemCmd;
            _removeNewsItemCmd = removeNewsItemCmd;
            _saveNewsItemCmd = saveNewsItemCmd;

            _mapper = mapper;

        }

        public async Task<NewsItemDTO> Get(Guid id)
        {
            NewsItem newsItem = await _getNewsItemCmd.Get(id);
            NewsItemDTO newsItemDTO = _mapper.Map<NewsItemDTO>(newsItem);

            return newsItemDTO;
        }

        public async Task<ICollection<NewsItemDTO>> GetAll()
        {
            ICollection<NewsItem> newsItems = await _getAllNewsItemCmd.GetAll();
            ICollection<NewsItemDTO> newsItemsDTOs = _mapper.Map<ICollection<NewsItemDTO>>(newsItems.OrderByDescending(x => x.PostedBy));

            return newsItemsDTOs;
        }

        public async Task<NewsItemDTO> Put(NewsItemDTO location)
        {
            NewsItem toSave = _mapper.Map<NewsItem>(location);
            NewsItem saved = await _saveNewsItemCmd.Save(toSave);
            NewsItemDTO dtoItem = _mapper.Map<NewsItemDTO>(saved);

            return dtoItem;
        }

        public async Task<bool> Remove(Guid id)
        {
            return await _removeNewsItemCmd.RemoveItem(id);
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _getNewsItemCmd.Dispose();
                    _getAllNewsItemCmd.Dispose();
                    _saveNewsItemCmd.Dispose();
                    _removeNewsItemCmd.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~NewsItemCRUD() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion

    }
}
