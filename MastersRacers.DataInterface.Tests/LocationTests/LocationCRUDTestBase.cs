using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MastersRacers.DataInterface.CRUD;
using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.Models;
using Moq;
using AutoMapper;
using MastersRacers.Tests;

namespace MastersRacers.DataInterface.Tests.LocationTests
{
    [TestClass]
    public abstract class LocationCRUDTestBase : TestBase<LocationCRUD>
    {

        protected Mock<IGetAllCommand<Location>> _getAllCommandMock;
        protected Mock<IRemoveCommand<Location>> _removeCommandMock;
        protected Mock<ISaveCommand<Location>> _saveLocationMock;

        protected Mock<IMapper> _mapperMock;

        public LocationCRUDTestBase(): base()
        {
            //_testObject = new LocationCRUD()
        }

        protected override void Arrange()
        {

            _getAllCommandMock = new Mock<IGetAllCommand<Location>>();
            _removeCommandMock = new Mock<IRemoveCommand<Location>>();
            _saveLocationMock = new Mock<ISaveCommand<Location>>();
            _mapperMock = new Mock<IMapper>();

            ArrangeLocationCRUD();

            _testObject = new LocationCRUD(_getAllCommandMock.Object, _removeCommandMock.Object, _saveLocationMock.Object, _mapperMock.Object);

        }

        protected abstract void ArrangeLocationCRUD();
        
    }
}
