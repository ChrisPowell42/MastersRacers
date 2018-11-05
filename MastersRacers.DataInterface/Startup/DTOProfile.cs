using AutoMapper;
using MastersRacers.Data.Models;
using MastersRacers.Data.Models.RefData;
using MastersRacers.DTOs;
using MastersRacers.DTOs.RefData;
using System;

namespace MastersRacers.DataInterface.Startup
{
    public class DTOProfile : Profile
    {
        public DTOProfile()
        {
            CreateMap<DateTime, DateTime>().ConvertUsing(i => DateTime.SpecifyKind(i, DateTimeKind.Utc));

            CreateMap<RacerDTO, Racer>();
            CreateMap<Racer, RacerDTO>();

            CreateMap<LocationDTO, Location>();
            CreateMap<Location, LocationDTO>();

            CreateMap<SeasonDTO, Season>();
            CreateMap<Season, SeasonDTO>();

            CreateMap<RaceEventDTO, RaceEvent>();
            CreateMap<RaceEvent, RaceEventDTO>();

            CreateMap<RaceEventTypeDTO, RaceEventType>();
            CreateMap<RaceEventType, RaceEventTypeDTO>();

            CreateMap<RaceFormatDTO, RaceFormat>();
            CreateMap<RaceFormat, RaceFormatDTO>();

            CreateMap<RaceSeriesDTO, RaceSeries>();
            CreateMap<RaceSeries, RaceSeriesDTO>();

            CreateMap<RacePhaseDTO, RacePhase>();
            CreateMap<RacePhase, RacePhaseDTO>();

            CreateMap<ArticleTypeDTO, ArticleType>();
            CreateMap<ArticleType, ArticleTypeDTO>();

            CreateMap<NewsItemDTO, NewsItem>();
            CreateMap<NewsItem, NewsItemDTO>();

            CreateMap<RaceResult, RaceResultDTO>();
            CreateMap<RaceResultDTO, RaceResult>();

            CreateMap<RunResult, RunResultDTO>();
            CreateMap<RunResultDTO, RunResult>();

        }

    }
}
