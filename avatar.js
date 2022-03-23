
// const index = require("./index.js");
const admin = require('firebase-admin');
const serviceAccount = require('./calpal-86616-9af3ad65df6f.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore();
    // creation of new document
    // db.collection("avatars").doc("zonghan").set({
    //     'name': 'zonghan',
    //     'age': 25
    // });
exports.createAvatar = function createAvatar(name,userId){
    const userRef = db.collection("avatars").doc(`${userId}`);
    if(userRef.exists){
        return;
    }else{
        //create new doc
        db.collection("avatars").doc(`${userId}`).set({
            'userId': userId,
            'name': name, 
            // 'notification-settings': '0900'
        }) 
        db.collection('avatars').doc( `${userId}`).collection('quiz').doc('example').set({
            'name':"Engine Math Quiz",
            'date':"20-03-2022",
            'unixdate':"1647734400",
            'timestart':"1000",
            'timeend':"1200"
        });
        db.collection('avatars').doc( `${userId}`).collection('exam').doc('example').set({
            'name': "MH1011 Engine Math II",
            'date': "20-03-2022",
            'unixdate':"1647734400",
            'timestart': "1300",
            'timeend':"1500"
        });
        db.collection('avatars').doc( `${userId}`).collection('assignment').doc('example').set({
            'name': "Engine Math Tutorial 1",
            'duedate': "20-03-2022",
            'unixdate':"1647734400",
            'duetime':"2359",
        });
        db.collection('avatars').doc( `${userId}`).collection('meeting').doc('example').set({
            'name': "Final Year Project Meeting",
            'date': "20-03-2022",
            'unixdate':"1647734400",
            'timestart': "1400",
            'timeend':"1600"
        });
        db.collection('avatars').doc(`${userId}`).collection('todos').doc('example').set({
            'details':{
                '1' : "Clean hall room",
                '2': " Call club secretary"
            }
        })
    }     
}  
exports.creatingQuiz = function createQuiz(userId,name,date,timestart,timeend){
    const userRef = db.collection("avatars").doc(`${userId}`);
    console.log('Quiz to be created in database');
    function converttounix(date){
        newDate = date.split('-').reverse().join('-');
        console.log(newDate);
          var b = new Date(newDate).getTime()/1000;
          console.log(b);
          return b;
    }
    userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
            db.collection("avatars").doc(`${userId}`).collection("quiz").doc(`${name}`).set({
                'name':name,
                'unixdate':`${converttounix(date)}`,
                'date':date,
                'timestart':timestart,
                'timeend':timeend    
            });
        });
        console.log('Quiz created.')  
    }else{
      console.log('Quiz not created.')  
    }
    }).catch(err=> console.error(err));
}
exports.checkQuizexists = async function checkQuizexists(userId,name){
    const userRef = db.collection("avatars").doc(`${userId}`).collection("quiz").doc(`${name}`);
     const doc = await userRef.get();
   if (!doc.exists) {
     console.log('No such document exists!');
     return false;
   } else {
     console.log('Document data:', doc.data());
     return true;
   }
}
exports.editQuiz = function editQuiz(userId,name,date,timestart,timeend){
    const userRef = db.collection("avatars").doc(`${userId}`);
    function converttounix(date){
        newDate = date.split('-').reverse().join('-');
        console.log(newDate);
          var b = new Date(newDate).getTime()/1000;
          console.log(b);
          return b;
    }
    userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
            db.collection("avatars").doc(`${userId}`).collection("quiz").doc(`${name}`).update({
                'name':name,
                'unixdate':`${converttounix(date)}`,
                'date':date,
                'timestart':timestart,
                'timeend':timeend    
            });
        });
        console.log('Quiz updated.')  
    }else{
      console.log('Quiz not updated.')  
    }
    }).catch(err=> console.error(err));
}
exports.deleteQuiz = async function deleteQuiz(userId,name){
    const userRef = db.collection("avatars").doc(`${userId}`).collection("quiz").doc(`${name}`);
     const doc = await userRef.get();
   if (!doc.exists) {
     console.log('No such document exists!');
     return 'No such document exists!';
   } else {
     console.log('Document data:', doc.data());
     userRef.delete();
     return `Quiz: ${name} deleted`;
   }
}
exports.creatingExam = function createExam(userId,name,date,timestart, timeend){
    const userRef = db.collection("avatars").doc(`${userId}`);
    function converttounix(date){
        newDate = date.split('-').reverse().join('-');
        console.log(newDate);
          var b = new Date(newDate).getTime()/1000;
          console.log(b);
          return b;
    }
    console.log('Exam to be created in database');

    userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
            db.collection("avatars").doc(`${userId}`).collection("exam").doc(`${name}`).set({
                'name':name,
                'unixdate':`${converttounix(date)}`,
                'date':date,
                'timestart':timestart,
                'timeend':timeend       
            });
        });
        console.log('Exam created.')  
    }else{
      console.log('Exam not created.')  
    }
    }).catch(err=> console.error(err));
}
exports.checkExamexists = async function checkExamexists(userId,name){
    const userRef = db.collection("avatars").doc(`${userId}`).collection("exam").doc(`${name}`);
     const doc = await userRef.get();
   if (!doc.exists) {
     console.log('No such document exists!');
     return false;
   } else {
     console.log('Document data:', doc.data());
     return true;
   }
}
exports.editExam = function editExam(userId,name,date,timestart,timeend){
    const userRef = db.collection("avatars").doc(`${userId}`);
    function converttounix(date){
        newDate = date.split('-').reverse().join('-');
        console.log(newDate);
          var b = new Date(newDate).getTime()/1000;
          console.log(b);
          return b;
    }
    userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
            db.collection("avatars").doc(`${userId}`).collection("exam").doc(`${name}`).update({
                'name':name,
                'unixdate':`${converttounix(date)}`,
                'date':date,
                'timestart':timestart,
                'timeend':timeend    
            });
        });
        console.log('Exam updated.')  
    }else{
      console.log('Exam not updated.')  
    }
    }).catch(err=> console.error(err));
}
exports.deleteExam = async function deleteExam(userId,name){
    const userRef = db.collection("avatars").doc(`${userId}`).collection("exam").doc(`${name}`);
     const doc = await userRef.get();
   if (!doc.exists) {
     console.log('No such document exists!');
     return 'No such document exists!';
   } else {
     console.log('Document data:', doc.data());
     userRef.delete();
     return `Exam: ${name} deleted`;
   }
}
exports.creatingAssignment = function createAssignment(userId,name,date,time){
    const userRef = db.collection("avatars").doc(`${userId}`);
    console.log('Assignment to be created in database');
    function converttounix(date){
        newDate = date.split('-').reverse().join('-');
        console.log(newDate);
          var b = new Date(newDate).getTime()/1000;
          console.log(b);
          return b.toString();
    }
    userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
            db.collection("avatars").doc(`${userId}`).collection("assignment").doc(`${name}`).set({
                'name':name,
                'unixdate':`${converttounix(date)}`,
                'duedate':date,
                'duetime':time     
            });
        });
        console.log('Assignment created.')  
    }else{
      console.log('Assignment not created.')  
    }
    }).catch(err=> console.error(err));
}
exports.checkAssignexists = async function checkAssignexists(userId,name){
    const userRef = db.collection("avatars").doc(`${userId}`).collection("assignment").doc(`${name}`);
     const doc = await userRef.get();
   if (!doc.exists) {
     console.log('No such document exists!');
     return false;
   } else {
     console.log('Document data:', doc.data());
     return true;
   }
}
exports.editAssignment = function editAssignment(userId,name,date,time){
    const userRef = db.collection("avatars").doc(`${userId}`);
    function converttounix(date){
        newDate = date.split('-').reverse().join('-');
        console.log(newDate);
          var b = new Date(newDate).getTime()/1000;
          console.log(b);
          return b;
    }
    userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
            db.collection("avatars").doc(`${userId}`).collection("assignment").doc(`${name}`).update({
                'name':name,
                'unixdate':`${converttounix(date)}`,
                'duedate':date,
                'duetime':time   
            });
        });
        console.log('Assignment updated.')  
    }else{
      console.log('Assignment not updated.')  
    }
    }).catch(err=> console.error(err));
}
exports.deleteAssignment = async function deleteAssignment(userId,name){
    const userRef = db.collection("avatars").doc(`${userId}`).collection("assignment").doc(`${name}`);
     const doc = await userRef.get();
   if (!doc.exists) {
     console.log('No such document exists!');
     return 'No such document exists!';
   } else {
     console.log('Document data:', doc.data());
     userRef.delete();
     return `Assignment: ${name} deleted`;
   }
}
exports.creatingMeeting = function createMeeting(userId,name,date,timestart,timeend){
    const userRef = db.collection("avatars").doc(`${userId}`);
    console.log('Meeting to be created in database');
    function converttounix(date){
        newDate = date.split('-').reverse().join('-');
        console.log(newDate);
          var b = new Date(newDate).getTime()/1000;
          console.log(b);
          return b;
    }
    userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
            db.collection("avatars").doc(`${userId}`).collection("meeting").doc(`${name}`).set({
                'name':name,
                'unixdate':`${converttounix(date)}`,
                'date':date,
                'timestart':timestart,
                'timeend':timeend
            });
        });
        console.log('Meeting created.')  
    }else{
      console.log('Meeting not created.')  
    }
    }).catch(err=> console.error(err));
}
exports.checkMeetingexists = async function checkMeetingexists(userId,name){
    const userRef = db.collection("avatars").doc(`${userId}`).collection("meeting").doc(`${name}`);
     const doc = await userRef.get();
   if (!doc.exists) {
     console.log('No such document exists!');
     return false;
   } else {
     console.log('Document data:', doc.data());
     return true;
   }
}
exports.editMeeting = function editMeeting(userId,name,date,timestart,timeend){
    const userRef = db.collection("avatars").doc(`${userId}`);
    function converttounix(date){
        newDate = date.split('-').reverse().join('-');
        console.log(newDate);
          var b = new Date(newDate).getTime()/1000;
          console.log(b);
          return b;
    }
    userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
        userRef.onSnapshot((doc) => {
            db.collection("avatars").doc(`${userId}`).collection("meeting").doc(`${name}`).update({
                'name':name,
                'unixdate':`${converttounix(date)}`,
                'date':date,
                'timestart':timestart,
                'timeend':timeend    
            });
        });
        console.log('Exam updated.')  
    }else{
      console.log('Exam not updated.')  
    }
    }).catch(err=> console.error(err));
}
exports.deleteMeeting = async function deleteMeeting(userId,name){
    const userRef = db.collection("avatars").doc(`${userId}`).collection("meeting").doc(`${name}`);
     const doc = await userRef.get();
   if (!doc.exists) {
     console.log('No such document exists!');
     return 'No such document exists!';
   } else {
     console.log('Document data:', doc.data());
     userRef.delete();
     return `Meeting: ${name} deleted`;
   }
}
exports.getUpcomingAssignments = async function getUpcomingAssignments(userId,dateIn) {
    const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('assignment');
    const sevDaysLater = dateIn + (86400 * 7);
    let snapshot;
    try{
         snapshot = await userRefAssign.where('unixdate', '>=', `${dateIn}`).where('unixdate', '<=', `${sevDaysLater}`).get();
     
    } catch(e){
        console.log(e);
    }
    // console.log(snapshot.docs.map((d)=>d.data()))
    if (snapshot.empty) {
        var normdate = timeConverter(dateIn);
        var normsevdate = timeConverter(sevDaysLater);
        var reply = `No assignments between ${normdate} & ${normsevdate}\n\n`;
        // console.log(reply);
        return reply;
        } else{
            var assignDocs = snapshot.docs.map(doc => renderData(doc))
            return assignDocs;
        } 

}
exports.editAssignList = async function editAssignList(userId,dateIn) {
    const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('assignment');
    // const sevDaysLater = dateIn + (86400 * 7);
    console.log(dateIn);
    let snapshot;
    try{
         snapshot = await userRefAssign.where('unixdate', '>=', `${dateIn}`).get();
     
    } catch(e){
        console.log(e);
    }
    // console.log(snapshot.docs.map((d)=>d.data()))
    if (snapshot.empty) {
        var normdate = timeConverter(dateIn);
        var reply = `No assignments after ${normdate} \n`;
        // console.log(reply);
        return reply;
        } else{
            var assignDocs = snapshot.docs.map(doc => renderData(doc))
            return assignDocs;
        } 
}
//formatting the doc's data for readability renderData for assignment
function renderData(doc){
    var name = doc.data().name;
    var date = doc.data().duedate;
    var time = doc.data().duetime;
    console.log('rendering data');
    const reply = 'name: '+ name +'\ndate: '+ date + '\ntime: ' + time + '\n\n';
    // console.log(reply);
    return reply;
}
//formatting the doc's data for readability renderData for Quiz, Exam, Meeting 
function renderMoreData(doc){
    var name = doc.data().name;
    var date = doc.data().date;
    var timeStart = doc.data().timestart;
    var timeEnd = doc.data().timeend;
    console.log('rendering data');
    const reply = 'name: '+ name +'\ndate: '+ date + '\ntime: ' + timeStart +"-" + timeEnd + '\n\n';
    // console.log(reply);
    return reply;
}
exports.getUpcomingQuiz = async function getUpcomingQuiz(userId,dateIn) {
    const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('quiz');
    const sevDaysLater = dateIn + (86400 * 7);
    console.log(dateIn);
    let snapshot;
    try{
         snapshot = await userRefAssign.where('unixdate', '>=', `${dateIn}`).where('unixdate', '<=', `${sevDaysLater}`).get();
     
    } catch(e){
        console.log(e);
    }
    // console.log(snapshot.docs.map((d)=>d.data()))
    if (snapshot.empty) {
        var normdate = timeConverter(dateIn);
        var normsevdate = timeConverter(sevDaysLater);
        var reply = `No quizzes between ${normdate} & ${normsevdate}\n\n`;
        // console.log(reply);
        return reply;
        } else{
            var assignDocs = snapshot.docs.map(doc => renderMoreData(doc))
            return assignDocs;
        } 
}
exports.editQuizList = async function editQuizList(userId,dateIn) {
    const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('quiz');
    // const sevDaysLater = dateIn + (86400 * 7);
    console.log(dateIn);
    let snapshot;
    try{
         snapshot = await userRefAssign.where('unixdate', '>=', `${dateIn}`).get();
     
    } catch(e){
        console.log(e);
    }
    // console.log(snapshot.docs.map((d)=>d.data()))
    if (snapshot.empty) {
        var normdate = timeConverter(dateIn);
        var reply = `No quizzes after ${normdate} \n`;
        // console.log(reply);
        return reply;
        } else{
            var assignDocs = snapshot.docs.map(doc => renderMoreData(doc))
            return assignDocs;
        } 
}

    exports.getUpcomingExam = async function getUpcomingExam(userId,dateIn) {
    const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('exam');
    const sevDaysLater = dateIn + (86400 * 7);
    console.log(dateIn);
    let snapshot;
    try{
         snapshot = await userRefAssign.where('unixdate', '>=', `${dateIn}`).where('unixdate', '<=', `${sevDaysLater}`).get();
     
    } catch(e){
        console.log(e);
    }
    // console.log(snapshot.docs.map((d)=>d.data()))
    if (snapshot.empty) {
        var normdate = timeConverter(dateIn);
        var normsevdate = timeConverter(sevDaysLater);
        var reply = `No exams between ${normdate} & ${normsevdate}\n\n`;
        // console.log(reply);
        return reply;
        } else{
            var assignDocs = snapshot.docs.map(doc => renderMoreData(doc))
            return assignDocs;
        } 
    }
    exports.editExamList = async function editExamList(userId,dateIn) {
    const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('exam');
    // const sevDaysLater = dateIn + (86400 * 7);
    let snapshot;
    try{
         snapshot = await userRefAssign.where('unixdate', '>=', `${dateIn}`).get();
     
    } catch(e){
        console.log(e);
    }
    // console.log(snapshot.docs.map((d)=>d.data()))
    if (snapshot.empty) {
        var normdate = timeConverter(dateIn);
        var reply = `No exams after ${normdate} \n`;
        // console.log(reply);
        return reply;
        } else{
            var assignDocs = snapshot.docs.map(doc => renderMoreData(doc))
            return assignDocs;
        } 
    }
    exports.getUpcomingMeeting = async function getUpcomingMeeting(userId,dateIn) {
        const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('meeting');
        const sevDaysLater = dateIn + (86400 * 7);
        let snapshot;
        try{
             snapshot = await userRefAssign.where('unixdate', '>=', `${dateIn}`).where('unixdate', '<=', `${sevDaysLater}`).get();
         
        } catch(e){
            console.log(e);
        }
        // console.log(snapshot.docs.map((d)=>d.data()))
        if (snapshot.empty) {
            var normdate = timeConverter(dateIn);
            var normsevdate = timeConverter(sevDaysLater);
            var reply = `No meetings between ${normdate} & ${normsevdate}\n\n`;
            // console.log(reply);
            return reply;
            } else{
                var assignDocs = snapshot.docs.map(doc => renderMoreData(doc))
                return assignDocs;
            } 
    }
     exports.editMeetingList = async function editMeetingList(userId,dateIn) {
    const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('meeting');
    // const sevDaysLater = dateIn + (86400 * 7);
    let snapshot;
    try{
         snapshot = await userRefAssign.where('unixdate', '>=', `${dateIn}`).get();
     
    } catch(e){
        console.log(e);
    }
    // console.log(snapshot.docs.map((d)=>d.data()))
    if (snapshot.empty) {
        var normdate = timeConverter(dateIn);
        var reply = `No meetings after ${normdate} \n`;
        // console.log(reply);
        return reply;
        } else{
            var assignDocs = snapshot.docs.map(doc => renderMoreData(doc))
            return assignDocs;
        } 
    }
    exports.getsearchquiz = async function getsearchquiz(userId,name) {
        const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('quiz');
        let snapshot;
        try{
             snapshot = await userRefAssign.where('name', '==', `${name}`).get();
         
        } catch(e){
            console.log(e);
        }
        // console.log(snapshot.docs.map((d)=>d.data()))
        if (snapshot.empty) {
            return `No Quiz with name: ${name}\n\n`;
            } else{
                var assignDocs = snapshot.docs.map(doc => renderMoreData(doc))
                return `Quiz:\n${assignDocs}`;
            } 
    }
    exports.getsearchassign = async function getsearchassign(userId,name) {
        const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('assignment');
        let snapshot;
        try{
             snapshot = await userRefAssign.where('name', '==', `${name}`).get();
         
        } catch(e){
            console.log(e);
        }
        // console.log(snapshot.docs.map((d)=>d.data()))
        if (snapshot.empty) {
            return `No Assignment with name: ${name}\n\n`;
        } else{
            var assignDocs = snapshot.docs.map(doc => renderData(doc))
            return `Assignment:\n${assignDocs}`;
        } 
    }
    exports.getsearchexam = async function getsearchquiz(userId,name) {
        const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('exam');
        let snapshot;
        try{
             snapshot = await userRefAssign.where('name', '==', `${name}`).get();
            
        } catch(e){
            console.log(e);
        }
        // console.log(snapshot.docs.map((d)=>d.data()))
        if (snapshot.empty) {
            return `No Exam with name: ${name}\n\n`;
            } else{
                var assignDocs = snapshot.docs.map(doc => renderMoreData(doc))
                return `Exam:\n${assignDocs}`;
            } 
    }
    exports.getsearchmeeting = async function getsearchmeeting(userId,name) {
        const userRefAssign = db.collection("avatars").doc(`${userId}`).collection('meeting');
        let snapshot;
        try{
             snapshot = await userRefAssign.where('name', '==', `${name}`).get();
         
        } catch(e){
            console.log(e);
        }
        // console.log(snapshot.docs.map((d)=>d.data()))
        if (snapshot.empty) {
            return `No Meeting with name: ${name}\n\n`;
            } else{
                var assignDocs = snapshot.docs.map(doc => renderMoreData(doc))
                return `Meeting:\n${assignDocs}`;
            } 
    }
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    var day = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var sec = a.getSeconds();
    var time = day + '-' + month + '-' + year + ' ';
    return time;
  }    