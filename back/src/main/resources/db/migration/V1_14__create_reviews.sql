create table if not exists review
(
    id              bigint not null,
    grade           int,
    comment         varchar(500),
    reviewer_id     bigint references users,
    talk_id         bigint,
    primary key (id),
    foreign key (talk_id) references talk(id),
    check (grade > 0),
    check (grade < 6)
    );