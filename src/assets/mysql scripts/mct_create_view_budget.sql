use mct;

alter view Budget2019 as
select
	categories.id as id,
	categories.category as Category, 
    (select sum(amount) where month(transactions.dt) = 1 and year(transactions.dt) = 2019) as January,
    (select sum(amount) where month(transactions.dt) = 2 and year(transactions.dt) = 2019) as February, 
    (select sum(amount) where month(transactions.dt) = 3 and year(transactions.dt) = 2019) as March,
    (select sum(amount) where month(transactions.dt) = 4 and year(transactions.dt) = 2019) as April,
    (select sum(amount) where month(transactions.dt) = 5 and year(transactions.dt) = 2019) as May,
    (select sum(amount) where month(transactions.dt) = 6 and year(transactions.dt) = 2019) as June,
    (select sum(amount) where month(transactions.dt) = 7 and year(transactions.dt) = 2019) as July,
    (select sum(amount) where month(transactions.dt) = 8 and year(transactions.dt) = 2019) as August,
    (select sum(amount) where month(transactions.dt) = 9 and year(transactions.dt) = 2019) as September,
    (select sum(amount) where month(transactions.dt) = 10 and year(transactions.dt) = 2019) as October,
    (select sum(amount) where month(transactions.dt) = 11 and year(transactions.dt) = 2019) as November,
    (select sum(amount) where month(transactions.dt) = 12 and year(transactions.dt) = 2019) as December
from categories left outer join transactions on transactions.cat_id = categories.id
group by category;


select * from Budget2019



