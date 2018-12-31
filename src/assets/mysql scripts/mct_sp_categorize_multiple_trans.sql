CREATE DEFINER=`root`@`localhost` PROCEDURE `CategorizeMultipleTransactions`(in transId int, in thisCat varchar(50))
begin

declare thisVendor varchar(50);
set thisVendor = (select transactions.vendor from transactions where transactions.id = transId);

update transactions
set transactions.cat_id = (select categories.id from categories where categories.category = thisCat)
where transactions.vendor = thisVendor;

end