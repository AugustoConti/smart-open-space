alter table slot
    add column if not exists date date;
alter table open_space
    drop column if exists date;