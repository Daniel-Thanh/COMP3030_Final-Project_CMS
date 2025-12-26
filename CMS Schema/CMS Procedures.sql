DELIMITER $$

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
END$$

DELIMITER ;

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