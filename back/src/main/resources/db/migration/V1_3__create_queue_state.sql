DO $$
    BEGIN
        IF EXISTS
            ( SELECT 1
              FROM   information_schema.tables
              WHERE  table_schema = 'public'
              AND    table_name = 'open_space'
            )
        THEN
            UPDATE open_space SET queue_state = 'ACTIVE' WHERE is_active_queue = TRUE;
            UPDATE open_space SET queue_state = 'PENDING' WHERE is_active_queue = FALSE;
            ALTER TABLE open_space DROP COLUMN IF EXISTS is_active_queue;
        END IF ;
    END
   $$ ;
