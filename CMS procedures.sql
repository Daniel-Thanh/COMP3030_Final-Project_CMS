-- Advisors
DELIMITER $$

CREATE PROCEDURE sp_add_advisor (
    IN p_full_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_department VARCHAR(100)
)
BEGIN
    INSERT INTO advisors (full_name, email, department)
    VALUES (p_full_name, p_email, p_department);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_update_advisor (
    IN p_advisor_id INT,
    IN p_full_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_department VARCHAR(100)
)
BEGIN
    UPDATE advisors
    SET full_name = p_full_name,
        email = p_email,
        department = p_department
    WHERE advisor_id = p_advisor_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_delete_advisor (
    IN p_advisor_id INT
)
BEGIN
    DELETE FROM advisors
    WHERE advisor_id = p_advisor_id;
END$$

DELIMITER ;


-- Budgets
DELIMITER $$

CREATE PROCEDURE sp_add_club_budget (
    IN p_club_id INT,
    IN p_fiscal_year YEAR,
    IN p_allocated_amount DECIMAL(12,2)
)
BEGIN
    INSERT INTO club_budgets (club_id, fiscal_year, allocated_amount)
    VALUES (p_club_id, p_fiscal_year, p_allocated_amount);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_update_club_budget (
    IN p_budget_id INT,
    IN p_allocated_amount DECIMAL(12,2)
)
BEGIN
    UPDATE club_budgets
    SET allocated_amount = p_allocated_amount
    WHERE budget_id = p_budget_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_delete_club_budget (
    IN p_budget_id INT
)
BEGIN
    DELETE FROM club_budgets
    WHERE budget_id = p_budget_id;
END$$

DELIMITER ;


-- club_advisors
DELIMITER $$

CREATE PROCEDURE sp_assign_advisor_to_club (
    IN p_club_id INT,
    IN p_advisor_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    INSERT INTO club_advisors (club_id, advisor_id, start_date, end_date)
    VALUES (p_club_id, p_advisor_id, p_start_date, p_end_date);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_remove_advisor_assignment (
    IN p_assignment_id INT
)
BEGIN
    DELETE FROM club_advisors
    WHERE assignment_id = p_assignment_id;
END$$

DELIMITER ;


-- clubs
DELIMITER $$

CREATE PROCEDURE sp_add_club (
    IN p_club_name VARCHAR(100),
    IN p_category VARCHAR(50),
    IN p_description TEXT,
    IN p_email VARCHAR(100),
    IN p_status ENUM('Active', 'Inactive'),
    IN p_date_established DATE
)
BEGIN
    INSERT INTO clubs (
        club_name,
        category,
        description,
        email,
        status,
        date_established
    )
    VALUES (
        p_club_name,
        p_category,
        p_description,
        p_email,
        p_status,
        p_date_established
    );
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_update_club (
    IN p_club_id INT,
    IN p_club_name VARCHAR(100),
    IN p_category VARCHAR(50),
    IN p_description TEXT,
    IN p_email VARCHAR(100),
    IN p_status ENUM('Active', 'Inactive'),
    IN p_date_established DATE
)
BEGIN
    UPDATE clubs
    SET club_name = p_club_name,
        category = p_category,
        description = p_description,
        email = p_email,
        status = p_status,
        date_established = p_date_established
    WHERE club_id = p_club_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_delete_club (
    IN p_club_id INT
)
BEGIN
    DELETE FROM clubs
    WHERE club_id = p_club_id;
END$$

DELIMITER ;


-- events (Check again)
DELIMITER $$

CREATE PROCEDURE sp_create_event (
    IN p_club_id INT,
    IN p_event_name VARCHAR(100),
    IN p_event_date DATE,
    IN p_location VARCHAR(100),
    IN p_status ENUM('Pending', 'Approved', 'Rejected')
)
BEGIN
    INSERT INTO events (
        club_id,
        event_name,
        event_date,
        location,
        status
    )
    VALUES (
        p_club_id,
        p_event_name,
        p_event_date,
        p_location,
        IFNULL(p_status, 'Pending')
    );
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_update_event (
    IN p_event_id INT,
    IN p_club_id INT,
    IN p_event_name VARCHAR(100),
    IN p_event_date DATE,
    IN p_location VARCHAR(100),
    IN p_status ENUM('Pending', 'Approved', 'Rejected')
)
BEGIN
    UPDATE events
    SET club_id = p_club_id,
        event_name = p_event_name,
        event_date = p_event_date,
        location = p_location,
        status = p_status
    WHERE event_id = p_event_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_delete_event (
    IN p_event_id INT
)
BEGIN
    DELETE FROM events
    WHERE event_id = p_event_id;
END$$

DELIMITER ;

-- expenese
DELIMITER $$

CREATE PROCEDURE sp_add_expense (
    IN p_budget_id INT,
    IN p_category VARCHAR(50),
    IN p_amount DECIMAL(12,2),
    IN p_expense_date DATE,
    IN p_description TEXT
)
BEGIN
    INSERT INTO expenses (
        budget_id,
        category,
        amount,
        expense_date,
        description
    )
    VALUES (
        p_budget_id,
        p_category,
        p_amount,
        p_expense_date,
        p_description
    );
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_update_expense (
    IN p_expense_id INT,
    IN p_category VARCHAR(50),
    IN p_amount DECIMAL(12,2),
    IN p_expense_date DATE,
    IN p_description TEXT
)
BEGIN
    UPDATE expenses
    SET category = p_category,
        amount = p_amount,
        expense_date = p_expense_date,
        description = p_description
    WHERE expense_id = p_expense_id;
END$$

DELIMITER ;

-- Memberships (Add có check điều kiện luôn)
DELIMITER $$

CREATE PROCEDURE sp_delete_expense (
    IN p_expense_id INT
)
BEGIN
    DELETE FROM expenses
    WHERE expense_id = p_expense_id;
END$$

DELIMITER ;

-- memberships
DELIMITER $$

CREATE PROCEDURE sp_add_club_membership (
    IN p_club_id INT,
    IN p_student_id INT,
    IN p_role VARCHAR(50),
    IN p_join_date DATE,
    IN p_membership_status ENUM('Active', 'Inactive')
)
BEGIN
    -- Check if student is already a member of this club
    IF EXISTS (
        SELECT 1
        FROM club_memberships
        WHERE club_id = p_club_id
          AND student_id = p_student_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Student already member of this club';
    ELSE
        INSERT INTO club_memberships (
            club_id,
            student_id,
            role,
            join_date,
            membership_status
        )
        VALUES (
            p_club_id,
            p_student_id,
            p_role,
            p_join_date,
            IFNULL(p_membership_status, 'Active')
        );
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_update_club_membership (
    IN p_membership_id INT,
    IN p_role VARCHAR(50),
    IN p_membership_status ENUM('Active', 'Inactive')
)
BEGIN
    UPDATE club_memberships
    SET role = p_role,
        membership_status = p_membership_status
    WHERE membership_id = p_membership_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_delete_club_membership (
    IN p_membership_id INT
)
BEGIN
    DELETE FROM club_memberships
    WHERE membership_id = p_membership_id;
END$$

DELIMITER ;

-- students
DELIMITER $$

CREATE PROCEDURE sp_add_student (
    IN p_student_code VARCHAR(20),
    IN p_full_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_program VARCHAR(100),
    IN p_status ENUM('Active', 'Inactive')
)
BEGIN
    -- Check if student_code already exists
    IF EXISTS (
        SELECT 1
        FROM students
        WHERE student_code = p_student_code
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Student code already exists';
    ELSE
        INSERT INTO students (
            student_code,
            full_name,
            email,
            program,
            status
        )
        VALUES (
            p_student_code,
            p_full_name,
            p_email,
            p_program,
            IFNULL(p_status, 'Active')
        );
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_update_student (
    IN p_student_id INT,
    IN p_student_code VARCHAR(20),
    IN p_full_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_program VARCHAR(100),
    IN p_status ENUM('Active', 'Inactive')
)
BEGIN
    UPDATE students
    SET student_code = p_student_code,
        full_name = p_full_name,
        email = p_email,
        program = p_program,
        status = p_status
    WHERE student_id = p_student_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_delete_student (
    IN p_student_id INT
)
BEGIN
    DELETE FROM students
    WHERE student_id = p_student_id;
END$$

DELIMITER ;
