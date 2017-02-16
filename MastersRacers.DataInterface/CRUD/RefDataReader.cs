using AutoMapper;
using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.Models.RefData;
using MastersRacers.DTOs.RefData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DataInterface.CRUD
{
    public interface IRefDataReader : IDisposable
    {
        Task<ICollection<RaceFormatDTO>> GetAllRaceFormats();
        Task<ICollection<RaceSeriesDTO>> GetAllRaceSeries();
    }

    public class RefDataReader : IRefDataReader
    {

        private readonly IMapper _mapper;
        private readonly IGetAllCommand<RaceFormat> _getAllRaceFormatCmd;
        private readonly IGetAllCommand<RaceSeries> _getAllRaceSeriesCmd;

        public RefDataReader(IGetAllCommand<RaceFormat> getAllRaceFormatCmd, 
                             IGetAllCommand<RaceSeries> getAllRaceSeriesCmd,
                             IMapper mapper)
        {
            _getAllRaceFormatCmd = getAllRaceFormatCmd;
            _getAllRaceSeriesCmd = getAllRaceSeriesCmd;

            _mapper = mapper;
        }

        public async Task<ICollection<RaceFormatDTO>> GetAllRaceFormats()
        {
            ICollection<RaceFormat> allRaceFormats = await _getAllRaceFormatCmd.GetAll();
            ICollection<RaceFormatDTO> returnValues = _mapper.Map<ICollection<RaceFormatDTO>>(allRaceFormats);

            return returnValues;
        }

        public async Task<ICollection<RaceSeriesDTO>> GetAllRaceSeries()
        {
            ICollection<RaceSeries> allRaceSeries = await _getAllRaceSeriesCmd.GetAll();
            ICollection<RaceSeriesDTO> returnValues = _mapper.Map<ICollection<RaceSeriesDTO>>(allRaceSeries);

            return returnValues;
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _getAllRaceFormatCmd.Dispose();
                    _getAllRaceSeriesCmd.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~RefDataReader() {
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
