CREATE VIEW vw_dashboard_stats AS
SELECT
    -- 1. Total clubs
    (SELECT COUNT(*) FROM clubs) AS total_clubs,

    -- 2. Pending events
    (SELECT COUNT(*) 
     FROM events 
     WHERE status = 'Pending') AS pending_events,

    -- 3. Total allocated budget
    (SELECT COALESCE(SUM(allocated_amount), 0)
     FROM club_budgets) AS total_budget,

    -- 4. Active members
    (SELECT COUNT(*)
     FROM club_memberships
     WHERE membership_status = 'Active') AS active_members;
