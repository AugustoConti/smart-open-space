alter table open_space
    add column if not exists date date;

update open_space
set date=(select slot.date from slot where open_space.id = slot.open_space_id LIMIT 1)
where open_space.date is null;

alter table slot
    drop column if exists date;

alter table open_space
    alter column date set not null;