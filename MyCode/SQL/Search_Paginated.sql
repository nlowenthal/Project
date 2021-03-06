USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_Search_Paginated]    Script Date: 5/3/2022 2:35:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nicholas Lowenthal
-- Create date: 04/13/2022
-- Description: This proc is used to Search for a newletter in dbo.Newletters table
-- Code Reviewer: Cong Ha

-- MODIFIED BY: Nicholas Lowenthal
-- MODIFIED DATE:04/13/2022
-- Code Reviewer:Cong Ha
-- Note: Searched as expected
-- ===============================================

ALTER PROC [dbo].[Newsletters_Search_Paginated]
							@pageIndex int
							,@pageSize int
							,@query nvarchar(100)

as

/*
	DECLARE @query nvarchar(100) = 'test'

	Declare @pageIndex int = 0
			,@pageSize int = 100

	Execute dbo.Newsletters_Search_Paginated
								@pageIndex
								,@pageSize
								,@query

*/

BEGIN

		Declare @offset int = @pageIndex * @pageSize

		SELECT [Id]
			  ,[TemplateId]
			  ,[Name]
			  ,[Link]
			  ,[CoverPhoto]
			  ,[DateToPublish]
			  ,[DateCreated]
			  ,[DateModified]
			  ,[CreatedBy]
			  ,TotalCount = Count(1) Over()
		  FROM [dbo].[Newsletters]

		  WHERE (Name LIKE '%' + @Query + '%')

		  Order by Id
		  Offset @offset Row
		  Fetch Next @pageSize Row Only

END