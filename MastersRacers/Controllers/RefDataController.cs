﻿using MastersRacers.DataInterface.CRUD;
using MastersRacers.DTOs.RefData;
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
    [RoutePrefix("refdata")]
    public class RefDataController : ApiController
    {
        private readonly IRefDataReader _refDataReader;

        public RefDataController(IRefDataReader refDataReader) : base()
        {
            _refDataReader = refDataReader;
        }


        [Route("raceformats")]
        [ResponseType(typeof(IEnumerable<RaceFormatDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetRaceFormats()
        {
            IEnumerable<RaceFormatDTO> returnValues;
            try
            {
                returnValues = await _refDataReader.GetAllRaceFormats();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnValues);
        }

        [Route("raceseries")]
        [ResponseType(typeof(IEnumerable<RaceSeriesDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetRaceSeries()
        {
            IEnumerable<RaceSeriesDTO> returnValues;
            try
            {
                returnValues = await _refDataReader.GetAllRaceSeries();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnValues);
        }

    }
}