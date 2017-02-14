using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.CommandObjects.LocationCommands;
using MastersRacers.Data.CommandObjects.RacerCommands;
using MastersRacers.Data.CommandObjects.SeasonCommands;
using MastersRacers.Data.Contexts;
using MastersRacers.Data.Models;
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
            container.RegisterType<IGetRacerCommand, GetRacerCommand>();
            container.RegisterType<ISaveCommand<Racer>, SaveCommand<Racer>>();

            container.RegisterType<IRacerCRUD, RacerCRUD>();

            container.RegisterType<IGetAllCommand<Location>, GetAllCommand<Location>>();
            container.RegisterType<IRemoveLocationCommand, RemoveLocationCommand>();
            container.RegisterType<ISaveCommand<Location>, SaveCommand<Location>>();

            container.RegisterType<ILocationCRUD, LocationCRUD>();

            container.RegisterType<IGetAllCommand<Season>, GetAllSeasonsCommand>();
            container.RegisterType<ISaveCommand<Season>, SaveCommand<Season>>();
            container.RegisterType<ICreateActiveSeasonCommand, CreateActiveSeasonCommand>();

            container.RegisterType<ISeasonCRUD, SeasonCRUD>();

        }

    }
}
