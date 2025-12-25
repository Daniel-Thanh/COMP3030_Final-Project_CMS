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

CREATE TRIGGER trg_memberships_insert
AFTER INSERT ON club_memberships
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'INSERT', 'club_memberships', NEW.membership_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_memberships_update
AFTER UPDATE ON club_memberships
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'UPDATE', 'club_memberships', NEW.membership_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_memberships_delete
AFTER DELETE ON club_memberships
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'DELETE', 'club_memberships', OLD.membership_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_events_insert
AFTER INSERT ON events
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'INSERT', 'events', NEW.event_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_events_update
AFTER UPDATE ON events
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'UPDATE', 'events', NEW.event_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_budgets_insert
AFTER INSERT ON club_budgets
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'INSERT', 'club_budgets', NEW.budget_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_budgets_update
AFTER UPDATE ON club_budgets
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'UPDATE', 'club_budgets', NEW.budget_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_expenses_insert
AFTER INSERT ON expenses
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'INSERT', 'expenses', NEW.expense_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_advisors_insert
AFTER INSERT ON advisors
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'INSERT', 'advisors', NEW.advisor_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_advisors_update
AFTER UPDATE ON advisors
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'UPDATE', 'advisors', NEW.advisor_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_advisors_delete
AFTER DELETE ON advisors
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'DELETE', 'advisors', OLD.advisor_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_club_advisors_insert
AFTER INSERT ON club_advisors
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'INSERT', 'club_advisors', NEW.assignment_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_club_advisors_update
AFTER UPDATE ON club_advisors
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'UPDATE', 'club_advisors', NEW.assignment_id, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_club_advisors_delete
AFTER DELETE ON club_advisors
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, action_time)
  VALUES (NULL, 'DELETE', 'club_advisors', OLD.assignment_id, NOW());
END$$

DELIMITER ;



