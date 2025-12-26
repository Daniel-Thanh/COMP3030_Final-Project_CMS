CREATE OR REPLACE VIEW v_recent_activity AS
SELECT
    al.log_id,
    al.action_time,
    al.action,
    al.table_name,
    al.record_id,

    -- Resolve club name (only when applicable)
    c.club_name,

    -- Human-readable activity
    CONCAT(
        UPPER(al.action),
        ' ',
        al.table_name
    ) AS activity_text

FROM audit_log al
LEFT JOIN clubs c
  ON al.table_name = 'clubs'
 AND c.club_id = al.record_id;
 
 CREATE OR REPLACE VIEW v_monthly_membership_stats AS
SELECT
  YEAR(join_date) AS year,
  MONTH(join_date) AS month,
  COUNT(*) AS total_members
FROM club_memberships
WHERE membership_status = 'Active'
GROUP BY YEAR(join_date), MONTH(join_date);