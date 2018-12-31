CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllCategories`()
begin
select
    *
from
    categories;
end