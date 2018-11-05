namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRaceResultBibNumber : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RaceResults", "RacerBib", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RaceResults", "RacerBib");
        }
    }
}
