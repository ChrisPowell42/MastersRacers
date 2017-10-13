using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MastersRacers.Data.Models;
using System.Collections.Generic;
using MastersRacers.DTOs;
using System.Threading.Tasks;
using System.Collections.ObjectModel;
using Moq;

namespace MastersRacers.DataInterface.Tests.LocationTests
{
    //These tests are pretty straight forward.
    //The class under test isn't all that complicated either.
    //These tests were created to practice creating tests using AAA technique.

    [TestClass]
    public class GetAllTests : LocationCRUDTestBase
    {

        private ICollection<LocationDTO> _result;

        private ICollection<Location> _getResult;
        private ICollection<LocationDTO> _mappedResults;

        protected override void ArrangeLocationCRUD()
        {
            _getResult = new Collection<Location>();
            _mappedResults = new Collection<LocationDTO>();

            _getAllCommandMock.Setup(x => x.GetAll()).Returns(Task.FromResult(_getResult));
            _mapperMock.Setup(x => x.Map<ICollection<LocationDTO>>(_getResult)).Returns(_mappedResults);

        }


        protected override async void Act()
        {
            _result = await _testObject.GetAll();
        }

        [TestMethod]
        public void GetAllCommandCalled()
        {
            _getAllCommandMock.Verify(x => x.GetAll(), Times.Once());
        }

        [TestMethod]
        public void MapperMapIsCalled()
        {
            _mapperMock.Verify(x => x.Map<ICollection<LocationDTO>>(_getResult), Times.Once());
        }

        [TestMethod]
        public void ResultIsMappedResults()
        {
            Assert.AreSame(_result, _mappedResults);
        }

    }
}
