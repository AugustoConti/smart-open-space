create table if not exists document
(
    id              bigint not null,
    name            varchar(100) not null,
    link            varchar(500),
    talk_id         bigint,
    primary key (id),
    foreign key (talk_id) references talk(id)
    );