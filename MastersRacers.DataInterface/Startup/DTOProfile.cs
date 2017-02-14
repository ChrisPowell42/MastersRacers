using AutoMapper;
using MastersRacers.Data.Models;
using MastersRacers.DTOs;

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

        }

    }
}
