using MastersRacers.Data.CommandObjects;
using MastersRacers.Data.CommandObjects.RaceEventCommands;
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

            container.RegisterType<IRaceResultCRUD, RaceResultCRUD>();

            container.RegisterType<IRemoveCommand<Racer>, RemoveCommand<Racer>>();
            container.RegisterType<IGetAllCommand<Racer>, GetAllRacersCommand>();
            container.RegisterType<IGetActiveRacersCommand, GetActiveRacersCommand>();
            container.RegisterType<ISaveRacerCommand, SaveRacerCommand>();
            container.RegisterType<IGetRacerCommand, GetRacerCommand>();

            container.RegisterType<IRacerCRUD, RacerCRUD>();

            container.RegisterType<IGetAllCommand<Location>, GetAllCommand<Location>>();
            container.RegisterType<IRemoveCommand<Location>, RemoveCommand<Location>>();
            container.RegisterType<ISaveCommand<Location>, SaveCommand<Location>>();

            container.RegisterType<ILocationCRUD, LocationCRUD>();

            container.RegisterType<IGetAllCommand<Season>, GetAllCommand<Season>>();
            container.RegisterType<ISaveCommand<Season>, SaveCommand<Season>>();
            container.RegisterType<ICreateActiveSeasonCommand, CreateActiveSeasonCommand>();
            container.RegisterType<IGetActiveSeasonCommand, GetActiveSeasonCommand>();
            container.RegisterType<ISetActiveSeasonCommand, SetActiveSeasonCommand>();

            container.RegisterType<ISeasonCRUD, SeasonCRUD>();

            container.RegisterType<IGetAllCommand<RaceEvent>, GetAllCommand<RaceEvent>>();
            container.RegisterType<IRemoveCommand<RaceEvent>, RemoveCommand<RaceEvent>>();
            container.RegisterType<IGetActiveSeasonRaceEventsCommand, GetActiveSeasonRaceEventsCommand>();
            container.RegisterType<ISaveRaceEventCommand, SaveRaceEventCommand>();
            container.RegisterType<IGetCommand<RaceEvent>, GetCommand<RaceEvent>>();
            container.RegisterType<IRaceEventCRUD, RaceEventCRUD>();

            container.RegisterType<IGetAllCommand<RaceFormat>, GetAllCommand<RaceFormat>>();
            container.RegisterType<IGetAllCommand<RaceSeries>, GetAllCommand<RaceSeries>>();
            container.RegisterType<IGetAllCommand<RacePhase>, GetAllCommand<RacePhase>>();

            container.RegisterType<IRefDataReader, RefDataReader>();

        }

    }
}
