﻿using AutoMapper;
using MastersRacers.Data.Models;
using MastersRacers.Data.Models.RefData;
using MastersRacers.DTOs;
using MastersRacers.DTOs.RefData;

namespace MastersRacers.DataInterface.Startup
{
    public class DTOProfile : Profile
    {
        public DTOProfile()
        {
            CreateMap<RacerDTO, Racer>();
            CreateMap<Racer, RacerDTO>();

            CreateMap<LocationDTO, Location>();
            CreateMap<Location, LocationDTO>();

            CreateMap<SeasonDTO, Season>();
            CreateMap<Season, SeasonDTO>();

            CreateMap<RaceEventDTO, RaceEvent>();
            CreateMap<RaceEvent, RaceEventDTO>();

            CreateMap<RaceFormatDTO, RaceFormat>();
            CreateMap<RaceFormat, RaceFormatDTO>();

            CreateMap<RaceSeriesDTO, RaceSeries>();
            CreateMap<RaceSeries, RaceSeriesDTO>();

        }

    }
}
