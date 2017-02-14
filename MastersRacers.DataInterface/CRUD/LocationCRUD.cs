﻿using AutoMapper;
using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.CommandObjects.LocationCommands;
using MastersRacers.Data.Models;
using MastersRacers.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DataInterface.CRUD
{

    public interface ILocationCRUD : IDisposable
    {
        Task<ICollection<LocationDTO>> GetAll();
        Task<LocationDTO> Get(Guid id);
        Task<bool> Remove(Guid id);
        Task<LocationDTO> Put(LocationDTO location);

    }
    public class LocationCRUD : ILocationCRUD
    {
        private readonly IGetAllCommand<Location> _getAllLocationsCmd;
        private readonly IRemoveLocationCommand _removeLocationCmd;
        private readonly ISaveCommand<Location> _saveLocationCmd;

        private readonly IMapper _mapper;

        public LocationCRUD(IGetAllCommand<Location> getAllLocationsCmd,
                            IRemoveLocationCommand removeLocationCmd,
                            ISaveCommand<Location> saveLocationCmd,
                            IMapper mapper)
        {
            _getAllLocationsCmd = getAllLocationsCmd;
            _removeLocationCmd = removeLocationCmd;
            _saveLocationCmd = saveLocationCmd;
            _mapper = mapper;
        }

        public Task<LocationDTO> Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<LocationDTO>> GetAll()
        {
            ICollection<Location> locations = await _getAllLocationsCmd.GetAll();
            ICollection<LocationDTO> locationDTOs = _mapper.Map<ICollection<LocationDTO>>(locations);

            return locationDTOs;
        }

        public async Task<LocationDTO> Put(LocationDTO location)
        {
            Location toSave = _mapper.Map<Location>(location);
            Location saved = await _saveLocationCmd.Save(toSave);
            LocationDTO dtoLocation = _mapper.Map<LocationDTO>(saved);

            return dtoLocation;

        }

        public async Task<bool> Remove(Guid id)
        {
            return await _removeLocationCmd.RemoveLocation(id);
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _getAllLocationsCmd.Dispose();
                    _removeLocationCmd.Dispose();
                    _saveLocationCmd.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~LocationCRUD() {
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
