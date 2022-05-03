using Sabio.Data.Providers;
using Sabio.Models.Requests.NewsletterSubsctiption;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Newsletters
{
    public class NewslettersSubscriptionService : INewslettersSubscriptionService
    {
        IDataProvider _data = null;

        public NewslettersSubscriptionService(IDataProvider data)
        {
            _data = data;
        }
        public void Update(NewsletterSubscriptionAddRequest model)
        {
            string procName = "[dbo].[NewsletterSubscriptions_Unsubscribe_V2]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", model.Email);
            });
        }
    }
}
