using Database;
using Entities.Dto.Service;
using Entities.Models;
using Logic.Helpers;

namespace Logic.Logic
{
    public interface IServiceLogic
    {
        ServiceViewDto CreateService(ServiceCreateUpdateDto dto);
        void UpdateService(string id, ServiceCreateUpdateDto dto);
        IEnumerable<ServiceViewDto> GetAllServices();
        ServiceViewDto GetServiceById(string id);
        void deleteService(string id);
    }

    public class ServiceLogic : IServiceLogic
    {
        Repository<Service> _serviceRepository;
        DtoProvider _dtoProvider;

        public ServiceLogic(Repository<Service> serviceRepository, DtoProvider dtoProvider)
        {
            _serviceRepository = serviceRepository;
            _dtoProvider = dtoProvider;
        }

        public ServiceViewDto CreateService(ServiceCreateUpdateDto dto)
        {
            Service service = _dtoProvider.Mapper.Map<Service>(dto);
            _serviceRepository.Create(service);
            return _dtoProvider.Mapper.Map<ServiceViewDto>(service);
        }

        public void UpdateService(string id, ServiceCreateUpdateDto dto)
        {
            var old = _serviceRepository.FindById(id);
            _dtoProvider.Mapper.Map(dto, old);
            _serviceRepository.Update(old);
        }

        public IEnumerable<ServiceViewDto> GetAllServices()
        {
            return _serviceRepository.GetAll().Select(x => _dtoProvider.Mapper.Map<ServiceViewDto>(x));
        }

        public ServiceViewDto GetServiceById(string id)
        {
            return _dtoProvider.Mapper.Map<ServiceViewDto>(_serviceRepository.FindById(id));
        }

        public void deleteService(string id)
        {
            _serviceRepository.DeleteById(id);
        }
    }
}
