### Student Overall Average Scores and Per Assignment Score

## Basic Functionality
 The program returns the result for each learner with overall average, and average per assignment.

## If maxPoints is 0 for any assignment  
The program won't include that assignment in the average calculation.  
The program will throw an error but will continue processing other assignments.  

## If the assignment submitted by the learner is not part of the course  
The program will throw an error and continue processing other assignments.  

## If the score exceeds maxPoints  
The program will throw an error but will continue processing other assignments.  

## If maxPoints or score is not a number  
The program will throw an error.  
The program will continue processing other assignments and calculate the average for valid ones only.  

## If an assignment is submitted after the due date  
The program will deduct a 10% penalty from the earned score.  

## If the due date is in the future  
The program won't include that assignment in the average calculation.  

## What could have been done differently during the planning stages to improve execution?  
I would have implemented validations first, followed by defining the requirements, to ensure smoother execution.  
