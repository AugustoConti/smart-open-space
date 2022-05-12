create table if not exists flyway_schema_history
(
    installed_rank integer                 not null
        constraint flyway_schema_history_pk
            primary key,
    version        varchar(50),
    description    varchar(200)            not null,
    type           varchar(20)             not null,
    script         varchar(1000)           not null,
    checksum       integer,
    installed_by   varchar(100)            not null,
    installed_on   timestamp default now() not null,
    execution_time integer                 not null,
    success        boolean                 not null
);

delete from flyway_schema_history where 1 = 1;

create table if not exists user
(
    id bigint not null,
    email varchar(255) unique,
    name varchar(255),
    password varchar(255),
    primary key(id)
    );

create table if not exists open_space
(
    id bigint not null,
    date date,
    name varchar(255),
    queue_state varchar(255),
    url_image varchar(255),
    organizer_id bigint,
    primary key(id),
    foreign key(organizer_id) references usersos(id)
);

create table if not exists talk
(
    id bigint not null,
    description varchar,
    name varchar(255),
    open_space_id bigint,
    speaker_id    bigint
    constraint fknjpfgrjrcr8k9bw44oba71jdi
    references usersos,
    primary key(id),
    foreign key(open_space_id) references open_space(id)
    );

create table if not exists open_space_queue
(
    open_space_id bigint not null,
    queue_id bigint  not null unique,
    queue_order integer not null,
    primary key(open_space_id, queue_order),
    foreign key(queue_id) references talk(id),
    foreign key(open_space_id) references open_space(id)
);

create table if not exists open_space_to_schedule
(
    open_space_id  bigint not null references open_space,
    to_schedule_id bigint not null unique,
    primary key (open_space_id, to_schedule_id),
    foreign key (to_schedule_id) references talk(id),
    foreign key (open_space_id) references open_space(id)
);

create table if not exists room
(
    id bigint not null,
    description   varchar,
    name          varchar(255),
    open_space_id bigint references open_space,
    primary key(id),
    foreign key (open_space_id) references open_space(id)
);

create table if not exists slot
(
    dtype varchar(31) not null,
    id bigint not null,
    end_time      time,
    start_time    time,
    description   varchar(255),
    open_space_id bigint,
    primary key (id),
    foreign key (open_space_id) references open_space(id)
);

create table if not exists assigned_slot
(
    id bigint not null,
    room_id bigint,
    slot_id bigint,
    talk_id bigint,
    open_space_id bigint,
    primary key(id),
    foreign key (room_id) references room(id),
    foreign key (slot_id) references slot(id),
    foreign key (talk_id) references talk(id),
    foreign key (open_space_id) references open_space(id)
);