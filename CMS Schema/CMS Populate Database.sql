USE clubs_management;

-- ========================================================
-- 1. POPULATE ADVISORS (IDs 300+)
-- ========================================================
INSERT INTO advisors (advisor_id, full_name, email, department) VALUES 
(301, 'Dr. Alan Grant', 'alan.g.300@uni.edu', 'Science'),
(302, 'Prof. Minerva McGonagall', 'minerva.m.300@uni.edu', 'General Studies');

-- ========================================================
-- 2. POPULATE CLUBS (IDs 300+)
-- ========================================================
INSERT INTO clubs (club_id, club_name, category, description, email, status, date_established) VALUES 
(301, 'Chess Masters', 'Academic', 'Strategic thinking', 'chess300@uni.edu', 'Active', '2021-05-10'),
(302, 'Golden Eagles Soccer', 'Sport', 'Varsity team', 'soccer300@uni.edu', 'Active', '2020-03-15'),
(303, 'Photography & Art', 'Social and Culture', 'Visual arts club', 'photo300@uni.edu', 'Active', '2022-09-01');

-- ========================================================
-- 3. LINK ADVISORS (Using IDs 300+)
-- ========================================================
INSERT INTO club_advisors (club_id, advisor_id, start_date) VALUES 
(301, 301, '2023-01-01'), -- Chess (301) -> Dr. Grant (301)
(302, 302, '2023-01-01'), -- Soccer (302) -> Prof. McGonagall (302)
(303, 301, '2023-01-01'); -- Photo (303) -> Dr. Grant (301)

-- ========================================================
-- 4. CLUB BUDGETS (IDs 300+)
-- ========================================================
INSERT INTO club_budgets (budget_id, club_id, fiscal_year, allocated_amount) VALUES 
(301, 301, 2024, 1500.00), 
(302, 302, 2024, 5000.00), 
(303, 303, 2024, 2500.00);

-- ========================================================
-- 5. POPULATE STUDENTS (IDs 300+)
-- ========================================================
-- Note: Student Codes changed to S301... to avoid Unique Key errors
INSERT INTO students (student_id, student_code, full_name, email, program) VALUES 
(301, 'S301', 'Alice Archer', 'alice300@uni.edu', 'Math'),
(302, 'S302', 'Bob Baker', 'bob300@uni.edu', 'Math'),
(303, 'S303', 'Charlie Cook', 'charlie300@uni.edu', 'CS'),
(304, 'S304', 'Diana Prince', 'diana300@uni.edu', 'CS'),
(305, 'S305', 'Evan Wright', 'evan300@uni.edu', 'Phy'),

(306, 'S306', 'Frank Castle', 'frank300@uni.edu', 'Sport Sci'),
(307, 'S307', 'Gina Linetti', 'gina300@uni.edu', 'Sport Sci'),
(308, 'S308', 'Harry Potter', 'harry300@uni.edu', 'Eng'),
(309, 'S309', 'Iris West', 'iris300@uni.edu', 'Journ'),
(310, 'S310', 'Jack Sparrow', 'jack300@uni.edu', 'Maritime'),

(311, 'S311', 'Kara Danvers', 'kara300@uni.edu', 'Journ'),
(312, 'S312', 'Leo Messi', 'leo300@uni.edu', 'Art'),
(313, 'S313', 'Mickey Mouse', 'mickey300@uni.edu', 'Art'),
(314, 'S314', 'Natasha Romanoff', 'nat300@uni.edu', 'Hist'),
(315, 'S315', 'Oliver Queen', 'oliver300@uni.edu', 'Bus');

-- ========================================================
-- 6. MEMBERSHIPS (Linking IDs 301-315 to Clubs 301-303)
-- ========================================================

-- Club 301 (Chess): Students 301-305. Student 301 is Leader.
INSERT INTO club_memberships (club_id, student_id, role, join_date) VALUES
(301, 301, 'Club Leader', '2023-09-01'),
(301, 302, 'Member', '2023-09-05'),
(301, 303, 'Treasurer', '2023-09-05'),
(301, 304, 'Member', '2023-09-05'),
(301, 305, 'Member', '2023-09-05');

-- Club 302 (Soccer): Students 306-310. Student 306 is Leader.
INSERT INTO club_memberships (club_id, student_id, role, join_date) VALUES
(302, 306, 'Club Leader', '2023-09-01'),
(302, 307, 'Member', '2023-09-05'),
(302, 308, 'Member', '2023-09-05'),
(302, 309, 'Secretary', '2023-09-05'),
(302, 310, 'Member', '2023-09-05');

-- Club 303 (Photo): Students 311-315. Student 311 is Leader.
INSERT INTO club_memberships (club_id, student_id, role, join_date) VALUES
(303, 311, 'Club Leader', '2023-09-01'),
(303, 312, 'Member', '2023-09-05'),
(303, 313, 'Member', '2023-09-05'),
(303, 314, 'Member', '2023-09-05'),
(303, 315, 'Member', '2023-09-05');

-- ========================================================
-- 7. EVENTS (IDs 300+)
-- ========================================================
INSERT INTO events (event_id, club_id, event_name, event_date, location, status) VALUES
(301, 301, 'Winter Chess Open', '2024-11-15', 'Library Hall', 'Approved'),
(302, 302, 'Regional Soccer Qualifier', '2024-10-20', 'Main Field', 'Approved'),
(303, 303, 'Campus Photo Walk', '2024-09-10', 'Central Park', 'Pending');