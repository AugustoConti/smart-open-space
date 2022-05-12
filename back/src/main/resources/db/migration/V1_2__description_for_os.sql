alter table open_space
    add column if not exists description varchar(1000) default '';