USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_SelectById]    Script Date: 5/3/2022 2:35:44 PM ******/
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
-- Note: Works Great
-- ===============================================


ALTER PROC [dbo].[Newsletters_SelectById]
							@Id int

as

/*

	Declare @Id int = 5;

	Execute dbo.Newsletters_SelectById @Id 

*/

BEGIN

SELECT [Id]
      ,[TemplateId]
      ,[Name]
      ,[Link]
      ,[CoverPhoto]
      ,[DateToPublish]
      ,[DateCreated]
      ,[DateModified]
      ,[CreatedBy]
  FROM [dbo].[Newsletters]
  Where @Id = Id

END