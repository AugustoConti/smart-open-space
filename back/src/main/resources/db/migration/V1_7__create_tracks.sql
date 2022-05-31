create table if not exists track
(
    id              bigint not null,
    name            varchar(100) not null,
    description     varchar(500),
    color           varchar(7),
    open_space_id   bigint,
    primary key (id),
    foreign key (open_space_id) references open_space(id)
    );