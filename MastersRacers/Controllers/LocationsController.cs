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
    public class LocationsController : ApiController
    {
        private readonly ILocationCRUD _locationCRUD;

        public LocationsController(ILocationCRUD locationCRUD):base()
        {
            _locationCRUD = locationCRUD;
        }

        // GET api/<controller>
        [Route("locations")]
        [ResponseType(typeof(IEnumerable<LocationDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            IEnumerable<LocationDTO> returnLocations;
            try
            {
                returnLocations = await _locationCRUD.GetAll();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnLocations);
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [Route("location")]
        [ResponseType(typeof(LocationDTO))]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]LocationDTO value)
        {
            LocationDTO returnResult;

            try
            {
                returnResult = await _locationCRUD.Put(value);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnResult);

        }

        // PUT api/<controller>/5
        [Route("location/{id:Guid}")]
        [ResponseType(typeof(LocationDTO))]
        [HttpPut]
        public async Task<IHttpActionResult> Put(Guid id, [FromBody]LocationDTO value)
        {
            LocationDTO returnResult;

            try
            {
                returnResult = await _locationCRUD.Put(value);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnResult);
        }

        // DELETE api/<controller>/5
        [Route("location/{id:Guid}")]
        [ResponseType(typeof(bool))]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            bool deleteResult = false;
            try
            {
                deleteResult = await _locationCRUD.Remove(id);
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