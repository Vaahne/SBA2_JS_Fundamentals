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
    
    // console.log("Max point for assignment 1 is ", getMaxPointsPerAssignment(2)); 
    let learnerScore = learnerScorePerAssignment(132);
    console.log("score is ", learnerScore);
 }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);
  

// get the score of a Learner per assignment 
// calculate the average of scores
// get the average core per assignment for a learner

function learnerScorePerAssignment(learnerId){
    let scores = [];
    LearnerSubmissions.forEach(learner =>{
        let scoreAndMaxScore = {};
        if(learner.learner_id === learnerId){
           let assignmentId = learner.assignment_id; 
           let score = learner.submission.score;
            let maxPoints = getMaxPointsPerAssignment(assignmentId);
            scoreAndMaxScore.score = score;
            scoreAndMaxScore.maxPoints = maxPoints; 
            scores.push(scoreAndMaxScore);           
        }
    });  
    return scores;
}

// get the max points of an assignment with ID 
function getMaxPointsPerAssignment(assignmentId){
    const assignments = AssignmentGroup.assignments;   
    let maxpoints = 0;
    try{
        assignments.forEach(el =>{
            if(el.id === assignmentId){
                maxpoints = el.points_possible;
            }
        }) ; 
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