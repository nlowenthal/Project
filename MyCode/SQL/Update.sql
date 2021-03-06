USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_Update]    Script Date: 5/3/2022 2:35:41 PM ******/
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
-- Note: Works as supposed to.
-- ===============================================


ALTER PROC [dbo].[Newsletters_Update]
				@TemplateId int
				,@Name nvarchar(100)
				,@Link nvarchar(255)
				,@CoverPhoto nvarchar(255)
				,@DateToPublish datetime2(7)
				,@CreatedBy int
				,@Id int

as

/*
DECLARE @Id int = 5;
DECLARE @TemplateId int = 3
		,@Name nvarchar(100) = 'test update 3'
		,@Link nvarchar(255) = 'https://mexiconewsdaily.com/news/coronavirus/canada-imposes-mandatory-quarantine-for-travelers/'
		,@CoverPhoto nvarchar(255) = 'https://semfgnqp2z.exactdn.com/wp-content/uploads/2021/01/trudeau.jpg?strip=all&lossy=1&ssl=1'
		,@DateToPublish datetime2(7) = '2020-03-22'
		,@CreatedBy int = 2

		Execute [dbo].[Newsletters_Update]
								@TemplateId
								,@Name
								,@Link
								,@CoverPhoto
								,@DateToPublish
								,@CreatedBy
								,@Id

SELECT * From dbo.Newsletters

*/

BEGIN
		Declare @DateModified datetime2(7) = getutcdate()

		UPDATE [dbo].[Newsletters]
		   SET [TemplateId] = @TemplateId
			  ,[Name] = @Name
			  ,[Link] = @Link
			  ,[CoverPhoto] = @CoverPhoto
			  ,[DateToPublish] = @DateToPublish
			  ,[CreatedBy] = @CreatedBy
			  ,[DateModified] = @DateModified
      
 
		 WHERE @Id = Id

END


