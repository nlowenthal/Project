USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_SelectAll]    Script Date: 5/3/2022 2:35:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nicholas Lowenthal
-- Create date: 04/02/2022
-- Description: This proc is used to Update a current newletter in dbo.Newletters table
-- Code Reviewer: Barnett Fischer

-- MODIFIED BY: Nicholas Lowenthal
-- MODIFIED DATE:04/02/2022
-- Code Reviewer: Barnett Fischer
-- Note: Pagination Tested works fine
-- ===============================================

ALTER PROC [dbo].[Newsletters_SelectAll]
							@pageIndex int
							,@pageSize int

as

/*

	Declare @pageIndex int = 0
			,@pageSize int = 100

	Execute dbo.Newsletters_SelectAll
								@pageIndex
								,@pageSize

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
		  Order by Id
		  Offset @offset Row
		  Fetch Next @pageSize Row Only

END


