create database mct;
use mct;

create table if not exists categories(
id int auto_increment not null,
category varchar(255),
primary key (id)
);

create table if not exists transactions(
id int auto_increment not null,
dt date,
vendor varchar(255),
amount decimal(7,2),
cat_id int default 1,
primary key(id),
foreign key(cat_id) references categories(id)
);

create table if not exists b19_agg(
id int not null,
January decimal(7,2) default 0.00,
February decimal(7,2) default 0.00,
March decimal(7,2) default 0.00,
April decimal(7,2) default 0.00,
May decimal(7,2) default 0.00,
June decimal(7,2) default 0.00,
July decimal(7,2) default 0.00,
August decimal(7,2) default 0.00,
September decimal(7,2) default 0.00,
October decimal(7,2) default 0.00,
November decimal(7,2) default 0.00,
December decimal(7,2) default 0.00,
primary key(id),
foreign key(id) references categories(id)
);

create table if not exists b19_max(
id int not null,
January decimal(7,2) default 0.00,
February decimal(7,2) default 0.00,
March decimal(7,2) default 0.00,
April decimal(7,2) default 0.00,
May decimal(7,2) default 0.00,
June decimal(7,2) default 0.00,
July decimal(7,2) default 0.00,
August decimal(7,2) default 0.00,
September decimal(7,2) default 0.00,
October decimal(7,2) default 0.00,
November decimal(7,2) default 0.00,
December decimal(7,2) default 0.00,
primary key(id),
foreign key(id) references categories(id)
);
insert into categories (category) values ('Uncategorized');
insert into b19_agg(id) values ((select id from categories where category = 'Uncategorized'));
insert into b19_max(id) values ((select id from categories where category = 'Uncategorized'));