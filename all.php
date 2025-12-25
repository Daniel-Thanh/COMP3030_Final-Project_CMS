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

DELIMITER $$

CREATE TRIGGER trg_clubs_insert
AFTER INSERT ON clubs
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'INSERT', 'clubs', NEW.club_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_clubs_update
AFTER UPDATE ON clubs
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'UPDATE', 'clubs', NEW.club_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_clubs_delete
AFTER DELETE ON clubs
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'DELETE', 'clubs', OLD.club_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_event_participants_insert
AFTER INSERT ON event_participants
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'INSERT', 'event_participants', NEW.event_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_event_participants_update
AFTER UPDATE ON event_participants
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'UPDATE', 'event_participants', NEW.event_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_event_participants_delete
AFTER DELETE ON event_participants
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'DELETE', 'event_participants', OLD.event_id, NOW());
END$$

DELIMITER ;

CREATE PROCEDURE sp_club_report ()
BEGIN
  SELECT
    c.club_id,
    c.club_name,
    COUNT(DISTINCT cm.student_id) AS members,
    COUNT(DISTINCT e.event_id) AS events,
    COALESCE(SUM(ex.amount), 0) AS expenses
  FROM clubs c
  LEFT JOIN club_memberships cm ON c.club_id = cm.club_id
  LEFT JOIN events e ON c.club_id = e.club_id
  LEFT JOIN club_budgets b ON c.club_id = b.club_id
  LEFT JOIN expenses ex ON b.budget_id = ex.budget_id
  GROUP BY c.club_id, c.club_name;
END;

CREATE OR REPLACE VIEW v_monthly_membership_stats AS
SELECT
  YEAR(join_date) AS year,
  MONTH(join_date) AS month,
  COUNT(*) AS total_members
FROM club_memberships
WHERE membership_status = 'Active'
GROUP BY YEAR(join_date), MONTH(join_date);

DELIMITER $$

CREATE PROCEDURE sp_club_summary ()
BEGIN
  SELECT
    c.club_name,
    COUNT(DISTINCT cm.student_id) AS total_members,
    COUNT(DISTINCT e.event_id) AS total_events
  FROM clubs c
  LEFT JOIN club_memberships cm ON c.club_id = cm.club_id
  LEFT JOIN events e ON c.club_id = e.club_id
  GROUP BY c.club_name;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_monthly_expenses ()
BEGIN
  SELECT
    YEAR(expense_date) AS year,
    MONTH(expense_date) AS month,
    SUM(amount) AS total_expenses
  FROM expenses
  GROUP BY YEAR(expense_date), MONTH(expense_date)
  ORDER BY year, month;
END$$

DELIMITER ;


