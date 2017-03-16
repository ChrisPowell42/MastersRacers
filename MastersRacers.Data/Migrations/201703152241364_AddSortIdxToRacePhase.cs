namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSortIdxToRacePhase : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RacePhases", "SortIdx", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RacePhases", "SortIdx");
        }
    }
}
