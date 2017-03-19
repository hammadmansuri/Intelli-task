using System.Linq;
using System.Web.Http;

namespace Intelli_task.Controllers
{
    [RoutePrefix("api/roles")]
    public class RolesController : BaseApiController
    {

        [Route("GetAllRoles")]
        public IHttpActionResult GetAllRoles()
        {
            var roles = this.AppRoleManager.Roles;

            return Ok(roles.ToList());
        }

    }
}