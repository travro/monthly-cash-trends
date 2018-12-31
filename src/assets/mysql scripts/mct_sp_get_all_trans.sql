CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllTransactions`()
begin
select
    transactions.id as id,
    dt as date,
    vendor,
    amount,
    categories.category as category
from
    transactions
inner join
    categories
on
    transactions.cat_id = categories.id;
end