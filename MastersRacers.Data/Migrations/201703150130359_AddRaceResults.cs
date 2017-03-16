namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRaceResults : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.SeasonLocations", "Season_Id", "dbo.Seasons");
            DropForeignKey("dbo.SeasonLocations", "Location_Id", "dbo.Locations");
            DropIndex("dbo.SeasonLocations", new[] { "Season_Id" });
            DropIndex("dbo.SeasonLocations", new[] { "Location_Id" });
            CreateTable(
                "dbo.RaceResults",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        RaceEventId = c.Guid(nullable: false),
                        RacerId = c.Guid(nullable: false),
                        TotalRaceTime = c.Double(nullable: false),
                        IsDsqOrDnf = c.Boolean(nullable: false),
                        Place = c.Int(nullable: false),
                        Points = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RaceEvents", t => t.RaceEventId, cascadeDelete: true)
                .ForeignKey("dbo.Racers", t => t.RacerId, cascadeDelete: true)
                .Index(t => t.RaceEventId)
                .Index(t => t.RacerId);
            
            CreateTable(
                "dbo.RunResults",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        RaceResultId = c.Guid(nullable: false),
                        RunIdx = c.Int(nullable: false),
                        RunTime = c.Double(nullable: false),
                        IsDSQ = c.Boolean(nullable: false),
                        IsDNF = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RaceResults", t => t.RaceResultId, cascadeDelete: true)
                .Index(t => t.RaceResultId);
            
            CreateTable(
                "dbo.RacePhases",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Phase = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            DropTable("dbo.SeasonLocations");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.SeasonLocations",
                c => new
                    {
                        Season_Id = c.Guid(nullable: false),
                        Location_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.Season_Id, t.Location_Id });
            
            DropForeignKey("dbo.RunResults", "RaceResultId", "dbo.RaceResults");
            DropForeignKey("dbo.RaceResults", "RacerId", "dbo.Racers");
            DropForeignKey("dbo.RaceResults", "RaceEventId", "dbo.RaceEvents");
            DropIndex("dbo.RunResults", new[] { "RaceResultId" });
            DropIndex("dbo.RaceResults", new[] { "RacerId" });
            DropIndex("dbo.RaceResults", new[] { "RaceEventId" });
            DropTable("dbo.RacePhases");
            DropTable("dbo.RunResults");
            DropTable("dbo.RaceResults");
            CreateIndex("dbo.SeasonLocations", "Location_Id");
            CreateIndex("dbo.SeasonLocations", "Season_Id");
            AddForeignKey("dbo.SeasonLocations", "Location_Id", "dbo.Locations", "Id", cascadeDelete: true);
            AddForeignKey("dbo.SeasonLocations", "Season_Id", "dbo.Seasons", "Id", cascadeDelete: true);
        }
    }
}
