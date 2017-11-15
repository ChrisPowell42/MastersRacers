using AutoMapper;
using Microsoft.Practices.Unity;

namespace MastersRacers.DataInterface.Startup
{
    public static class AutoMapperConfig
    {
        private static MapperConfiguration InitializeAutoMapper()
        {
            MapperConfiguration config = new MapperConfiguration(cfg=>cfg.AddProfile<DTOProfile>());

            return config;
        }


        public static void ContainerConfig(IUnityContainer container)
        {
            IMapper mapper = AutoMapperConfig.InitializeAutoMapper().CreateMapper();
            container.RegisterInstance<IMapper>(mapper);

        }
    }
}
