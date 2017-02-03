using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MastersRacers.DataInterface.CRUD;
using MastersRacers.DTOs;

namespace MastersRacers.Controllers
{
    public class RacersController : Controller
    {
        private readonly IRacerCRUD _racerCrud;

        public RacersController(IRacerCRUD racerCrud)
        {
            _racerCrud = racerCrud;
        }

        // GET: Racers
        public async Task<ActionResult> Index()
        {
            return View(await _racerCrud.GetAll());
        }

        // GET: Racers/Details/5
        public async Task<ActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RacerDTO racer = await _racerCrud.Get(id.Value);
            if (racer == null)
            {
                return HttpNotFound();
            }
            return View(racer);
        }

        // GET: Racers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Racers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "ID,Name,BibNumber,RaceSeries")] RacerDTO racer)
        {
            if (ModelState.IsValid)
            {
                bool success = await _racerCrud.Put(racer);

                if (success)
                    return RedirectToAction("Index");
                else
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            return View(racer);
        }

        // GET: Racers/Edit/5
        public async Task<ActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RacerDTO racer = await _racerCrud.Get(id.Value);
            if (racer == null)
            {
                return HttpNotFound();
            }
            return View(racer);
        }

        // POST: Racers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "ID,Name,BibNumber,RaceSeries")] RacerDTO racer)
        {
            if (ModelState.IsValid)
            {
                bool success = await _racerCrud.Put(racer);

                if (success)
                    return RedirectToAction("Index");
                else
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            return View(racer);
        }

        // GET: Racers/Delete/5
        public async Task<ActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RacerDTO racer = await _racerCrud.Get(id.Value);
            if (racer == null)
            {
                return HttpNotFound();
            }
            return View(racer);
        }

        // POST: Racers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid id)
        {
            await _racerCrud.Remove(id);
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            //if (disposing)
            //{
            //    db.Dispose();
            //}
            //base.Dispose(disposing);
        }
    }
}
