namespace MastersRacers.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewsItems : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ArticleTypes",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        TypeName = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.NewsItems",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ArticleTypeId = c.Guid(nullable: false),
                        Title = c.String(nullable: false, maxLength: 100),
                        ArticleText = c.String(nullable: false),
                        PostedOn = c.DateTime(nullable: false),
                        PostedBy = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ArticleTypes", t => t.ArticleTypeId, cascadeDelete: true)
                .Index(t => t.ArticleTypeId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.NewsItems", "ArticleTypeId", "dbo.ArticleTypes");
            DropIndex("dbo.NewsItems", new[] { "ArticleTypeId" });
            DropTable("dbo.NewsItems");
            DropTable("dbo.ArticleTypes");
        }
    }
}
