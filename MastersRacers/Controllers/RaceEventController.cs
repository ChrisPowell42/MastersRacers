﻿using MastersRacers.DataInterface.CRUD;
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


        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}