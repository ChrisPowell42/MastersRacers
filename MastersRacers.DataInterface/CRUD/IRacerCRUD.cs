using MastersRacers.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MastersRacers.DataInterface.CRUD
{
    public interface IRacerCRUD
    {
        Task<ICollection<RacerDTO>> GetAll();
        Task<RacerDTO> Get(Guid id);
        Task<bool> Remove(Guid id);
        Task<bool> Put(RacerDTO racer);

    }
}
