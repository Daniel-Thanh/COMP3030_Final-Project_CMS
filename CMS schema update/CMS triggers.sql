-- Ensure the expenses do not exceed current budget
DELIMITER $$

CREATE TRIGGER trg_check_budget_before_insert
BEFORE INSERT ON expenses
FOR EACH ROW
BEGIN
    DECLARE total_spent DECIMAL(12,2);
    DECLARE budget_limit DECIMAL(12,2);

    -- Get total spent so far for this budget
    SELECT IFNULL(SUM(amount), 0)
    INTO total_spent
    FROM expenses
    WHERE budget_id = NEW.budget_id;

    -- Get allocated budget amount
    SELECT allocated_amount
    INTO budget_limit
    FROM club_budgets
    WHERE budget_id = NEW.budget_id;

    -- Check if new expense exceeds budget
    IF total_spent + NEW.amount > budget_limit THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Expense exceeds allocated club budget';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_check_budget_before_update
BEFORE UPDATE ON expenses
FOR EACH ROW
BEGIN
    DECLARE total_spent DECIMAL(12,2);
    DECLARE budget_limit DECIMAL(12,2);

    -- Total spent excluding current expense
    SELECT IFNULL(SUM(amount), 0)
    INTO total_spent
    FROM expenses
    WHERE budget_id = NEW.budget_id
      AND expense_id != OLD.expense_id;

    -- Get allocated budget amount
    SELECT allocated_amount
    INTO budget_limit
    FROM club_budgets
    WHERE budget_id = NEW.budget_id;

    IF total_spent + NEW.amount > budget_limit THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Updated expense exceeds allocated club budget';
    END IF;
END$$

DELIMITER ;

-- (Optional) Prevent Deleting Clubs with Upcoming Approved Events
DELIMITER $$

CREATE TRIGGER trg_prevent_club_delete_upcoming_events
BEFORE DELETE ON clubs
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM events
        WHERE club_id = OLD.club_id
          AND status = 'Approved'
          AND event_date > CURRENT_DATE()
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete club with upcoming approved events';
    END IF;
END$$

DELIMITER ;
