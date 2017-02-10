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
    public class RacersController : ApiController
    {
        private readonly IRacerCRUD _racerCRUD;

        public RacersController(IRacerCRUD racerCRUD) : base()
        {
            _racerCRUD = racerCRUD;
        }

        // GET: api/Racers
        [Route("racers")]
        [ResponseType(typeof(IEnumerable<RacerDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            IEnumerable<RacerDTO> returnRacers;
            try
            {
                returnRacers = await _racerCRUD.GetAll();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnRacers);
        }

        // GET: api/Racers/5
        [Route("racers/{id:Guid}")]
        [ResponseType(typeof(RacerDTO))]
        [HttpGet]
        public async Task<IHttpActionResult> Get(Guid id)
        {

            RacerDTO returnRacer;

            try
            {
                returnRacer = await _racerCRUD.Get(id);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            if (returnRacer == null)
                return NotFound();
            else
                return Ok(returnRacer);

        }

        // POST: api/Racers
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Racers/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Racers/5
        [ResponseType(typeof(bool))]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(Guid id)
        {

            bool deleteResult = false;
            try
            {
                deleteResult = await _racerCRUD.Remove(id);
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

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _racerCRUD.Dispose();
            }

            base.Dispose(disposing);

        }
    }
}