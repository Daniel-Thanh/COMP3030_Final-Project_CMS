# Clubs Management System (CMS)
Group members: Ha Kien, Tran Ho Chi Thanh

## 1. Introduction
- Problem: Currently VinUniversity's Student Affairs Management (SAM) office is experiencing several difficulties in managing and coordinating with more than 30 active clubs:
  + Information regarding budget, club members and events are stored across many manual documents and spreedsheets.
  + The monitoring of clubs' activities is hard and cumbersome because of the lack of centralized data.
  + The current reporting process is manual and has a large margin for errors.
  
- Solution: A compact SQL-based information system, supporting secure data management, CRUD operations, analytics, and optional integration with a web interface. Its purpose is to streamline the management of student clubs, including member records, advisor assignments, budgeting, and event tracking.

## 2. Requirements
### Functional Requirements
1. **Entities Management (CRUD)**
   - Add, edit, delete, and search Clubs, Members, Advisors, Budgets, and Events.
   - Provide filtering and sorting (e.g., by club type, member year, event date).

2. **Membership Management**
   - Track student membership details, join date, roles, and status.

3. **Event Management**
   - Schedule events, record locations, participation and outcomes.
   - Associate events with clubs and advisors.

4. **Budget and Expense Tracking**
   - Store annual club budgets and manage expenses.
   - Summaries for financial reporting.

5. **Analytics & Reporting**
   - Monthly and annual statistics for memberships, events, and expenses.
   - Views for frequent reporting.
   - Aggregations using SQL `GROUP BY` and window functions.

6. **Security**
   - User roles: Admin, Staff, Club Representative.
   - Password encryption using MySQL functions.
   - Protection against SQL injection with parameterized queries.

7. **Audit & Data Integrity**
   - Triggers for audit logging and data validation.

---

### Non-Functional Requirements
1. **Performance**
   - Use of indexing and optimized query execution.

2. **Scalability**
   - Support a growing number of clubs, events, and members.

3. **Reliability**
   - Referential integrity enforced with foreign keys.

4. **Usability**
   - Schema designed to support an intuitive web interface.

5. **Security**
   - Role-based access control and encrypted fields.

6. **Maintainability**
   - Clean DDL structure and modular stored procedures.

---

## 4. Planned Core Entities
1. **Clubs** – Basic club information (name, type, description).  
2. **Members** – Student profiles and membership details.  
3. **Advisors** – Faculty/staff assigned to clubs.  
4. **Budget** – Annual budget allocation and tracking.  
5. **Events** – Club events with dates, locations, and expenses.

**Optional extensions:**
- Expenses  
- Roles (e.g., president, treasurer)  
- Club Categories  
- Event Participants  

---

## 5. Tech Stack

### Database Layer
- **MySQL** (primary database system)
- MySQL Workbench for modeling and SQL scripting  
- MySQL features:
  - Views  
  - Stored Procedures  
  - Triggers  
  - Indexing & Query Optimization  
  - User Roles & Privileges  

### Web Interface (Planned)
- To be decided (PHP, Node.js, Python Flask/Django, etc.)
- HTML/CSS/JavaScript for front-end
- Integration via MySQL connectors or ORM

### 6. Timeline
**Phase 1 — Team Formation & Topic Selection**
Deadline: Dec 1, 2025

- Nov 26 – Dec 1
Tasks:
- Form team, confirm roles (DB architect, documentation lead, tester, optional dev).
- Finalize topic: Clubs Management System (CMS).
- Draft initial problem description and objectives.
- Create a lightweight proposal (1–2 pages).

Outputs:
- Team registration
- Topic confirmation
- Proposal draft

**Phase 2 — Peer Review of Proposals**
Deadline: Dec 8, 2025

Dec 1 – Dec 8
Tasks:
- Refine proposal after internal discussion.
- Prepare a high-level conceptual overview:
- Core entities: Clubs, Members, Advisors, Events, Budget
- Optional add-ons (Roles, Expenses, Participants)
- Submit proposal for peer review.
- Receive feedback, analyze critique.
- Adjust the scope and clarify risks (time constraints, web interface optional).

Outputs:
- Peer-reviewed proposal
- Updated problem statement + system scope
- Adjusted project plan

**Phase 3 — Database Design Document (Major Milestone)**
Deadline: Dec 15, 2025

Dec 8 – Dec 15
Tasks:

1. ERD (Conceptual + Logical)
  Finalize entities, attributes, and relationships.
  Resolve many-to-many bridges (e.g., Membership table).
  Validate constraints: FK, uniqueness, optional vs mandatory.

2. DDL (Physical Database Schema)
  Implement CREATE TABLE scripts with:
+ PK, FK
+ Indexes (basic)
+ Data types
+ Check constraints
+ Simple audit fields (created_at, updated_at)

3. Define Supporting Features (Design Only)
  List expected views, stored procedures, triggers—design but do not code yet.
  Define security model (roles: Admin, Staff, Club Rep).

4. Task Division
  Who handles schema
  Who prepares sample data
  Who writes triggers & SPs
  Who builds the optional UI (if implemented)
  Who manages documentation & testing

Outputs (Required Submission):
- ERD (PDF + source file)
- Full DDL script (schema creation)
- Task division table
- Design document (5–10 pages)

**Phase 4 — Final System Implementation & Presentation**
Deadline: Dec 22, 2025

Dec 15 – Dec 22

Week Tasks (Dec 15–22):
1. Implement Core Features
  CRUD fully functional for core entities
  Insert sample data (10–15 clubs, ~100 members simulated)

2. Implement Advanced Features
  Views for monthly events, budget overview, membership summaries
  Stored Procedures for common operations (add_member, add_event…)
  Triggers:
+ Audit logs
+ Validation rules (e.g., budget not exceeded)

3. Analytics
  GROUP BY summaries
  Window functions (rank clubs by event count, rolling expenses)

4. Performance & Security
  Add indexes on FK and frequently queried fields
  Review role-based privileges
  Ensure queries use parameterization (written in design, not necessarily implemented in UI)

5. Optional Web Interface
  If time permits:
+ Simple UI for Club CRUD
+ Event listing dashboard
+ Minimal login mock (not full authentication)

6. Documentation & Slides
  Describe architecture, schema, and features
  Include screenshots of queries, views, triggers
  Prepare a clean slide deck:
+ Problem → Solution
+ ERD → DDL highlights
+ Demo flow
+ Analytics results
+ Future improvements

Final Output (Dec 22 Submission)
- Final SQL scripts
- Demo screenshots
- System description & user guide
- Presentation slides

---
