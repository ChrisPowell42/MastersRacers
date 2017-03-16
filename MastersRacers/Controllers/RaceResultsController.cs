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
    public class RaceResultsController : ApiController
    {
        private readonly IRaceResultCRUD _raceResultCRUD;

        public RaceResultsController(IRaceResultCRUD raceResultCRUD)
        {
            _raceResultCRUD = raceResultCRUD;
        }

        // GET api/<controller>
        [Route("race/{id:Guid}/raceresults/new")]
        [ResponseType(typeof(IEnumerable<RaceResultDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> GetNewRaceResultSet(Guid id)
        {
            IEnumerable<RaceResultDTO> results = null;

            try
            {
                results = await _raceResultCRUD.BuildRaceResultsForRace(id);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(results);
        }

    }
}