using MastersRacers.DataInterface.CRUD;
using MastersRacers.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace MastersRacers.Controllers
{
    [System.Web.Http.RoutePrefix("api")]
    public class NewsItemsController : ApiController
    {
        private readonly INewsItemCRUD _newsItemCRUD;

        public NewsItemsController(INewsItemCRUD newsItemCRUD):base()
        {
            _newsItemCRUD = newsItemCRUD;
        }

        [Route("newsitems")]
        [ResponseType(typeof(IEnumerable<NewsItemDTO>))]
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            IEnumerable<NewsItemDTO> returnNewsItems;
            try
            {
                returnNewsItems = await _newsItemCRUD.GetAll();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnNewsItems);
        }

        [Route("newsitem/{id:Guid}")]
        [ResponseType(typeof(NewsItemDTO))]
        [HttpGet]
        public async Task<IHttpActionResult> GetLocation(Guid id)
        {
            NewsItemDTO returnItem;

            try
            {
                returnItem = await _newsItemCRUD.Get(id);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnItem);
        }

        // POST api/<controller>
        [Route("newsitem")]
        [ResponseType(typeof(NewsItemDTO))]
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]NewsItemDTO value)
        {
            NewsItemDTO returnResult;

            try
            {
                returnResult = await _newsItemCRUD.Put(value);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnResult);

        }

        // PUT api/<controller>/5
        [Route("newsitem/{id:Guid}")]
        [ResponseType(typeof(NewsItemDTO))]
        [HttpPut]
        public async Task<IHttpActionResult> Put(Guid id, [FromBody]NewsItemDTO value)
        {
            NewsItemDTO returnResult;

            try
            {
                returnResult = await _newsItemCRUD.Put(value);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

            return Ok(returnResult);
        }


        [Route("newsitem/{id:Guid}")]
        [ResponseType(typeof(bool))]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(Guid id)
        {
            bool deleteResult = false;
            try
            {
                deleteResult = await _newsItemCRUD.Remove(id);
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