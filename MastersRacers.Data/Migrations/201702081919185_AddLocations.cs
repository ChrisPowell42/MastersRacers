namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddLocations : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        Name = c.String(nullable: false, maxLength: 200),
                        Description = c.String(maxLength: 2000),
                        LatPos = c.Decimal(nullable: false, precision: 18, scale: 2),
                        LongPos = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.ID);
            
            AlterColumn("dbo.Racers", "Name", c => c.String(nullable: false, maxLength: 100));
            AlterColumn("dbo.Racers", "RaceSeries", c => c.String(maxLength: 100));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Racers", "RaceSeries", c => c.String());
            AlterColumn("dbo.Racers", "Name", c => c.String(nullable: false));
            DropTable("dbo.Locations");
        }
    }
}
