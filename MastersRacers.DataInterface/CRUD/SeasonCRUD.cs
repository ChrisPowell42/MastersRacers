using AutoMapper;
using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.CommandObjects.SeasonCommands;
using MastersRacers.Data.Models;
using MastersRacers.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DataInterface.CRUD
{
    public interface ISeasonCRUD: IDisposable
    {
        Task<ICollection<SeasonDTO>> GetAll();
        Task<SeasonDTO> Get(Guid id);
        Task<bool> Remove(Guid id);
        Task<SeasonDTO> Put(SeasonDTO toSave);

        Task<SeasonDTO> CreateActiveSeason();

        Task<SeasonDTO> GetActiveSeason();

    }

    public class SeasonCRUD : ISeasonCRUD
    {
        private readonly IGetAllCommand<Season> _getAllSeasonsCmd;
        private readonly ISaveCommand<Season> _saveSeasonCmd;
        private readonly ICreateActiveSeasonCommand _createActiveSeasonCmd;
        private readonly IGetActiveSeasonCommand _getActiveSeasonCmd;

        private readonly IMapper _mapper;

        public SeasonCRUD(IGetAllCommand<Season> getAllSeasonsCmd,
                          ISaveCommand<Season> saveSeasonCmd,
                          ICreateActiveSeasonCommand createActiveSeasonCmd,
                          IGetActiveSeasonCommand getActiveSeasonCmd,
                          IMapper mapper)
        {
            _getAllSeasonsCmd = getAllSeasonsCmd;
            _saveSeasonCmd = saveSeasonCmd;
            _createActiveSeasonCmd = createActiveSeasonCmd;
            _getActiveSeasonCmd = getActiveSeasonCmd;

            _mapper = mapper;
        }

        public Task<SeasonDTO> Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<SeasonDTO>> GetAll()
        {
            ICollection<Season> seasons = await _getAllSeasonsCmd.GetAll();
            ICollection<SeasonDTO> seasonDTOs = _mapper.Map<ICollection<SeasonDTO>>(seasons.OrderByDescending(x=>x.StartYear));

            return seasonDTOs;

        }

        public async Task<SeasonDTO> Put(SeasonDTO season)
        {

            Season toSave = _mapper.Map<Season>(season);
            Season saved = await _saveSeasonCmd.Save(toSave);

            SeasonDTO returnValue = _mapper.Map<SeasonDTO>(saved);

            return returnValue;

        }

        public Task<bool> Remove(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<SeasonDTO> CreateActiveSeason()
        {
            Season newSeason = await _createActiveSeasonCmd.CreateActiveSeason();
            SeasonDTO createdSeason = _mapper.Map<SeasonDTO>(newSeason);

            return createdSeason;
        }
        public async Task<SeasonDTO> GetActiveSeason()
        {
            Season activeSeason = await _getActiveSeasonCmd.GetActiveSeason();
            SeasonDTO returnValue = _mapper.Map<SeasonDTO>(activeSeason);

            return returnValue;
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _getAllSeasonsCmd.Dispose();
                    _saveSeasonCmd.Dispose();
                    _createActiveSeasonCmd.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~SeasonCRUD() {
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
