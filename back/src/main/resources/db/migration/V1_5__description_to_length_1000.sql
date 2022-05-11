alter table open_space
    alter column description type varchar(1000) using description::varchar(1000);