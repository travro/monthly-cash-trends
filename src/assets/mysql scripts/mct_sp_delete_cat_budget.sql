CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteCategoryWithBudget`(in thisId int)
BEGIN

update transactions
set transactions.cat_id = (select id from categories where category = 'Uncategorized')
where transactions.cat_id = thisId;

delete from budgets_2018 where budgets_2018.id = thisId;
delete from categories where categories.id = thisId;

END