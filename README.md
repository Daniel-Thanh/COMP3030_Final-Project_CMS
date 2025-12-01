# Clubs Management System (CMS)

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

---
