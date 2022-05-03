using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.NewsletterRequests
{
    public class NewsletterAddRequest
    {
        [Required]
        public int TemplateId { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Link { get; set; }
        public string CoverPhoto { get; set; }
        public DateTime DateToPublish { get; set; }
        [Required]
        public int CreatedBy { get; set; }
    }
}
