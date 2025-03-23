// SBA2 Java Script Fundamentals
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
     
      let learners = getAllLearners(submissions);   // getting all the learners 
      let results = [];
        
      for(let learner of learners){
        let result = {};
        result.learner_id = learner;
        let learnerAssignmentScores = learnerScorePerAssignment(submissions,learner,ag);
        let averageOverallScore = calculateAverageScores(learnerAssignmentScores,learner);        
        let averagePerAssignment = getAveragePerAssignmentPerLearner(learnerAssignmentScores);

        result.avg = averageOverallScore;
        result = appendResult(result,averagePerAssignment);
        results.push(result);
      }
     return results;
 }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log("Result",result);

// appends the average of each assignment to the final result
function appendResult(result,avgScores){
    avgScores.forEach(sc => {
        result[Object.keys(sc)[0]] = Object.values(sc)[0];
    });
    return result;
}

//  returns the due_date by assignment_id
function getDueDateByAssignment(assignmentId,ag){
    const assignments = ag.assignments;   
    let due_date = new Date();
    try{
        for(let i of assignments){
            if(i.id === assignmentId){  
                due_date = i.due_at ;
                break;
            }
        }
    }catch(err){
        console.log(err.message);
    }
    return due_date;
}

// average per assignment per learner
// returns an array of objects with [{assignment_id : avg_score}]
function getAveragePerAssignmentPerLearner(learnerScorePerAssignment){
    let averageScorePerAssignment = [];
    for(let el of learnerScorePerAssignment){
        let sample = {};
        sample[el.assignmentId] = parseFloat((el.score / el.maxPoints).toFixed(2));
        averageScorePerAssignment.push(sample);
    }
    return averageScorePerAssignment;
}

//  Returns array of learner_ids
function getAllLearners(submissions){
    let learners = submissions.reduce((ar,sub)=>{
        if(ar.indexOf(sub.learner_id)==-1){
            ar.push(sub.learner_id);            
        }
        return ar;
    },[]);
    return learners;
}

// Returns array of assignment_ids
function getAssignmentIds(course,assignmentGroup){
    let assignmentIds = [];
    try{
        if(course.id === assignmentGroup.course_id){
            assignmentGroup.assignments.forEach(el=>{
                    assignmentIds.push(el.id);
            });
        }else{
            throw new Error(`This assignment group ${assignmentGroup} doesnot belong to this group`)
        }
    }catch(err){
        console.log(err.message);
    }
    return assignmentIds;
}
//Returns average of all assignment scores of learner
function calculateAverageScores(scorePerLearner,learner_id){
    let average = 0 , scoreEarned = 0, maxPoints = 0;
    for(let score of scorePerLearner){
        try{
            if(!isNaN(score.score) && !isNaN(score.maxPoints)){
                scoreEarned += parseInt(score.score);
                maxPoints += parseInt(score.maxPoints);
            }else 
                throw new Error(`For Learner: ${learner_id}, Score: ${score.score}  is not a number `);        
        }catch(err){
            console.log(err.message);
        }
    }
    if(scoreEarned == 0) return 0;
    average = scoreEarned / maxPoints;
    return parseFloat(average.toFixed(3));
}

// checking the due date with current date/2025 & returns boolean,if due_Date is > 2025 or current date
function checkDueDate(dueDate){
    let today = new Date();
    let date = JSON.stringify(today).split("T")[0];
    date = date.slice(1,date.length-1);
    let isTrue = (dueDate>date)?(true):(false);
    return isTrue;
}
// get the score of a Learner per assignment with max score
function learnerScorePerAssignment(submissions,learnerId,ag){
    let scores = [];
    try{
        submissions.forEach(learner =>{
            let scoreAndMaxScore = {};
            try{
            if(learner.learner_id === learnerId){
                const assignmentId = learner.assignment_id; 
                let score = learner.submission.score;
                const submittedDate = learner.submission.submitted_at;

                if(validateAssignment(CourseInfo,assignmentId)){ // validating assignment  submitted by learner with existing assignments
                    const maxPoints = getMaxPointsPerAssignment(assignmentId,ag);
                    let dueDate = getDueDateByAssignment(assignmentId,ag);
                    
                    if(!checkDueDate(dueDate)){ //checking due_date is pass current date or not 
                        try {   
                            if(!isNaN(score) && !isNaN(maxPoints)){
                                if(score > maxPoints && maxPoints!=0 && isNaN(maxPoints))
                                    throw new Error(`learner: ${learnerId}, score: ${score} cannot be more than maxPoints: ${maxPoints}`);
                                
                                scoreAndMaxScore.assignmentId = assignmentId;
                                scoreAndMaxScore.maxPoints = maxPoints; 
                            
                                if(submittedDate <= dueDate && score <= maxPoints){
                                    scoreAndMaxScore.score = parseInt(score);
                                }else if(submittedDate > dueDate && score <= maxPoints){
                                    const tenPercent = maxPoints/10;
                                    score -= tenPercent;
                                    scoreAndMaxScore.score = parseInt(score);
                                }
                                if(scoreAndMaxScore.score)
                                    scores.push(scoreAndMaxScore);    
                            }else{
                                throw new Error(`For Learner: ${learner.learner_id}, Score: ${score}  is not a number`);
                            }
                        }catch(err){
                            console.log(err.message);
                        }
                    }
                }else{
                    throw new Error(`Assignment Id : ${assignmentId},  submitted by learner : ${learnerId} ,doesnot exist in the course`);
                }
            }
            }catch(err){
                console.log(err.message);
            }
        }); 
    }catch(err){
         console.log(err.message);
    } 
    return scores;
}
// function scoreCheck(score,maxPoints){
//     if(score > maxPoints && maxPoints!=0)
//         throw new Error("Score cannot be more than max points");
//     return true;
// }

// check if assignment belongs to assignment group or not
function validateAssignment(course,assignment_id){
    if(getAssignmentIds(course,AssignmentGroup).indexOf(assignment_id) == -1)
        return false;
    return true;
}


// get the max points of an assignment with ID 
function getMaxPointsPerAssignment(assignmentId,ag){
    const assignments = ag.assignments;   
    let maxpoints = -1;
    try{
        if(!validateAssignment(CourseInfo,assignmentId)){
            throw new Error(`Assignment id ${assignmentId} doesn't belong to the course`);
        }else{  
                for(let i of assignments){
                    if(i.id === assignmentId){
                        if(!isNaN(i.points_possible)){
                            maxpoints = i.points_possible;
                        }else
                            throw new Error(`Assignment: ${assignmentId} has Possible_points :${i.points_possible} in not a number`);
                        break;
                    }
                }
                if(maxpoints <= 0){
                    throw new Error(`Assignment: ${assignmentId}, Max Points can not be 0 `);
                }
            }
        }catch(err){
        console.log(err.message);
        }
    return maxpoints;
}