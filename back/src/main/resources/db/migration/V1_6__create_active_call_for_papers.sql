alter table open_space
    add column if not exists active_call_for_papers boolean default false;