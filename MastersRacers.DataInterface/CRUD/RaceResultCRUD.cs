using AutoMapper;
using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.CommandObjects.RacerCommands;
using MastersRacers.Data.CommandObjects.RaceResultCommands;
using MastersRacers.Data.Models;
using MastersRacers.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DataInterface.CRUD
{
    public interface IRaceResultCRUD :IDisposable
    {
        Task<ICollection<RaceResultDTO>> BuildRaceResultsForRace(Guid raceEventId);
        Task<ICollection<RaceResultDTO>> GetRaceResultsForRace(Guid raceEventId);
    }

    public class RaceResultCRUD : IRaceResultCRUD
    {
        private readonly IGetActiveRacersCommand _getActiveRacersCmd;
        private readonly IGetCommand<RaceEvent> _getRaceEventCmd;
        private readonly IGetRaceResultsForRaceCommand _getRaceResultsForRaceCmd;

        private readonly IMapper _mapper;

        public RaceResultCRUD(IGetActiveRacersCommand getActiveRacersCmd,
                              IGetCommand<RaceEvent> getRaceEventCmd,
                              IGetRaceResultsForRaceCommand getRaceResultsForRaceCmd, 
                              IMapper mapper)
        {
            _getActiveRacersCmd = getActiveRacersCmd;
            _getRaceEventCmd = getRaceEventCmd;
            _getRaceResultsForRaceCmd = getRaceResultsForRaceCmd;

            _mapper = mapper;
        }

        public async Task<ICollection<RaceResultDTO>> BuildRaceResultsForRace(Guid raceEventId)
        {
            RaceEvent currentRace = await _getRaceEventCmd.Get(raceEventId);
            RaceEventDTO currentRaceDTO = _mapper.Map<RaceEventDTO>(currentRace);

            ICollection<Racer> activeRacers = await _getActiveRacersCmd.GetActiveRacers();

            List<RaceResultDTO> returnList = new List<RaceResultDTO>();

            foreach (Racer racer in activeRacers)
            {
                RacerDTO racerDTO = _mapper.Map<RacerDTO>(racer);
                Guid resultID = Guid.NewGuid();
                RaceResultDTO racerResult = new RaceResultDTO
                {
                    Id = resultID,
                    RaceEventId = currentRaceDTO.Id,
                    RaceEvent = currentRaceDTO,
                    RacerId = racerDTO.Id,
                    Racer = racerDTO
                };

                List<RunResultDTO> runResults = new List<RunResultDTO>();
                for (int i = 1; i<= currentRace.RunCount; i++)
                {
                    RunResultDTO runResult = new RunResultDTO {
                        Id = Guid.NewGuid(),
                        RunIdx = i,
                        RunTime = null,
                        IsDNF = false,
                        IsDSQ = false,
                        RaceResultId = resultID,
                    };
                    runResults.Add(runResult);
                }

                racerResult.RunResults = runResults;

                returnList.Add(racerResult);
            }

            return returnList;

        }

        public async Task<ICollection<RaceResultDTO>> GetRaceResultsForRace(Guid raceEventId)
        {
            ICollection<RaceResult> raceResults = await _getRaceResultsForRaceCmd.GetRaceResultsForRace(raceEventId);
            ICollection<RaceResultDTO> raceResultsDTO = _mapper.Map<ICollection<RaceResultDTO>>(raceResults);

            return raceResultsDTO;

        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _getActiveRacersCmd.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~RaceResultCRUD() {
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
