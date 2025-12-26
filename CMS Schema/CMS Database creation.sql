-- ===============================
-- Clubs Management System (SAM)
-- ===============================

DROP DATABASE IF EXISTS clubs_management;
CREATE DATABASE clubs_management;
USE clubs_management;

-- ===============================
-- 1. REFERENCE ENTITIES
-- ===============================

CREATE TABLE clubs (
    club_id INT AUTO_INCREMENT PRIMARY KEY,
    club_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    email VARCHAR(100),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    date_established DATE
);

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    program VARCHAR(100),
    status ENUM('Active', 'Inactive') DEFAULT 'Active'
);

CREATE TABLE advisors (
    advisor_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    department VARCHAR(100)
);

-- ===============================
-- 2. RELATIONSHIP ENTITIES
-- ===============================

CREATE TABLE club_memberships (
    membership_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    student_id INT NOT NULL,
    role VARCHAR(50),
    join_date DATE,
    membership_status ENUM('Active', 'Inactive') DEFAULT 'Active',

    CONSTRAINT fk_cm_club FOREIGN KEY (club_id)
        REFERENCES clubs(club_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_cm_student FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE,

    UNIQUE (club_id, student_id)
);

CREATE TABLE club_advisors (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    advisor_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,

    CONSTRAINT fk_ca_club FOREIGN KEY (club_id)
        REFERENCES clubs(club_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_ca_advisor FOREIGN KEY (advisor_id)
        REFERENCES advisors(advisor_id)
        ON DELETE CASCADE
);

-- ===============================
-- 3. EVENTS & PARTICIPATION
-- ===============================

CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(100),
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',

    CONSTRAINT fk_event_club FOREIGN KEY (club_id)
        REFERENCES clubs(club_id)
        ON DELETE CASCADE
);

CREATE TABLE event_participants (
    event_id INT NOT NULL,
    student_id INT NOT NULL,
    participation_status ENUM('Registered', 'Attended', 'Absent'),

    PRIMARY KEY (event_id, student_id),

    CONSTRAINT fk_ep_event FOREIGN KEY (event_id)
        REFERENCES events(event_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_ep_student FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE
);

-- ===============================
-- 4. FINANCIAL MANAGEMENT (SAM)
-- ===============================

CREATE TABLE club_budgets (
    budget_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    fiscal_year YEAR NOT NULL,
    allocated_amount DECIMAL(12,2) NOT NULL,

    CONSTRAINT fk_budget_club FOREIGN KEY (club_id)
        REFERENCES clubs(club_id)
        ON DELETE CASCADE,

    UNIQUE (club_id, fiscal_year)
);

CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    budget_id INT NOT NULL,
    category VARCHAR(50),
    amount DECIMAL(12,2) NOT NULL,
    expense_date DATE NOT NULL,
    description TEXT,

    CONSTRAINT fk_expense_budget FOREIGN KEY (budget_id)
        REFERENCES club_budgets(budget_id)
        ON DELETE CASCADE
);

-- ===============================
-- 5. SECURITY & AUDIT
-- ===============================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('SAM', 'Advisor', 'Student') NOT NULL,
    linked_student_id INT,
    linked_advisor_id INT
);

CREATE TABLE audit_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100),
    table_name VARCHAR(50),
    record_id INT,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);