namespace MastersRacers.Data.Migrations
{
    using Contexts;
    using Models;
    using Models.RefData;
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
            RefDataSeed(context);
            RacerSeed(context);
            LocationSeed(context);
            SeasonSeed(context);
            RaceEventSeed(context);

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

        private readonly Guid rs1Id = Guid.Parse("{6096C081-B4DC-4C23-B190-F035377560FA}");
        private readonly Guid rs2Id = Guid.Parse("{9FE0C1DD-3E51-45AF-9C6D-BC63A9471F18}");
        private readonly Guid rs3Id = Guid.Parse("{BFDBF659-4121-4BFF-B4BC-129817DDDE4C}");
        private readonly Guid rs4Id = Guid.Parse("{4D2AFEC6-AB0F-4B1D-84F6-8E00FC69E52E}");
        private readonly Guid rs5Id = Guid.Parse("{DBC3AE64-1B76-40DA-B978-DFBE85992E40}");
        private readonly Guid rs6Id = Guid.Parse("{0B9D68F1-6AA4-413C-8D1B-A489D73552DB}");
        private readonly Guid rs7Id = Guid.Parse("{D80B0D83-6404-418C-B265-01A68BC143B2}");
        private readonly Guid rs8Id = Guid.Parse("{E998AF95-C9C4-40E4-8E23-A2A51860362A}");

        private readonly Guid rf1Id = Guid.Parse("{BA949AEF-A951-4B7F-8B6D-01DC00B9BF32}");
        private readonly Guid rf2Id = Guid.Parse("{AF859119-0CD7-4389-8B3D-A31D5989C9B7}");

        //Contains actual reference data definitions.
        private void RefDataSeed(RaceContext context)
        {

            RaceFormat rf1 = new RaceFormat { Id = rf1Id, Code = "SL", Name = "Slalom" };
            RaceFormat rf2 = new RaceFormat { Id = rf2Id, Code = "GL", Name = "Giant Slalom" };

            context.RaceFormats.AddOrUpdate(rf1, rf2);

            RaceSeries rs1 = new RaceSeries { Id = rs1Id, SortOrderIdx = 1, Gender = "Women", Name = "Bronze" };
            RaceSeries rs2 = new RaceSeries { Id = rs2Id, SortOrderIdx = 2, Gender = "Women", Name = "Silver" };
            RaceSeries rs3 = new RaceSeries { Id = rs3Id, SortOrderIdx = 3, Gender = "Women", Name = "Gold" };
            RaceSeries rs4 = new RaceSeries { Id = rs4Id, SortOrderIdx = 4, Gender = "Women", Name = "Platnium" };
            RaceSeries rs5 = new RaceSeries { Id = rs5Id, SortOrderIdx = 5, Gender = "Men", Name = "Bronze" };
            RaceSeries rs6 = new RaceSeries { Id = rs6Id, SortOrderIdx = 6, Gender = "Men", Name = "Silver" };
            RaceSeries rs7 = new RaceSeries { Id = rs7Id, SortOrderIdx = 7, Gender = "Men", Name = "Gold" };
            RaceSeries rs8 = new RaceSeries { Id = rs8Id, SortOrderIdx = 8, Gender = "Men", Name = "Platnium" };

            context.RaceSeries.AddOrUpdate(rs1, rs2, rs3, rs4, rs5, rs6, rs7, rs8);

        }

        private readonly Guid s1Id = Guid.Parse("{3960B398-1D88-4D3F-B63F-4743AFB2B438}");
        private readonly Guid s2Id = Guid.Parse("{BAA65C7F-0147-4F75-BE83-32CA59F1065B}");

        //Contains Test data only.
        private void SeasonSeed(RaceContext context)
        {

            Season s1 = new Season { Id = s1Id, StartYear = 2013, EndYear = 2014, Notes = "Notes for season 1.", IsCurrentSeason = false };
            Season s2 = new Season { Id = s2Id, StartYear = 2014, EndYear = 2015, Notes = "Notes for season 2", IsCurrentSeason = true };

            context.Seasons.AddOrUpdate(s1, s2);
        }

        private readonly Guid l1Id = Guid.Parse("{34B7F02C-B667-49CB-9CA8-0B431C1F8881}");
        private readonly Guid l2Id = Guid.Parse("{5EC06D47-D817-4E04-AF1C-B9282F55C2DB}");

        //Contains test data only.
        private void LocationSeed(RaceContext context)
        {
            Location l1 = new Location { Id = l1Id, Name = "Springhill Winter Park", Description = "The usual home base of the Manitoba Master's Racing club.", LatPos = 49.96129, LongPos = -96.9814337 };
            Location l2 = new Location { Id = l2Id, Name = "Asessippi Ski Area & Resort", Description = "The home of speed events for Manitoba Master's", LatPos = 50.951127, LongPos = -101.3417097 };

            context.Locations.AddOrUpdate(l1, l2);

        }

        //Contains test data only.
        private void RacerSeed(RaceContext context)
        {
            Guid r2Id = Guid.Parse("BFCD44A5-4AE8-4206-AAD8-BD28AE8F73F9");
            Racer r1 = new Racer { Id = r2Id, BibNumber = 2, Name = "Test Two", Active=true, RaceSeriesId = rs3Id };

            Guid r3Id = Guid.Parse("9FB23EF7-B2FA-4274-978A-D3B94068958F");
            Racer r2 = new Racer { Id = r3Id, BibNumber = 3, Name = "Three Test", Active = true, RaceSeriesId = rs5Id };
        
            Guid r4Id = Guid.Parse("{EF549E12-F7E6-4E46-BE31-6A7ABDC421A1}");
            Racer r3 = new Racer { Id = r4Id, BibNumber = 55, Name = "Jane Doe", Active = true, RaceSeriesId = rs4Id };

            Guid r5Id = Guid.Parse("{09306A34-DA76-4122-98F0-F9B54F7344F0}");
            Racer r4 = new Racer { Id = r5Id, BibNumber = 66, Name = "Joe Blow", Active = true, RaceSeriesId = rs7Id };

            Guid r6Id = Guid.Parse("{C237F026-D2DC-4848-9016-88D45E583066}");
            Racer r5 = new Racer { Id = r6Id, BibNumber = 99, Name = "Great One", Active = true, RaceSeriesId = rs3Id };

            Guid r7Id = Guid.Parse("{92595F10-442E-405D-9B50-D0B6DEF58AAC}");
            Racer r6 = new Racer { Id = r7Id, BibNumber = 154, Name = "Hugh McGregor", Active = true, RaceSeriesId = rs7Id };

            Guid r8Id = Guid.Parse("{57E86A58-6735-4BC2-ADE1-BF089CF69143}");
            Racer r7 = new Racer { Id = r8Id, BibNumber = 69, Name = "Ski Racer", Active = true, RaceSeriesId = rs2Id };

            Guid r9Id = Guid.Parse("{1AE6068B-B907-4936-86E9-B455CE3BB04A}");
            Racer r8 = new Racer { Id = r9Id, BibNumber = 53, Name = "Speed Racer", Active = true, RaceSeriesId = rs5Id };

            Guid r10Id = Guid.Parse("{66D4C448-BCDB-4F06-98A3-01187939D11F}");
            Racer r9 = new Racer { Id = r10Id, BibNumber = 12, Name = "Powder Skier", Active = true, RaceSeriesId = rs4Id };

            Guid r11Id = Guid.Parse("{D69CAE4E-E569-45D5-B471-6813FE3287F1}");
            Racer r10 = new Racer { Id = r11Id, BibNumber = 33, Name = "Slalom Racer", Active = true, RaceSeriesId = rs8Id };

            Guid r12Id = Guid.Parse("{EDDD30B5-23CA-4BD7-8428-2CBA7214A4AA}");
            Racer r11 = new Racer { Id = r12Id, BibNumber = 21, Name = "Joe Hills", Active = false, RaceSeriesId = rs6Id };

            Guid r13Id = Guid.Parse("{9FC80606-8C5D-4158-A4E1-8EFDAD6FECF7}");
            Racer r12 = new Racer { Id = r13Id, BibNumber = 73, Name = "Flo Hills", Active = false, RaceSeriesId = rs1Id };

            context.Racers.AddOrUpdate(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12);

        }

        //contains test data only
        private void RaceEventSeed(RaceContext context)
        {
            Guid rc1Id = Guid.Parse("{C7FECBD3-BB1B-42AA-9073-62F22D988F38}");
            Guid rc2Id = Guid.Parse("{25B3F057-0494-4208-85A0-28FDF31FCCF2}");
            Guid rc3Id = Guid.Parse("{91636DFB-0F83-4603-A54E-DA33AE2D5AF1}");
            Guid rc4Id = Guid.Parse("{3247BBB7-104C-4977-B78C-07A62051B3B4}");

            RaceEvent rc1 = new RaceEvent { Id=rc1Id, LocationId=l1Id, SeasonId=s1Id, RaceFormatId=rf1Id, RunCount=2, RaceName="Race 1", ScheduledStartTime=new DateTime(2014, 02, 14, 19, 0, 0)};
            RaceEvent rc2 = new RaceEvent { Id = rc2Id, LocationId = l2Id, SeasonId = s1Id, RaceFormatId = rf2Id, RunCount = 2, RaceName = "Race 2", ScheduledStartTime = new DateTime(2014, 02, 24, 10, 0, 0) };
            RaceEvent rc3 = new RaceEvent { Id = rc3Id, LocationId = l1Id, SeasonId = s2Id, RaceFormatId = rf1Id, RunCount = 2, RaceName = "Race 1", ScheduledStartTime = new DateTime(2015, 01, 09, 19, 0, 0) };
            RaceEvent rc4 = new RaceEvent { Id = rc4Id, LocationId = l2Id, SeasonId = s2Id, RaceFormatId = rf2Id, RunCount = 2, RaceName = "Race 2", ScheduledStartTime = new DateTime(2015, 02, 14, 10, 0, 0) };

            context.RaceEvents.AddOrUpdate(rc1, rc2, rc3, rc4);

        }

    }

}
