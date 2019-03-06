CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertCategoryWithBudget`(in c varchar(50))
BEGIN
insert into categories(category) values (c);

set @newId = (select id from categories where categories.category = c);
insert into b19_agg(id) values (@newId);
insert into b19_max(id) values (@newId);
END