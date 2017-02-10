namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateLocationPosTypes : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Locations", "LatPos", c => c.Double(nullable: false));
            AlterColumn("dbo.Locations", "LongPos", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Locations", "LongPos", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.Locations", "LatPos", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
    }
}
