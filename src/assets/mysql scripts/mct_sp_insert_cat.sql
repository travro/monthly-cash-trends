CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertCategory`(in c varchar(50))
begin
insert into categories(category) values (c);
end