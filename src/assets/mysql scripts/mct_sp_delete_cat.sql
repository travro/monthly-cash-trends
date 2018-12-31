CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteCategory`(in thisId int)
begin

update transactions
set transactions.cat_id = (select id from categories where category = 'Uncategorized')
where transactions.cat_id = thisId;

delete from categories where categories.id = thisId;

end