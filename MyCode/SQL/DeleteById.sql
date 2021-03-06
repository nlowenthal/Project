USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Newsletters_DeleteById]    Script Date: 5/3/2022 2:35:54 PM ******/
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
-- Note: Works Correctly
-- ===============================================


ALTER PROC [dbo].[Newsletters_DeleteById]
							@Id int

as

/*
	Select * From dbo.Newsletters

	Declare @Id int = 5;

	Execute dbo.Newsletters_DeleteById @Id

	Select * From dbo.Newsletters

*/

BEGIN

DELETE FROM [dbo].[Newsletters]
      WHERE @Id = Id

END
