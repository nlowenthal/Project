using Sabio.Models;
using Sabio.Models.Requests.NewsletterRequests;
using Sabio.Models.Domain.Newsletters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces.Newsletters
{
    public interface INewsletterService
    {
        int Add(NewsletterAddRequest model);
        void Update(NewsletterUpdateRequest model);
        List<Newsletter> GetById(int id);
        Paged<Newsletter> Pagination(int pageIndex, int pageSize);
        Paged<Newsletter> Search(string query, int pageIndex, int pageSize);
        void DeleteById(int id);
    }
}
