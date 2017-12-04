using MastersRacers.DataInterface.CRUD;
using MastersRacers.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace MastersRacers.Controllers
{
    [RoutePrefix("api")]
    public class RaceEventController : ApiController
    {
        private readonly IRaceEventCRUD _raceEventCRUD;

        public RaceEventController(IRaceEventCRUD raceEventCRUD) : base()
        {
            _raceEventCRUD = raceEventCRUD;
        }

        [Route("raceevents/active")]
        [ResponseType(typeof(ICollection<RaceEventDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetActive()
        {
            ICollection<RaceEventDTO> returnValues = null;

            try
            {
                returnValues = await _raceEventCRUD.GetAllActiveSeasonRaces();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnValues);

        }

        [Route("raceevents/active/eventtype/{raceEventTypeId:guid}")]
        public async Task<IHttpActionResult> GetActiveByType(Guid raceEventTypeId)
        {
            ICollection<RaceEventDTO> returnValues = null;

            try
            {
                returnValues = await _raceEventCRUD.GetActiveSeasonEventsByType(raceEventTypeId);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnValues);

        }


        [Route("raceevents")]
        [ResponseType(typeof(ICollection<RaceEventDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetAll()
        {
            ICollection<RaceEventDTO> returnValues = null;

            try
            {
                returnValues = await _raceEventCRUD.GetAll();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnValues);

        }

        [Route("raceevent/{id:guid}")]
        [ResponseType(typeof(RaceEventDTO))]
        [HttpGet]
        public async Task<IHttpActionResult> GetRaceEvent(Guid id)
        {
            RaceEventDTO returnRaceEvent = null;

            try
            {
                returnRaceEvent = await _raceEventCRUD.Get(id);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnRaceEvent);
        }

        [Route("raceevents/next/{count:int}")]
        [ResponseType(typeof(ICollection<RaceEventDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetNextRaceEvents(int count)
        {
            ICollection<RaceEventDTO> returnValues = null;

            try
            {
                returnValues = await _raceEventCRUD.GetNextRaceEvents(count);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnValues);
        }

        [Route("raceevents/active/race/phase/{id:guid}")]
        [ResponseType(typeof(ICollection<RaceEventDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetActivePhaseRaces(Guid id)
        {
            ICollection<RaceEventDTO> returnValues = null;

            try
            {
                returnValues = await _raceEventCRUD.GetAllActiveSeasonPhaseRaces(id);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnValues);
        }

        // POST api/<controller>
        [Route("raceevent")]
        [ResponseType(typeof(RaceEventDTO))]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]RaceEventDTO value)
        {
            RaceEventDTO returnResult;

            try
            {
                returnResult = await _raceEventCRUD.Put(value);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnResult);

        }

        // POST api/<controller>
        [Route("raceevent/{id:Guid}")]
        [ResponseType(typeof(RaceEventDTO))]
        [HttpPut]
        public async Task<IHttpActionResult> Put(Guid id, [FromBody]RaceEventDTO value)
        {
            RaceEventDTO returnResult;

            try
            {
                returnResult = await _raceEventCRUD.Put(value);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnResult);

        }


        // DELETE api/<controller>/5
        [Route("raceevent/{id:Guid}")]
        [ResponseType(typeof(bool))]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            bool deleteResult = false;
            try
            {
                deleteResult = await _raceEventCRUD.Remove(id);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            if (!deleteResult)
                return NotFound();
            else
                return Ok(deleteResult);
        }

    }
}