using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MastersRacers.Tests
{
    [TestClass]
    public abstract class TestBase
    {

        public TestBase()
        {
            Arrange();
            Act();

        }

        protected abstract void Arrange();
        protected abstract void Act();

        protected virtual void Cleanup()
        {
            //Nop.
            //child objects to implement any required teardown.
        }

        [TestCleanup]
        ~TestBase()
        {

            Cleanup();

        }

    }

    [TestClass]
    public abstract class TestBase<T> : TestBase where T : class
    {

        protected T _testObject;

        public TestBase(): base()
        {

        }

    }
}
