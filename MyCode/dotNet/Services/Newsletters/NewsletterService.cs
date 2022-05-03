using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Newsletters;
using Sabio.Models.Requests.NewsletterRequests;
using Sabio.Services.Interfaces.Newsletters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Newsletters
{
    public class NewsletterService : INewsletterService
    {
        #region -- IDataProvider --
        IDataProvider _data = null;

        public NewsletterService(IDataProvider data)
        {
            _data = data;
        } 
        #endregion

        #region -- Add Newsletter --
        public int Add(NewsletterAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Newsletters_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            }
            , returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                Int32.TryParse(oId.ToString(), out id);
            }
            );

            return id;
        }
        #endregion

        #region -- Update Newsletter --
        public void Update(NewsletterUpdateRequest model)
        {
            string procName = "[dbo].[Newsletters_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
            }
            , returnParameters: null);
        }
        #endregion

        #region -- Get By Id --
        public List<Newsletter> GetById(int id)
        {
            string procName = "[dbo].[Newsletters_SelectById]";
            List<Newsletter> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Newsletter newsletter = new Newsletter();
                newsletter = MapNewsletter(reader, ref startingIndex);
                if (list == null)
                {
                    list = new List<Newsletter>();
                }
                list.Add(newsletter);
            }
            );
            return list;
        }
        #endregion

        #region -- Get a List of Newsletters -- 
        public Paged<Newsletter> Pagination(int pageIndex, int pageSize)
        {
            Paged<Newsletter> pagedList = null;
            List<Newsletter> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Newsletters_SelectAll]";

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@pageIndex", pageIndex);
                param.AddWithValue("@pageSize", pageSize);
            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                Newsletter newsletter = MapNewsletter(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<Newsletter>();
                }
                list.Add(newsletter);
            }
            );
            if (list != null)
            {
                pagedList = new Paged<Newsletter>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        #endregion

        #region -- Get Searched List of Newsletters --
        public Paged<Newsletter> Search(string query, int pageIndex, int pageSize)
        {
            Paged<Newsletter> pagedList = null;

            List<Newsletter> list = null;

            int totalCount = 0;

            string procName = "[dbo].[Newsletters_Search_Paginated]";

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@query", query);
                param.AddWithValue("@pageIndex", pageIndex);
                param.AddWithValue("@pageSize", pageSize);

            },
            (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                Newsletter newsletter = MapNewsletter(reader, ref startingIndex);
                
                if(totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }

                if (list == null)
                {
                    list = new List<Newsletter>();
                }
                list.Add(newsletter);
            }
            );
            if (list != null)
            {
                pagedList = new Paged<Newsletter>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        } 
        #endregion

        #region -- Delete By Id --
        public void DeleteById(int id)
        {
            string procName = "[dbo].[Newsletters_DeleteById]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, returnParameters: null);
        } 
        #endregion

        #region -- Mapped sources --
        private static void AddCommonParams(NewsletterAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@TemplateId", model.TemplateId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Link", model.Link);
            col.AddWithValue("@CoverPhoto", model.CoverPhoto);
            col.AddWithValue("@DateToPublish", model.DateToPublish);
            col.AddWithValue("@CreatedBy", model.CreatedBy);
        }

        private static Newsletter MapNewsletter(IDataReader reader, ref int startingIndex)
        {
            Newsletter newsletter = new Newsletter();

            newsletter.Id = reader.GetSafeInt32(startingIndex++);
            newsletter.TemplateId = reader.GetSafeInt32(startingIndex++);
            newsletter.Name = reader.GetSafeString(startingIndex++);
            newsletter.Link = reader.GetSafeString(startingIndex++);
            newsletter.CoverPhoto = reader.GetSafeString(startingIndex++);
            newsletter.DateToPublish = reader.GetSafeDateTime(startingIndex++);
            newsletter.DateCreated = reader.GetSafeDateTime(startingIndex++);
            newsletter.DateModified = reader.GetSafeDateTime(startingIndex++);
            newsletter.CreatedBy = reader.GetSafeInt32(startingIndex++);

            return newsletter;
        }
        #endregion

        
    }
}
