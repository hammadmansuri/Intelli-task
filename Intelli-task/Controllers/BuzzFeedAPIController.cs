using Intelli_task.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;


namespace Intelli_task.Controllers
{
    [RoutePrefix("api")]
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
        [Route("GetBuzzFeedVideos")]
        public HttpResponseMessage BuzzFeedVideos(int page)
        {


            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage httpResponse = client.GetAsync("https://www.buzzfeed.com/api/v2/feeds/videos?p="+page).Result;

            if (httpResponse.IsSuccessStatusCode)
                return httpResponse;
            else
                return default(HttpResponseMessage);


        }

        [Authorize(Roles ="Interviewer")]
        [Route("GetInterviewers")]
        public List<Database> GetInterviewers()
        {
            return new InterviewerDatabase();
        }

        [Route("GetInterviewees")]
        public List<Database> GetInterviewees()
        {
            return new IntervieweeDatabase();
        }
    }
}