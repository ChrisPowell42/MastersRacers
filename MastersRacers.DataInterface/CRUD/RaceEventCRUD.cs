using AutoMapper;
using MastersRacers.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DataInterface.CRUD
{

    public interface IRaceEventCRUD:IDisposable
    {
        Task<ICollection<RaceEventDTO>> GetAll();
        Task<RaceEventDTO> Get(Guid id);
        Task<bool> Remove(Guid id);
        Task<RaceEventDTO> Put(RaceEventDTO racer);
    }

    public class RaceEventCRUD : IRaceEventCRUD
    {

        private readonly IMapper _mapper;

        public RaceEventCRUD(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Task<RaceEventDTO> Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<RaceEventDTO>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<RaceEventDTO> Put(RaceEventDTO racer)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Remove(Guid id)
        {
            throw new NotImplementedException();
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~RaceEventCRUD() {
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
