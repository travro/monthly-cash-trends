CREATE PROCEDURE `insert_new_category_budget` (in c varchar(50))
BEGIN
insert into categories(category) values (c);

set @newId = (select id from categories where categories.category = c);
insert into budgets_20180(id) values (newId);
END
