using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MastersRacers.DTOs;
using MastersRacers.Data.CommandObjects.RacerCommands;
using MastersRacers.Data.Models;
using AutoMapper;
using MastersRacers.Data.CommandObjects;

namespace MastersRacers.DataInterface.CRUD
{
    public interface IRacerCRUD : IDisposable
    {
        Task<ICollection<RacerDTO>> GetAll();
        Task<RacerDTO> Get(Guid id);
        Task<bool> Remove(Guid id);
        Task<RacerDTO> Put(RacerDTO racer);

    }


    public class RacerCRUD : IRacerCRUD
    {
        private readonly IGetRacerCommand _getRacerCmd;
        private readonly IGetAllCommand<Racer> _getAllRacersCmd;
        private readonly IRemoveRacerCommand _removeRacerCmd;
        private readonly ISaveCommand<Racer> _saveRacerCmd;
        private readonly IMapper _mapper;

        public RacerCRUD(IGetRacerCommand getRacerCmd, 
                         IGetAllCommand<Racer> getAllRacersCmd, 
                         IRemoveRacerCommand removeRacerCmd,
                         ISaveCommand<Racer> saveRacerCmd,
                         IMapper mapper)
        {
            _getRacerCmd = getRacerCmd;
            _getAllRacersCmd = getAllRacersCmd;
            _removeRacerCmd = removeRacerCmd;
            _saveRacerCmd = saveRacerCmd;
            _mapper = mapper;
        }

        public async Task<RacerDTO> Get(Guid id)
        {
            Racer dbRacer =  await _getRacerCmd.GetRacerAsync(id);
            RacerDTO dtoRacer = _mapper.Map<RacerDTO>(dbRacer);

            return dtoRacer;
        }

        public async Task<ICollection<RacerDTO>> GetAll()
        {
            ICollection<Racer> racers = await _getAllRacersCmd.GetAll();
            ICollection<RacerDTO> racerDTOs = _mapper.Map<ICollection<RacerDTO>>(racers);

            return racerDTOs;
        }

        public async Task<RacerDTO> Put(RacerDTO racer)
        {
            Racer toSave = _mapper.Map<Racer>(racer);
            Racer saved = await _saveRacerCmd.Save(toSave);
            RacerDTO dtoRacer = _mapper.Map<RacerDTO>(saved);

            return dtoRacer;
        }

        public async Task<bool> Remove(Guid id)
        {
            return await _removeRacerCmd.RemoveRacer(id);
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _getAllRacersCmd.Dispose();
                    _getRacerCmd.Dispose();
                    _removeRacerCmd.Dispose();
                    _saveRacerCmd.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~RacerCRUD() {
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
