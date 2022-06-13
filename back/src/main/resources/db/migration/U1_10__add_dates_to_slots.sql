alter table open_space
    add column if not exists date date;

update open_space
set date=subquery.date
from (select * from slot) as subquery
where open_space.id = subquery.open_space_id;

alter table slot
    drop column if exists date;

alter table open_space
    alter column date set not null;