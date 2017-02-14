namespace MastersRacers.Data.Migrations
{
    using Contexts;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<RaceContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(RaceContext context)
        {
            //  This method will be called after migrating to the latest version.
            RacerSeed(context);
            LocationSeed(context);
            SeasonSeed(context);

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }

        private void SeasonSeed(RaceContext context)
        {
            Guid s1Id = Guid.Parse("{3960B398-1D88-4D3F-B63F-4743AFB2B438}");
            Guid s2Id = Guid.Parse("{BAA65C7F-0147-4F75-BE83-32CA59F1065B}");

            Season s1 = new Season { Id = s1Id, StartYear = 2013, EndYear = 2014, Notes = "Notes for season 1.", IsCurrentSeason = false };
            Season s2 = new Season { Id = s2Id, StartYear = 2014, EndYear = 2015, Notes = "Notes for season 2", IsCurrentSeason = true };

            context.Seasons.AddOrUpdate(s1, s2);
        }

        private void LocationSeed(RaceContext context)
        {
            Guid l1Id = Guid.Parse("{34B7F02C-B667-49CB-9CA8-0B431C1F8881}");
            Location l1 = new Location { Id = l1Id, Name = "Springhill Winter Park", Description = "The usual home base of the Manitoba Master's Racing club.", LatPos = 49.96129, LongPos = -96.9814337 };

            Guid l2Id = Guid.Parse("{5EC06D47-D817-4E04-AF1C-B9282F55C2DB}");
            Location l2 = new Location { Id = l2Id, Name = "Asessippi Ski Area & Resort", Description = "The home of speed events for Manitoba Master's", LatPos = 50.951127, LongPos = -101.3417097 };

            context.Locations.AddOrUpdate(l1, l2);

        }

        private void RacerSeed(RaceContext context)
        {
            Guid r2Id = Guid.Parse("BFCD44A5-4AE8-4206-AAD8-BD28AE8F73F9");
            Racer r1 = new Racer { Id = r2Id, BibNumber = 2, Name = "Test Two", RaceSeries = "Gold Women" };

            Guid r3Id = Guid.Parse("9FB23EF7-B2FA-4274-978A-D3B94068958F");
            Racer r2 = new Racer { Id = r3Id, BibNumber = 3, Name = "Three Test", RaceSeries = "Bronze Men" };
        
            Guid r4Id = Guid.Parse("{EF549E12-F7E6-4E46-BE31-6A7ABDC421A1}");
            Racer r3 = new Racer { Id = r4Id, BibNumber = 55, Name = "Jane Doe", RaceSeries = "Platinum Women" };

            Guid r5Id = Guid.Parse("{09306A34-DA76-4122-98F0-F9B54F7344F0}");
            Racer r4 = new Racer { Id = r5Id, BibNumber = 66, Name = "Joe Blow", RaceSeries = "Silver Men" };

            Guid r6Id = Guid.Parse("{C237F026-D2DC-4848-9016-88D45E583066}");
            Racer r5 = new Racer { Id = r6Id, BibNumber = 99, Name = "Great One", RaceSeries = "Gold Women" };

            Guid r7Id = Guid.Parse("{92595F10-442E-405D-9B50-D0B6DEF58AAC}");
            Racer r6 = new Racer { Id = r7Id, BibNumber = 154, Name = "Hugh McGregor", RaceSeries = "Gold Men" };

            Guid r8Id = Guid.Parse("{57E86A58-6735-4BC2-ADE1-BF089CF69143}");
            Racer r7 = new Racer { Id = r8Id, BibNumber = 69, Name = "Ski Racer", RaceSeries = "Silver Women" };

            Guid r9Id = Guid.Parse("{1AE6068B-B907-4936-86E9-B455CE3BB04A}");
            Racer r8 = new Racer { Id = r9Id, BibNumber = 53, Name = "Speed Racer", RaceSeries = "Bronze Men" };

            Guid r10Id = Guid.Parse("{66D4C448-BCDB-4F06-98A3-01187939D11F}");
            Racer r9 = new Racer { Id = r10Id, BibNumber = 12, Name = "Powder Skier", RaceSeries = "Platinum Women" };

            Guid r11Id = Guid.Parse("{D69CAE4E-E569-45D5-B471-6813FE3287F1}");
            Racer r10 = new Racer { Id = r11Id, BibNumber = 33, Name = "Slalom Racer", RaceSeries = "Platinum Men" };

            Guid r12Id = Guid.Parse("{EDDD30B5-23CA-4BD7-8428-2CBA7214A4AA}");
            Racer r11 = new Racer { Id = r12Id, BibNumber = 21, Name = "Joe Hills", RaceSeries = "Silver Men" };

            Guid r13Id = Guid.Parse("{9FC80606-8C5D-4158-A4E1-8EFDAD6FECF7}");
            Racer r12 = new Racer { Id = r13Id, BibNumber = 73, Name = "Flo Hills", RaceSeries = "Bronze Women" };

            context.Racers.AddOrUpdate(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12);

        }
    }
}
