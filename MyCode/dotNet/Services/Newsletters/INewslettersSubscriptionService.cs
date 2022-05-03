using Sabio.Models.Requests.NewsletterSubsctiption;

namespace Sabio.Services.Newsletters
{
    public interface INewslettersSubscriptionService
    {
        void Update(NewsletterSubscriptionAddRequest model);
    }
}