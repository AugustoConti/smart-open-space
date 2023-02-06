create table if not exists document
(
    id              bigint not null,
    name            varchar(100) not null,
    link     varchar(500),
    color           varchar(7),
    talk_id   bigint,
    primary key (id),
    foreign key (talk_id) references talk(id)
    );