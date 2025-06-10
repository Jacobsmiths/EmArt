using AutoMapper;
using backend.Identity;
using backend.Models.Users;

namespace server.Configurations;

public class MapperConfig : Profile {
    public MapperConfig() {
        CreateMap<AppUser, AppUserDTO>().ReverseMap();
    }
}