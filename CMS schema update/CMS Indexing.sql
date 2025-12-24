-- Clubs
CREATE INDEX idx_clubs_status ON clubs(status);
CREATE INDEX idx_clubs_category ON clubs(category);

-- Advisors
CREATE INDEX idx_advisors_department ON advisors(department);

-- club_memberships
CREATE INDEX idx_cm_club ON club_memberships(club_id);
CREATE INDEX idx_cm_student ON club_memberships(student_id);
CREATE INDEX idx_cm_status ON club_memberships(membership_status);

-- club_advisors
CREATE INDEX idx_ca_club ON club_advisors(club_id);
CREATE INDEX idx_ca_advisor ON club_advisors(advisor_id);

-- events
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_club ON events(club_id);

-- Expenses
CREATE INDEX idx_expenses_budget ON expenses(budget_id);
CREATE INDEX idx_expenses_date ON expenses(expense_date);

