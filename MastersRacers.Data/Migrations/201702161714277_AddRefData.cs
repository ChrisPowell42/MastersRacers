namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRefData : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RaceFormats",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(maxLength: 50),
                        Code = c.String(maxLength: 3),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RaceSeries",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(maxLength: 50),
                        Gender = c.String(maxLength: 20),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.RaceEvents", "RaceFormatId", c => c.Guid(nullable: false));
            AddColumn("dbo.Racers", "RaceSeriesId", c => c.Guid(nullable: false));
            CreateIndex("dbo.RaceEvents", "RaceFormatId");
            CreateIndex("dbo.Racers", "RaceSeriesId");
            AddForeignKey("dbo.RaceEvents", "RaceFormatId", "dbo.RaceFormats", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Racers", "RaceSeriesId", "dbo.RaceSeries", "Id", cascadeDelete: true);
            DropColumn("dbo.RaceEvents", "RaceFormat");
            DropColumn("dbo.Racers", "RaceSeries");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Racers", "RaceSeries", c => c.String(maxLength: 100));
            AddColumn("dbo.RaceEvents", "RaceFormat", c => c.String(maxLength: 5));
            DropForeignKey("dbo.Racers", "RaceSeriesId", "dbo.RaceSeries");
            DropForeignKey("dbo.RaceEvents", "RaceFormatId", "dbo.RaceFormats");
            DropIndex("dbo.Racers", new[] { "RaceSeriesId" });
            DropIndex("dbo.RaceEvents", new[] { "RaceFormatId" });
            DropColumn("dbo.Racers", "RaceSeriesId");
            DropColumn("dbo.RaceEvents", "RaceFormatId");
            DropTable("dbo.RaceSeries");
            DropTable("dbo.RaceFormats");
        }
    }
}
