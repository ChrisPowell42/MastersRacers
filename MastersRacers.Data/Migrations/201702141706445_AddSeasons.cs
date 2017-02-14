namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSeasons : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Seasons",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        StartYear = c.Int(nullable: false),
                        EndYear = c.Int(nullable: false),
                        Notes = c.String(),
                        IsCurrentSeason = c.Boolean(nullable: false, defaultValue:false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SeasonLocations",
                c => new
                    {
                        Season_Id = c.Guid(nullable: false),
                        Location_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.Season_Id, t.Location_Id })
                .ForeignKey("dbo.Seasons", t => t.Season_Id, cascadeDelete: true)
                .ForeignKey("dbo.Locations", t => t.Location_Id, cascadeDelete: true)
                .Index(t => t.Season_Id)
                .Index(t => t.Location_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SeasonLocations", "Location_Id", "dbo.Locations");
            DropForeignKey("dbo.SeasonLocations", "Season_Id", "dbo.Seasons");
            DropIndex("dbo.SeasonLocations", new[] { "Location_Id" });
            DropIndex("dbo.SeasonLocations", new[] { "Season_Id" });
            DropTable("dbo.SeasonLocations");
            DropTable("dbo.Seasons");
        }
    }
}
