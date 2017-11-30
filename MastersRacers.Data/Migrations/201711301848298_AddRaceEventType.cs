namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRaceEventType : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RaceEventTypes",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        TypeName = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.RaceEvents", "RaceEventTypeId", c => c.Guid(nullable: false));
            CreateIndex("dbo.RaceEvents", "RaceEventTypeId");
            AddForeignKey("dbo.RaceEvents", "RaceEventTypeId", "dbo.RaceEventTypes", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RaceEvents", "RaceEventTypeId", "dbo.RaceEventTypes");
            DropIndex("dbo.RaceEvents", new[] { "RaceEventTypeId" });
            DropColumn("dbo.RaceEvents", "RaceEventTypeId");
            DropTable("dbo.RaceEventTypes");
        }
    }
}
