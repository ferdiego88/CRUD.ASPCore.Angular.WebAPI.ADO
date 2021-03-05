using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPCoreWithAngular.Interfaces;
using ASPCoreWithAngular.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ASPCoreWithAngular.Controllers
{
    [Route("api/[controller]")]
    public class PersonalController : Controller
    {
        private readonly IPersonal objemployee;

        public PersonalController(IPersonal _objemployee)
        {
            objemployee = _objemployee;
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<Personal> Index()
        {
            return objemployee.GetAllPersonal();
        }

        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] Personal employee)
        {
            return objemployee.AddPersonal(employee);
        }

        [HttpGet]
        [Route("Details/{id}")]
        public Personal Details(int id)
        {
            return objemployee.GetPersonalData(id);
        }

        [HttpPut]
        [Route("Edit")]
        public int Edit([FromBody]Personal employee)
        {
            return objemployee.UpdatePersonal(employee);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return objemployee.DeletePersonal(id);
        }

        //[HttpGet]
        //[Route("GetCityList")]
        //public IEnumerable<City> Details()
        //{
        //    return objemployee.GetCities();
        //}
    }
}
