# SAM's Club Management System - Complete Installation Guide

## Prerequisites

- XAMPP (includes Apache, MySQL, PHP)
- Node.js (v18 or higher)
- Web browser (Chrome, Firefox, Edge, etc.)

## Part 1: Backend Setup (PHP)

### Step 1: Install XAMPP
1. Download XAMPP from [https://www.apachefriends.org](https://www.apachefriends.org)
2. Install XAMPP to `C:\xampp\` (default location)

### Step 2: Where to place backend files
1. Navigate to `C:\xampp\htdocs\`
2. Create a folder named `sam-club`
3. Inside `sam-club`, create two folders: `config` and `api`
4. Copy file from config/db.php to C:\xampp\htdocs\sam-club\config\`
5. Copy all files from `api` to `C:\xampp\htdocs\sam-club\api\`

Your structure should look like:

<img width="295" height="384" alt="image" src="https://github.com/user-attachments/assets/0d4791c1-c995-4fe2-848c-e3f25b30196d" />

### Step 3: Start XAMPP Services
1. Open XAMPP Control Panel
2. Click "Start" next to **Apache**
3. Click "Start" next to **MySQL**
4. Wait until both show "Running" status

### Step 4: Create Database
1. Open browser and go to `http://localhost/phpmyadmin`
2. Click "SQL" tab at the top
3. Open the file `database/sample_data.sql` from the downloaded frontend
4. Copy ALL sql ddl script, including schemas, stored procedures, views, triggers
5. Paste into the SQL tab in phpMyAdmin
6. Click "Go" button
7. You should see "clubs_management" database appear on the left sidebar

In case the phpadmin gets crashed (which we already experienced during the project), you can connect xampp to sqlworkbench
1. Change this file: xampp/htdocs/sam-club/config/db.php 
and change those lines: \
```
$host = "localhost";
$db   = "clubs_management";
$user = "root";
$pass = "";
```

to fit your sqlworkbench set up.

Alert:
- If using phpMyAdmin → keep $pass empty
- If using MySQL Workbench → set $pass to your MySQL password (recommended)


### Step 5: Verify Backend
1. For example, open browser and visit an api endpoint: `http://localhost/sam-club/api/clubs.php`
2. You should see JSON data with clubs
3. If you see an error, check:
   - Apache and MySQL are running in XAMPP
   - Files are in the correct location
   - Database was created successfully

## Part 2: Frontend Setup (Next.js)

### Step 1: Extract Downloaded Files
1. Extract the downloaded ZIP file to any location (e.g., `C:\Projects\sam-frontend\`)

### Step 2: Install Node.js Dependencies
1. Open Command Prompt or PowerShell
2. Navigate to the frontend folder:
   ```bash
   cd C:\Projects\sam-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   (This will take 1-2 minutes)

### Step 3: Start Frontend Server
1. In the same terminal, run:
   ```bash
   npm run dev
   ```
2. Wait for "Ready" message
3. Open browser and go to `http://localhost:3000`

## Part 3: Using the System

### Dashboard Features

1. **Overview Tab**
   - Displays total number of clubs, events, members, and advisors
   - Shows quick statistics for system monitoring
   - Provides a recent activity log for tracking system actions

2. **Clubs Tab**
   - View all clubs in a structured table
   - Add new clubs using the **Add Club** function
   - Edit or delete existing club information

3. **Events Tab**
   - View all club events and their statuses
   - Create new events for clubs
   - Approve or reject pending events
   - Manage event participants and attendance records

4. **Budgets Tab**
   - Allocate annual budgets to clubs
   - Record and track club expenses
   - View remaining budget balances and spending summaries

5. **Memberships Tab**
   - Add students to clubs
   - Assign and update member roles (President, Vice President, Member, etc.)
   - Remove students from clubs when necessary

6. **Advisors Tab**
   - View all registered advisors
   - Assign advisors to clubs
   - Manage advisor–club relationships

7. **Reports Tab**
   - View analytical reports on memberships, events, and budgets
   - Display monthly and annual statistics using aggregated data
   - Support decision-making through summarized and historical insights

## Testing the System

### Test Workflow

1. **View existing data**: Navigate through all tabs to see sample data
2. **Add a new club**: Go to Clubs tab → Click "Add Club" → Fill form → Save
3. **Create an event**: Go to Events tab → Click "Add Event" → Fill form → Save
4. **Approve event**: Find the pending event → Click "Approve"
5. **Add membership**: Go to Memberships → "Add Membership" → Select club and student
6. **Check recent activity status**: Go to dashboard

## Troubleshooting

### Frontend Shows "Failed to fetch"
**Problem**: Frontend can't connect to PHP backend

**Solution**:
1. Check XAMPP Apache is running
2. Verify `http://localhost/sam-club/api/clubs.php` works in browser
3. Check CORS headers are in all PHP files

### Database Connection Failed
**Problem**: PHP can't connect to MySQL

**Solution**:
1. Check MySQL is running in XAMPP
2. Verify database name is `clubs_management` in phpMyAdmin
3. Check `config/db.php` settings match your setup

### npm install Fails
**Problem**: Permission or network errors

**Solution**:
1. Run Command Prompt as Administrator
2. Try moving the frontend folder to a different location (not in `C:\Users\`)
3. Check your internet connection

### Port 3000 or 80 Already in Use
**Problem**: Another application is using the port

**Solution**:
- For port 80 (Apache): Stop IIS or Skype using port 80
- For port 3000 (Next.js): Close other Node.js applications or use different port:
  ```bash
  npm run dev -- -p 3001
  ```

## Next Steps

After successful installation:
1. Explore all features
2. Add your own data (real clubs, students, events)
3. Customize the design if needed
4. Consider adding authentication for production use

## Support

If you encounter any issues not covered here, check:
1. XAMPP error logs: `C:\xampp\apache\logs\error.log`
2. Browser console (Press F12 → Console tab)
3. Terminal output where `npm run dev` is running
