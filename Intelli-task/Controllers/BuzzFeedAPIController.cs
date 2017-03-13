using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Intelli_task.Controllers
{
    public class BuzzFeedAPIController : ApiController
    {
        // GET Buzzfeed videos Json
        [HttpGet]
        [Route("GetVideos")]
        public IEnumerable<string> GetVideos()
        {
            return new string[] { "some", "video" };
        }

        [Authorize]
        [HttpGet]
        [Route("api/GetBuzzFeedVideos")]
        public HttpResponseMessage BuzzFeedVideos(int page)
        {
            //IHttpActionResult response;
            //HttpResponseMessage responseMsg = new HttpResponseMessage(System.Net.HttpStatusCode.RedirectMethod);
            //responseMsg.Headers.Location = new Uri("http://www.buzzfeed.com/vertical/feeds/shows-soml");
            //response = ResponseMessage(responseMsg);


            var client = new HttpClient();
            client.BaseAddress = new Uri("https://www.buzzfeed.com/api/v2/feeds/videos");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage httpResponse = client.GetAsync("https://www.buzzfeed.com/api/v2/feeds/videos?p="+page).Result;

            if (httpResponse.IsSuccessStatusCode)
            {
                return httpResponse;
            }
            else
                return default(HttpResponseMessage);


        }
    }
}