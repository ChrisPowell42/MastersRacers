namespace MastersRacers.Data.Migrations
{
    using MastersRacers.Data.Models.RefData;
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRacePhaseToRaceEvent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RaceEvents", "RacePhaseId", c => c.Guid(nullable: false, defaultValue: RacePhase.ScheduledId));
            CreateIndex("dbo.RaceEvents", "RacePhaseId");
            AddForeignKey("dbo.RaceEvents", "RacePhaseId", "dbo.RacePhases", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RaceEvents", "RacePhaseId", "dbo.RacePhases");
            DropIndex("dbo.RaceEvents", new[] { "RacePhaseId" });
            DropColumn("dbo.RaceEvents", "RacePhaseId");
        }
    }
}
