using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Newsletters
{
    public class NewslettersSubscriptions
    {
        public string Email { get; set; }
        public bool IsSubscribed { get; set; }
    }
}
