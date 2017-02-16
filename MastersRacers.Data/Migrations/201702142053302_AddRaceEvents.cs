namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRaceEvents : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RaceEvents",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        LocationId = c.Guid(nullable: false),
                        SeasonId = c.Guid(nullable: false),
                        RunCount = c.Int(nullable: false),
                        RaceName = c.String(maxLength: 255),
                        ScheduledStartTime = c.DateTime(nullable: false),
                        RaceFormat = c.String(maxLength: 5),
                        Notes = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Locations", t => t.LocationId, cascadeDelete: true)
                .ForeignKey("dbo.Seasons", t => t.SeasonId, cascadeDelete: true)
                .Index(t => t.LocationId)
                .Index(t => t.SeasonId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RaceEvents", "SeasonId", "dbo.Seasons");
            DropForeignKey("dbo.RaceEvents", "LocationId", "dbo.Locations");
            DropIndex("dbo.RaceEvents", new[] { "SeasonId" });
            DropIndex("dbo.RaceEvents", new[] { "LocationId" });
            DropTable("dbo.RaceEvents");
        }
    }
}
