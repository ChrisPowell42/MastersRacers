using MastersRacers.DataInterface.CRUD;
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
    [RoutePrefix("api/refdata")]
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

        [Route("racephases")]
        [ResponseType(typeof(IEnumerable<RacePhaseDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetRacePhases()
        {
            IEnumerable<RacePhaseDTO> returnValues;
            try
            {
                returnValues = await _refDataReader.GetAllRacePhases();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(returnValues);

        }

        [Route("articletypes")]
        [ResponseType(typeof(IEnumerable<ArticleTypeDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetArticleTypes()
        {
            IEnumerable<ArticleTypeDTO> returnValues;
            try
            {
                returnValues = await _refDataReader.GetAllArticleTypes();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(returnValues);

        }

        [Route("raceeventtypes")]
        [ResponseType(typeof(IEnumerable<RaceEventTypeDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetRaceEventTypes()
        {
            IEnumerable<RaceEventTypeDTO> returnValues;

            try
            {
                returnValues = await _refDataReader.GetAllRaceEventTypes();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(returnValues);
        }

    }
}
