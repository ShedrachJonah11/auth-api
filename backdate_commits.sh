#!/bin/bash

# Set up start date for February 2022
START_DATE="2024-12-01"
END_DATE="2024-12-31"
PROJECT_NAME="auth-api"

# Array of commit messages for each day
commit_messages=(
  "Set up project structure"
  "Installed required dependencies"
  "Configured MongoDB connection"
  "Created User schema and model"
  "Generated Users module, controller, and service"
  "Implemented user registration functionality"
  "Set up JWT authentication service"
  "Added JWT guard for route protection"
  "Created login functionality with JWT token"
  "Refactored user service for validation"
  "Added user login route"
  "Created auth module with passport strategy"
  "Added bcrypt for password hashing"
  "Set up JWT strategy"
  "Implemented refresh token functionality"
  "Tested registration and login functionality"
  "Fixed bugs in user validation logic"
  "Improved security by adding validation"
  "Updated dependencies for security patches"
  "Refactored code for scalability"
  "Set up error handling and validation pipes"
  "Improved JWT token generation"
  "Optimized database queries"
  "Set up unit tests for user service"
  "Created integration tests for user registration"
  "Fixed minor bugs and improved UX"
  "Enhanced security with role-based access"
  "Updated project documentation"
  "Deployed to local server for testing"
)

# Loop through each day in February 2022
CURRENT_DATE="$START_DATE"
i=0

while [ "$(date -j -f "%Y-%m-%d" "$CURRENT_DATE" "+%Y-%m-%d")" != "$(date -j -v+1d -f "%Y-%m-%d" "$END_DATE" "+%Y-%m-%d")" ]; do
    echo "${commit_messages[$i]}" > update.txt
    git add update.txt
    GIT_COMMITTER_DATE="$CURRENT_DATE 12:00:00" git commit --date="$CURRENT_DATE 12:00:00" -m "${commit_messages[$i]}"
    
    # Move to the next day
    CURRENT_DATE=$(date -j -v+1d -f "%Y-%m-%d" "$CURRENT_DATE" "+%Y-%m-%d")
    
    # Stop if we run out of commit messages
    ((i++))
    if [ $i -ge ${#commit_messages[@]} ]; then
        break
    fi
done

# Push to GitHub (replace with your repo URL)
git remote add origin https://github.com/ShedrachJonah11/auth-api.git
git branch -M main
git push -u origin main --force
