using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.CommandObjects.LocationCommands;
using MastersRacers.Data.CommandObjects.RacerCommands;
using MastersRacers.Data.CommandObjects.SeasonCommands;
using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
using MastersRacers.Data.Models.RefData;
using MastersRacers.DataInterface.CRUD;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DataInterface.Startup
{
    public static class DataUnityConfig
    {
        public static void ConfigureContainer(IUnityContainer container)
        {
            container.RegisterType<IRaceContext, RaceContext>();

            container.RegisterType<IRemoveRacerCommand, RemoveRacerCommand>();
            container.RegisterType<IGetAllCommand<Racer>, GetAllCommand<Racer>>();
            container.RegisterType<ISaveRacerCommand, SaveRacerCommand>();
            container.RegisterType<IGetRacerCommand, GetRacerCommand>();

            container.RegisterType<IRacerCRUD, RacerCRUD>();

            container.RegisterType<IGetAllCommand<Location>, GetAllCommand<Location>>();
            container.RegisterType<IRemoveLocationCommand, RemoveLocationCommand>();
            container.RegisterType<ISaveCommand<Location>, SaveCommand<Location>>();

            container.RegisterType<ILocationCRUD, LocationCRUD>();

            container.RegisterType<IGetAllCommand<Season>, GetAllSeasonsCommand>();
            container.RegisterType<ISaveCommand<Season>, SaveCommand<Season>>();
            container.RegisterType<ICreateActiveSeasonCommand, CreateActiveSeasonCommand>();

            container.RegisterType<ISeasonCRUD, SeasonCRUD>();

            container.RegisterType<IRaceEventCRUD, RaceEventCRUD>();

            container.RegisterType<IGetAllCommand<RaceFormat>, GetAllCommand<RaceFormat>>();
            container.RegisterType<IGetAllCommand<RaceSeries>, GetAllCommand<RaceSeries>>();

            container.RegisterType<IRefDataReader, RefDataReader>();


        }

    }
}
