﻿using AutoMapper;
using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.CommandObjects.RaceEventCommands;
using MastersRacers.Data.Models;
using MastersRacers.Data.Models.RefData;
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
        Task<ICollection<RaceEventDTO>> GetAllActiveSeasonRaces();
        Task<ICollection<RaceEventDTO>> GetAllActiveSeasonPhaseRaces(Guid phaseId);
        Task<RaceEventDTO> Get(Guid id);
        Task<bool> Remove(Guid id);
        Task<RaceEventDTO> Put(RaceEventDTO racer);
    }

    public class RaceEventCRUD : IRaceEventCRUD
    {

        private readonly IGetAllCommand<RaceEvent> _getAllRaceEventCmd;
        private readonly IGetActiveSeasonRaceEventsCommand _getActiveSeasonRaceEventsCmd;
        private readonly ISaveRaceEventCommand _saveRaceEventCmd;
        private readonly IRemoveCommand<RaceEvent> _removeRaceEventCmd;
        private readonly IGetActiveRaceEventsForPhaseCommand _getActiveRaceForPhaseCmd;
        private readonly IMapper _mapper;

        public RaceEventCRUD(IGetAllCommand<RaceEvent> getAllRaceEventCmd,
                             IGetActiveSeasonRaceEventsCommand getActiveSeasonRaceEventsCmd,
                             IGetActiveRaceEventsForPhaseCommand getActiveRaceForPhaseCmd,
                             ISaveRaceEventCommand saveRaceEventCmd,
                             IRemoveCommand<RaceEvent> removeRaceEventCmd,
                             IMapper mapper)
        {
            _getAllRaceEventCmd = getAllRaceEventCmd;
            _getActiveSeasonRaceEventsCmd = getActiveSeasonRaceEventsCmd;
            _getActiveRaceForPhaseCmd = getActiveRaceForPhaseCmd;
            _saveRaceEventCmd = saveRaceEventCmd;
            _removeRaceEventCmd = removeRaceEventCmd;

            _mapper = mapper;
        }

        public Task<RaceEventDTO> Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<RaceEventDTO>> GetAll()
        {
            ICollection<RaceEvent> allRaceEvents = await _getAllRaceEventCmd.GetAll();
            ICollection<RaceEventDTO> returnValues = _mapper.Map<ICollection<RaceEventDTO>>(allRaceEvents);

            return returnValues;
        }

        public async Task<RaceEventDTO> Put(RaceEventDTO raceEvent)
        {

            if (raceEvent.RacePhaseId.Equals(Guid.Empty))
            {
                raceEvent.RacePhaseId = RacePhase.ScheduledId;
            }

            RaceEvent toSave = _mapper.Map<RaceEvent>(raceEvent);

            RaceEvent saved = await _saveRaceEventCmd.Save(toSave);
            RaceEventDTO dtoRaceEvent = _mapper.Map<RaceEventDTO>(saved);

            return dtoRaceEvent;

        }

        public async Task<bool> Remove(Guid id)
        {
            return await _removeRaceEventCmd.RemoveItem(id);
        }

        public async Task<ICollection<RaceEventDTO>> GetAllActiveSeasonRaces()
        {
            ICollection<RaceEvent> activeRaces = await _getActiveSeasonRaceEventsCmd.GetAll();
            ICollection<RaceEventDTO> returnValues = _mapper.Map<ICollection<RaceEventDTO>>(activeRaces);

            return returnValues.OrderBy(x=>x.ScheduledStartTime).ToList();
        }

        public async Task<ICollection<RaceEventDTO>> GetAllActiveSeasonPhaseRaces(Guid phaseId)
        {
            ICollection<RaceEvent> phaseRaces = await _getActiveRaceForPhaseCmd.GetActiveRacesForPhase(phaseId);
            ICollection<RaceEventDTO> returnValues = _mapper.Map<ICollection<RaceEventDTO>>(phaseRaces);

            return returnValues.OrderBy(x => x.ScheduledStartTime).ToList();
        }


        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _getAllRaceEventCmd.Dispose();
                    _getActiveSeasonRaceEventsCmd.Dispose();
                    _saveRaceEventCmd.Dispose();
                    _removeRaceEventCmd.Dispose();                    
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
