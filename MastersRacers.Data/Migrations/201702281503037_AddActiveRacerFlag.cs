namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddActiveRacerFlag : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Racers", "Active", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Racers", "Active");
        }
    }
}
