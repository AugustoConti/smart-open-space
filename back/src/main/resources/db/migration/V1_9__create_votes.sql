create table if not exists vote
(
    talk_id   bigint not null,
    user_id   bigint not null,
    primary key (talk_id, user_id),
    foreign key (talk_id) references talk(id),
    foreign key (user_id) references users(id)
    );