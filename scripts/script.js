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
    
     //console.log("Max point for assignment 2 is ", getMaxPointsPerAssignment(2,ag)); 
    //   let learnerScore = learnerScorePerAssignment(submissions,125,ag);
    //   console.log("score is ", learnerScore);
    //   let average = calculateAverageScores(learnerScore);
    //   console.log("Average of all assignments ",average);
      
    //   const assignments = getAssignmentIds(course,ag);
    //   console.log("List of Assignment Ids ",assignments);
      

    // getting all the learners 
      let learners = getAllLearners(submissions);
      let results = [];

      for(let learner of learners){
        let result = {};
        result.learner_id = learner;
        let learnerScorePerAssignments = learnerScorePerAssignment(submissions,learner,ag);
        let averageOverallScore = calculateAverageScores(learnerScorePerAssignments);
        
        let averagePerAssignment = getAveragePerAssignmentPerLearner(learnerScorePerAssignments);

        result.average = averageOverallScore;
        result = appendResult(result,averagePerAssignment);
        results.push(result);
      }
     return results;
 }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log("Final Result");
  console.log(result);

function appendResult(result,avgScores){
    avgScores.forEach(sc => {
        result[Object.keys(sc)[0]] = Object.values(sc)[0];
    });
    return result;
}
//  Get the duedate by assignment
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
        console.error(err);
    }
    return due_date;
}

// average per assignment per learner
function getAveragePerAssignmentPerLearner(learnerScorePerAssignment){
    let something = [];
    for(let el of learnerScorePerAssignment){
        let sample = {};
        sample[el.assignmentId] = el.score / el.maxPoints;        
        something.push(sample);
    }
    return something;
}


// Get all the learner_ids
function getAllLearners(submissions){
    let learners = submissions.reduce((ar,sub)=>{
        if(ar.indexOf(sub.learner_id)==-1){
            ar.push(sub.learner_id);            
        }
        return ar;
    },[]);
    return learners;
}


// Get all assignment_ids
function getAssignmentIds(course,assignmentGroup){
    let assignmentIds = [];
    try{
        if(course.id === assignmentGroup.course_id){
            assignmentGroup.assignments.forEach(el=>{assignmentIds.push(el.id);});
        }else{
            throw new Error("This assignment group doesnot belong to this group")
        }
    }catch(err){
        console.error(err);
    }
    return assignmentIds;
}


// calculate the average of scores per learner
function calculateAverageScores(scorePerLearner){
    let average = 0 , scoreEarned = 0, maxPoints = 0;
    for(let score of scorePerLearner){
        scoreEarned += score.score
        maxPoints += score.maxPoints;
    }
    average = scoreEarned / maxPoints;
    return average;
}

// checking the due date with current date/2025
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
            if(learner.learner_id === learnerId){
                let assignmentId = learner.assignment_id; 
                let score = learner.submission.score;
                let submittedDate = learner.submission.submitted_at;
                const maxPoints = getMaxPointsPerAssignment(assignmentId,ag);
                let dueDate = getDueDateByAssignment(assignmentId,ag);
                if(!checkDueDate(dueDate)){
                        scoreAndMaxScore.assignmentId = assignmentId;
                        scoreAndMaxScore.maxPoints = maxPoints; 
                        // scoreAndMaxScore.score = score;
                        if(submittedDate <= dueDate){
                            scoreAndMaxScore.score = score;
                        }else if(submittedDate > dueDate){
                            const tenPercent = maxPoints/10;
                            score -= tenPercent;
                            scoreAndMaxScore.score = score;
                        }
                        scores.push(scoreAndMaxScore);           
                }
            }
        }); 
    }catch(err){
        console.error(err);
    } 
    return scores;
}

// get the max points of an assignment with ID 
function getMaxPointsPerAssignment(assignmentId,ag){
    const assignments = ag.assignments;   
    let maxpoints = 0;
    try{
        for(let i of assignments){
            if(i.id === assignmentId){
                maxpoints = i.points_possible;
                break;
            }
        }
        if(maxpoints == 0){
            throw  new Error("Max Points cannot be 0");
        }
    }catch(err){
        console.error(err);
    }
    return maxpoints;
}


//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];

//   return result;