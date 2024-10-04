let storage = [
    {
      quesId: "1",
      question:
        "A lady meets a person in the market who is the wife of the brother of her husband. How is the lady related to the person?",
      options: ["cousin", "sister", "sister-in-law", "nephew"],
      crctAnswer: "sister-in-law",
      userAnswer: null,
      visited: false,
    },
    {
      quesId: "2",
      question:
        "If 'A x D' means 'A is the sister of D', 'A + D' means 'D is the daughter of A' and 'A ÷ d' means 'A is the mother of D', then how will 'N is the aunt of M' be denoted?",
      options: ["M + L X N", "M ÷ L + N", "L X N ÷M", "N X L ÷ M"],
      crctAnswer: "N X L ÷ M",
      userAnswer: null,
      visited: false,
    },
    {
      quesId: "3",
      question: "Ronit's son Rohit, says to a girl, your father is the only brother of my mother who is the only child of Mr. Rakesh'. How is Rohit related to girl?",
      options: ["sister", "Cousin", "brother", "brother-in-law"],
      crctAnswer: "Cousin",
      userAnswer: null,
      visited: false,
    },
    {
      quesId: "4",
      question:
        "If 14th October 2005 is Friday then which day is 14th October 2009?",
      options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      crctAnswer: "Wednesday",
      userAnswer: null,
      visited: false,
    },
    {
      quesId: "5",
      question: "If today is Monday then which day of the week is after 59 days.",
      options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      crctAnswer: "Thursday",
      userAnswer: null,
      visited: false,
    },
    {
      quesId: "6",
      question:
        "If 14th October 2005 is Friday then which day is 14th October 2006?",
      options: ["Tuesday", "Saturday", "Thursday", "Friday"],
      crctAnswer: "Saturday",
      userAnswer: null,
      visited: false,
    },
    {
      quesId: "7",
      question:
        "If 6th March, 2005 is Sunday, what was the day of the week on 6th March, 2002?",
      options: ["Tuesday", "Saturday", "Thursday", "None of these"],
      crctAnswer: "None of these",
      userAnswer: null,
      visited: false,
    },
  ];
  
  let questionCont = document.querySelector("#actual-question");
  let optionCont = document.querySelector("#actual-option");
  let btnCont = document.querySelector("#actual-btn");
  let footer = document.querySelector("footer");
  let previousBtn = footer.querySelectorAll("button")[0];
  let nextBtn = footer.querySelectorAll("button")[1];
  let saveBtn = footer.querySelectorAll("button")[2];
  let submitBtn = footer.querySelectorAll("button")[3];
  let index = 0;

  //creating button based on total questions
  function createBtn() {
    storage.forEach((e) => {
      let btn = document.createElement("button");
      btn.id = e.quesId;
      btn.innerHTML = e.quesId;
      btnCont.append(btn);
    });
  }
  createBtn();
  
  function display() {
    questionCont.innerHTML = storage[index].question;
    storage[index].visited=true;
    optionCont.innerHTML = "";
    storage[index].options.map((e) => {
      let opt = document.createElement("input");
      opt.type = "radio";
      opt.value = e;
      opt.name = "option"; // to save only value option = option other wise it will move from one to another checked
      let label = document.createElement("label");
      label.innerHTML = e;
      if (storage[index].userAnswer == opt.value) {
        opt.checked = true;
      }
  
      optionCont.append(opt, label);
    });
    
  }
  display();
  
  nextBtn.addEventListener("click", () => {
    saveAns();
    notSaved();
    index = (index + 1) % storage.length;
    display();
    legends();
  });
  
  previousBtn.addEventListener("click", () => {
    saveAns();
    notSaved();
    index = (index - 1 + storage.length) % storage.length;
  
    display();
    legends();
  });
  saveBtn.addEventListener("click", () => {
    saveAns();
    index = (index + 1) % storage.length;
    display();
    legends();
  });
  
  let allBtn = btnCont.querySelectorAll("button");
  console.log(allBtn);
  
  function individualBtn() {
    saveAns();
    notSaved();
    allBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        index = btn.id - 1;
        display();
        legends();
      });
    });
  }
  individualBtn();
  
  function saveAns() {
    let opt = document.querySelectorAll("input");
    console.log(opt);
    opt.forEach((individualOpt) => {
      if (individualOpt.checked) {
        storage[index].userAnswer = individualOpt.value;
        allBtn.forEach((btn) => {
          if (btn.id - 1 == index) {
            btn.style.backgroundColor = "green";
          }
        });
        console.log(individualOpt.value);
      }
    });
  }
  
  function notSaved() {
    storage[index].visited = true;
    if (!storage[index].userAnswer) {
      allBtn.forEach((btn) => {
        if (btn.id - 1 == index) {
          btn.style.backgroundColor = "yellow";
        }
      });
    }
  }

  function legends()
  {
    let legendCont= document.querySelector("#legends");
    let answer= legendCont.querySelectorAll("span")[0];
    let notAnswer= legendCont.querySelectorAll("span")[1]
    let marked= legendCont.querySelectorAll("span")[2]
    let notVisited=legendCont.querySelectorAll("span")[3]
    let answerCount=0;
    let notAnswerCount=storage.length;
    let markedCount=0;
    let notVisitedCount=storage.length;

    storage.map((e)=>{
      if(e.userAnswer)
      {
        answerCount++;
        notAnswerCount--;
      }
      if(e.visited)
      {
        notVisitedCount--;
      }
      if(e.visited && !e.userAnswer)
      {
        markedCount++;

      }

    });
    answer.innerHTML=answerCount;
    notAnswer.innerHTML=notAnswerCount;
    marked.innerHTML=markedCount;
    notVisited.innerHTML=notAnswerCount;

  }
  legends();

  function timer()
  {
    let header= document.querySelector("header");
    let hr=header.querySelectorAll("span")[0];
    let min=header.querySelectorAll("span")[1];
    let sec=header.querySelectorAll("span")[2];

    //this logic will work only for small duration 
    //suppose if declare 2 hr then minites will be like 119
    let duration=2*60 *60;
    setInterval(()=>{
    duration--;
    hr.innerHTML=`${Math.floor(duration/3600)}`;
    min.innerHTML=`${Math.floor((duration%3600)/60)}`;
    sec.innerHTML=`${(duration % 3600)%60}`
      

    },1000)

  }
  timer();
  submitBtn.addEventListener("click", () => {
    let conf = confirm("Are you sure want to submit ?");
    if (conf) {
      quizuser.quiz = storage;
      localStorage.setItem("quizuser", JSON.stringify(quizuser));
      details = details.filter((e) => {
        if (e.phone != quizuser.phone) {
          return e;
        }
      });

      details.push(quizuser);

      localStorage.setItem("details", JSON.stringify(details));

      window.location.href = "./result.html";
    }
  });
