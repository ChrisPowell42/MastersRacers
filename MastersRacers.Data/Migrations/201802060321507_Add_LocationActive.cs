namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_LocationActive : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Locations", "Active", c => c.Boolean(nullable: false, defaultValue: true));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Locations", "Active");
        }
    }
}
