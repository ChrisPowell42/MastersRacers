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
    public class SeasonsController : ApiController
    {
        private readonly ISeasonCRUD _seasonCRUD;

        public SeasonsController(ISeasonCRUD seasonCRUD) : base()
        {
            _seasonCRUD = seasonCRUD;
        }

        // GET: api/Seasons
        [Route("seasons")]
        [ResponseType(typeof(IEnumerable<SeasonDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            IEnumerable<SeasonDTO> returnSeasons;
            try
            {
                returnSeasons = await _seasonCRUD.GetAll();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnSeasons);
        }

        // GET: api/Seasons/5
        [Route("season/active")]
        [ResponseType(typeof(SeasonDTO))]
        [HttpGet]
        public async Task<IHttpActionResult> GetActive()
        {
            SeasonDTO returnValue = null;

            try
            {
                returnValue = await _seasonCRUD.GetActiveSeason();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnValue);
        }

        // PUT: api/Seasons/5
        [Route("season/{id:Guid}")]
        [ResponseType(typeof(SeasonDTO))]
        [HttpPut]
        public async Task<IHttpActionResult> Put(Guid id, [FromBody]SeasonDTO value)
        {
            if (id.Equals(Guid.Empty))
            {
                SeasonDTO createdSeason = null;

                try
                {
                    createdSeason = await _seasonCRUD.CreateActiveSeason();
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }

                return Ok(createdSeason);

            }
            else
            {
                SeasonDTO returnValue = null;

                try
                {
                    returnValue = await _seasonCRUD.Put(value);
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }

                return Ok(returnValue);
            }
        }

        // DELETE: api/Seasons/5
        public void Delete(int id)
        {
        }
    }
}