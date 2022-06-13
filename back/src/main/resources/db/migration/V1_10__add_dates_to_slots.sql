alter table slot
    add column if not exists date date;

update slot
set date=subquery.date
from (select * from open_space) as subquery
where slot.open_space_id=subquery.id;

alter table open_space
    drop column if exists date;

alter table slot
    alter column date set not null;