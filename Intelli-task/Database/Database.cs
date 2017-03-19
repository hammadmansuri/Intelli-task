using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Intelli_task.Models
{
    public class Database
    {
        public string name { get; set; }
        public string technology { get; set; }
    }

    public class InterviewerDatabase : List<Database>
    {
        public InterviewerDatabase()
        {
            Add(new Database() { name = "Mr. Jackson", technology = "MVC" });
            Add(new Database() { name = "Ms. Paul", technology = "AngularJS" });
            Add(new Database() { name = "Mr. Robert", technology = "Database Architecture" });
        }
    }

    public class IntervieweeDatabase : List<Database>
    {
        public IntervieweeDatabase()
        {
            Add(new Database() { name = "Mr. Interviewee 1", technology = "ASP" });
            Add(new Database() { name = "Mr. Interviewee 2", technology = "MVC" });
            Add(new Database() { name = "Mr. Interviewee 3", technology = "Javascript" });
        }
    }
}