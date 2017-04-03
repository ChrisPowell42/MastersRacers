namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MakeRunTimeNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.RunResults", "RunTime", c => c.Double());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.RunResults", "RunTime", c => c.Double(nullable: false));
        }
    }
}
