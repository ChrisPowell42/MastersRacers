using AutoMapper;
using MastersRacers.Data.Models;
using MastersRacers.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        }

    }
}
