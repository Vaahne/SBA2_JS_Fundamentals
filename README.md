### Student Overall Average Scores and Per Assignment Score

## Basic Functionality
 The program calculates each learner's overall average score and average per assignment while handling errors gracefully.

## Handling Invalid Data  
 If maxPoints is 0, the assignment is excluded from the average calculation, and an error is logged.

 If maxPoints or score is not a number, an error is logged, but valid assignments are still processed.
 
 If the score exceeds maxPoints, an error is logged, and processing continues.
 
 If an assignment is not part of the course, an error is logged, and processing continues.

## Late Submissions and Future Due Dates  
 Late submissions incur a 10% penalty on the earned score.
 Future-dated assignments are excluded from the average calculation.

## What could have been done differently during the planning stages to improve execution?  
 Prioritizing validations first, followed by defining the requirements, to ensure smoother execution.  
