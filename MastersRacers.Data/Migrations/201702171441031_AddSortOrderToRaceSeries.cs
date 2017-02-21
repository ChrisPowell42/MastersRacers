namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSortOrderToRaceSeries : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RaceSeries", "SortOrderIdx", c => c.Int(nullable: false));
            AlterColumn("dbo.RaceSeries", "Name", c => c.String(nullable: false, maxLength: 50));
            AlterColumn("dbo.RaceSeries", "Gender", c => c.String(nullable: false, maxLength: 20));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.RaceSeries", "Gender", c => c.String(maxLength: 20));
            AlterColumn("dbo.RaceSeries", "Name", c => c.String(maxLength: 50));
            DropColumn("dbo.RaceSeries", "SortOrderIdx");
        }
    }
}
