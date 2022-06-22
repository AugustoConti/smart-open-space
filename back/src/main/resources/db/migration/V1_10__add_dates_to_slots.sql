alter table slot
    add column if not exists date date;

update slot
set date=(select os.date from open_space as os where os.id = slot.open_space_id)
where slot.date is null;

alter table open_space
    drop column if exists date;

alter table slot
    alter column date set not null;