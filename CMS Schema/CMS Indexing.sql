use clubs_management;
-- Clubs
CREATE INDEX idx_clubs_status ON clubs(status);
CREATE INDEX idx_clubs_category ON clubs(category);

-- Advisors
CREATE INDEX idx_advisors_department ON advisors(department);

-- Club Memberships
CREATE INDEX idx_cm_club ON club_memberships(club_id);
CREATE INDEX idx_cm_status ON club_memberships(membership_status);

-- Club Advisors
CREATE INDEX idx_ca_club ON club_advisors(club_id);
CREATE INDEX idx_ca_advisor ON club_advisors(advisor_id);

-- Events
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_club ON events(club_id);

-- Event Participants
CREATE INDEX idx_ep_event ON event_participants(event_id);
CREATE INDEX idx_ep_student ON event_participants(student_id);
