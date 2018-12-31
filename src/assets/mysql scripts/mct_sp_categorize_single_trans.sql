CREATE DEFINER=`root`@`localhost` PROCEDURE `CategorizeSingleTransaction`(in transId int, in cat varchar(50))
begin
	update transactions
    set transactions.cat_id = (select id from categories where categories.category = cat)
    where transactions.id = transId;

end