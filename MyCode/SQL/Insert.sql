USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_Insert]    Script Date: 5/3/2022 2:35:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Nicholas Lowenthal
-- Create date: 04/02/2022
-- Description: This proc is used to insert a newletter into dbo.Newletters table
-- Code Reviewer: Barnett Fischer

-- MODIFIED BY: Nicholas Lowenthal
-- MODIFIED DATE:04/02/2022
-- Code Reviewer: Barnett Fischer
-- Note: Works Beautifully!
-- ===============================================

ALTER PROC [dbo].[Newsletters_Insert]
						@TemplateId int
						,@Name nvarchar(100)
						,@Link nvarchar(255)
						,@CoverPhoto nvarchar(255)
						,@DateToPublish datetime2(7)
						,@CreatedBy int
						,@Id int OUTPUT
as

/*

DECLARE @Id int = 0;
DECLARE @TemplateId int = 2
		,@Name nvarchar(100) = 'Canada imposes mandatory quarantine for travelers, suspends Mexico flights'
		,@Link nvarchar(255) = 'https://mexiconewsdaily.com/news/coronavirus/canada-imposes-mandatory-quarantine-for-travelers/'
		,@CoverPhoto nvarchar(255) = 'https://semfgnqp2z.exactdn.com/wp-content/uploads/2021/01/trudeau.jpg?strip=all&lossy=1&ssl=1'
		,@DateToPublish datetime2(7) = '2021-01-29'
		,@CreatedBy int = 1

		Execute [dbo].[Newsletters_Insert]
								@TemplateId
								,@Name
								,@Link
								,@CoverPhoto
								,@DateToPublish
								,@CreatedBy
								,@Id OUTPUT

SELECT * From dbo.Newsletters

*/

BEGIN		

		 INSERT INTO [dbo].[Newsletters]
			   ([TemplateId]
			   ,[Name]
			   ,[Link]
			   ,[CoverPhoto]
			   ,[DateToPublish]
			   ,[CreatedBy]
			   )
		 VALUES
			   (@TemplateId
			   ,@Name
			   ,@Link
			   ,@CoverPhoto
			   ,@DateToPublish
			   ,@CreatedBy
			   )

		SET @Id = SCOPE_IDENTITY()

END


