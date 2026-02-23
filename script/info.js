// all application data stored in here
let allJobs = [
  {
    name: "Mobile First Corp",
    status: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    notApplied: "NOT APPLIED",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
  },
  {
    name: "WebFlow Agency",
    status: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    notApplied: "NOT APPLIED",
    description:
      "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
  },
  {
    name: "DataViz Solutions",
    status: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    notApplied: "NOT APPLIED",
    description:
      "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
  },
  {
    name: "CloudFirst Inc",
    status: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    notApplied: "NOT APPLIED",
    description:
      "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
  },
  {
    name: "Innovation Labs",
    status: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    notApplied: "NOT APPLIED",
    description:
      "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
  },
  {
    name: "MegaCorp Solutions",
    status: "JavaScript Developer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    notApplied: "NOT APPLIED",
    description:
      "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
  },
  {
    name: "StartupXYZ",
    status: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    notApplied: "NOT APPLIED",
    description:
      "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
  },
  {
    name: "TechCorp Industries",
    status: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    notApplied: "NOT APPLIED",
    description:
      "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
  },
];
renderAllJobs();
let interview = [];
let rejected = [];
let currentTabId = "info-toggle";
let mainContainer = document.querySelector("main");

// refresh the tab when clicking the interview and rejected button to show all update details
function refreshPage() {
  if (currentTabId === "interview-toggle") {
    renderInterview();
    showSelectedSectionForInterview();
    updateInterViewCount();
  } else if (currentTabId === "rejected-toggle") {
    renderRejected();
    showSelectedSectionForRejected();
    updateRejectedCount();
  } else if (currentTabId === "info-toggle") {
    document.getElementById("allCardSection").classList.remove("hidden");
    document.getElementById("interviewAllCardSection").classList.add("hidden");
    document.getElementById("interviewNoJobs").classList.add("hidden");
    document.getElementById("rejectedCardSection").classList.add("hidden");
    document.getElementById("rejectedNoJobs").classList.add("hidden");
    noJobAvailableSectionForInfo();
  }
}

// toggling the button
mainContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("interview-button")) {
    let parent = event.target.parentNode.parentNode.parentNode;

    // get the data
    let name = parent.querySelector(".application-name").innerText;
    let status = parent.querySelector(".application-status").innerText;
    let location = parent.querySelector(".location").innerText;
    let type = parent.querySelector(".type").innerText;
    let salary = parent.querySelector(".salary").innerText;
    let description = parent.querySelector(
      ".application-description",
    ).innerText;

    // toggling the color when selected
    allJobs = allJobs.map((job) =>
      job.name === name ? { ...job, notApplied: "INTERVIEW" } : job,
    );

    // pushing the data to an array
    let applicationInfo = {
      name,
      status,
      location,
      type,
      salary,
      description,
      notApplied: "INTERVIEW",
    };
    // checking the existing item
    let exists = interview.find((item) => item.name == applicationInfo.name);
    if (!exists) {
      interview.push(applicationInfo);
      setTotalInterviewRejectedCount();
    }
    // reassigning the rejected array when updating the interview array
    rejected = rejected.filter((item) => item.name != applicationInfo.name);
    // rendering and updating the count to show
    renderAllJobs();
    renderInterview();
    renderRejected();
    setTotalInterviewRejectedCount();
    refreshPage();
    return;
  } else if (event.target.classList.contains("rejected-btn")) {
    // get the data
    let parent = event.target.parentNode.parentNode.parentNode;
    let name = parent.querySelector(".application-name").innerText;
    let status = parent.querySelector(".application-status").innerText;
    let location = parent.querySelector(".location").innerText;
    let type = parent.querySelector(".type").innerText;
    let salary = parent.querySelector(".salary").innerText;
    let description = parent.querySelector(
      ".application-description",
    ).innerText;

    // matching the data to give set not applied value
    allJobs = allJobs.map((job) =>
      job.name === name ? { ...job, notApplied: "REJECTED" } : job,
    );

    // stored the data to an array
    let applicationInfo = {
      name,
      status,
      location,
      type,
      salary,
      description,
      notApplied: "REJECTED",
    };
    // checking the existing data to push
    let exists = rejected.find((item) => item.name == applicationInfo.name);

    if (!exists) {
      rejected.push(applicationInfo);
      setTotalInterviewRejectedCount();
    }
    // updating the interview data when clicking rejected button
    interview = interview.filter((item) => item.name != applicationInfo.name);

    // updating and re rendering the data to get current count
    renderAllJobs();
    renderRejected();
    renderInterview();
    setTotalInterviewRejectedCount();
    refreshPage();
    return;
  }
  // finding the item to delete
  if (currentTabId === "interview-toggle") {
    if (
      event.target.classList.contains("fa-regular") ||
      event.target.classList.contains("application-delete")
    ) {
      let parent = event.target.parentNode.parentNode.parentNode;
      let name = parent.querySelector(".application-name").innerText;
      interview = interview.filter((item) => item.name != name);

      // removing the green border from all jobs section when clicking delete
      allJobs = allJobs.map((item) =>
        item.name === name ? { ...item, notApplied: "NOT APPLIED" } : item,
      );
      renderAllJobs();
      renderInterview();
      setTotalInterviewRejectedCount();
      updateInterViewCount();
      updateRejectedCount();
      refreshPage();
      return;
    }
  } else if (currentTabId === "rejected-toggle") {
    if (
      event.target.classList.contains("fa-regular") ||
      event.target.classList.contains("application-delete")
    ) {
      let parent = event.target.parentNode.parentNode.parentNode;
      let name = parent.querySelector(".application-name").innerText;

      // removing the red border from all jobs section when clicking delete
      allJobs = allJobs.map((item) =>
        item.name === name ? { ...item, notApplied: "NOT APPLIED" } : item,
      );

      // reassigning the array when deleting card from info section
      rejected = rejected.filter((item) => item.name != name);
      interview = interview.filter((item) => item.name != name);
      renderAllJobs();
      setTotalInterviewRejectedCount();
      renderRejected();
      updateInterViewCount();
      updateRejectedCount();
      refreshPage();
      return;
    }
  } else if (currentTabId === "info-toggle") {
    if (
      event.target.classList.contains("fa-regular") ||
      event.target.classList.contains("application-delete")
    ) {
      let parent = event.target.parentNode.parentNode.parentNode;
      let name = parent.querySelector(".application-name").innerText;
      // reassigning the array when deleting card from info section
      interview = interview.filter((item) => item.name != name);
      rejected = rejected.filter((item) => item.name != name);
      allJobs = allJobs.filter((item) => item.name != name);

      setTotalInterviewRejectedCount();
      noJobAvailableSectionForInfo();
      updateAvailableJobCount();
      renderAllJobs();
      return;
    }
  }
});

// stored the data
let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let allCardSection = document.getElementById("allCardSection");

// set the count of total, job, and total-application
setTotalInterviewRejectedCount();
function setTotalInterviewRejectedCount() {
  totalCount.innerText = allJobs.length;
  interviewCount.innerText = interview.length;
  rejectedCount.innerText = rejected.length;
}

// stored the data in variable
// Info / interview / rejected buttons
let infoButton = document.getElementById("info-toggle");
let interviewButton = document.getElementById("interview-toggle");
let rejectedButton = document.getElementById("rejected-toggle");

// below 2 function taking decision to show or hidden data
function showSelectedSectionForInterview() {
  if (interview.length == 0) {
    // hide rejectCard and allCard section
    document.getElementById("rejectedCardSection").classList.add("hidden");
    document.getElementById("allCardSection").classList.add("hidden");
    document.getElementById("rejectedNoJobs").classList.add("hidden");
    document.getElementById("infoNoJobs").classList.add("hidden");
    document.getElementById("interviewAllCardSection").classList.add("hidden");
    // show interviewNoJobs
    document.getElementById("interviewNoJobs").classList.remove("hidden");
  } else {
    document.getElementById("allCardSection").classList.add("hidden");
    document.getElementById("interviewNoJobs").classList.add("hidden");
    document.getElementById("rejectedCardSection").classList.add("hidden");
    document.getElementById("rejectedNoJobs").classList.add("hidden");
    document
      .getElementById("interviewAllCardSection")
      .classList.remove("hidden");
  }
}
function showSelectedSectionForRejected() {
  if (rejected.length == 0) {
    document.getElementById("rejectedCardSection").classList.add("hidden");
    document.getElementById("rejectedNoJobs").classList.remove("hidden");

    // info and interview hide
    document.getElementById("allCardSection").classList.add("hidden");
    document.getElementById("interviewAllCardSection").classList.add("hidden");
    document.getElementById("infoNoJobs").classList.add("hidden");

    // interview no jobs hide
    document.getElementById("interviewNoJobs").classList.add("hidden");
  } else {
    // all card section from main section
    document.getElementById("allCardSection").classList.add("hidden");

    //interviewCard section
    document.getElementById("interviewAllCardSection").classList.add("hidden");

    // interviewNoJobs
    document.getElementById("interviewNoJobs").classList.add("hidden");

    // rejected all card section
    document.getElementById("rejectedCardSection").classList.remove("hidden");
    document.getElementById("rejectedNoJobs").classList.add("hidden");

    // infoNoJobs section
    document.getElementById("infoNoJobs").classList.add("hidden");
  }
}

// this toggle update the current tab
function toggleButton(id) {
  currentTabId = id;
  // adding white bg on all button
  infoButton.classList.add("text-gray-500", "bg-white");
  interviewButton.classList.add("text-gray-500", "bg-white");
  rejectedButton.classList.add("text-gray-500", "bg-white");

  //   removing all blue bg
  infoButton.classList.remove("text-white", "bg-[#3B82F6]");
  interviewButton.classList.remove("text-white", "bg-[#3B82F6]");
  rejectedButton.classList.remove("text-white", "bg-[#3B82F6]");

  let selected = document.getElementById(id);
  selected.classList.remove("text-gray-500", "bg-white");
  selected.classList.add("text-white", "bg-[#3B82F6]");

  toggleButtonCondition(id);
  function toggleButtonCondition(id) {
    if (id === "interview-toggle") {
      setTotalInterviewRejectedCount();
      renderInterview();
      showSelectedSectionForInterview();
      updateInterViewCount();
      noJobAvailableSectionForInfo();
    } else if (id === "rejected-toggle") {
      setTotalInterviewRejectedCount();
      renderRejected();
      showSelectedSectionForRejected();
      updateRejectedCount();
      noJobAvailableSectionForInfo();
    } else if (id === "info-toggle") {
      let makeHideAllCardSection = document.getElementById("allCardSection");
      makeHideAllCardSection.classList.remove("hidden");
      let makeHideInterviewSection = document.getElementById("interviewNoJobs");
      makeHideInterviewSection.classList.add("hidden");
      let showRejectionSection = document.getElementById("rejectedCardSection");
      showRejectionSection.classList.add("hidden");

      // all card section from interview section
      let allCardFromInterviewSection = document.getElementById(
        "interviewAllCardSection",
      );
      allCardFromInterviewSection.classList.add("hidden");
      updateAvailableJobCount();
      noJobAvailableSectionForInfo();
    }
  }
}

// render all jobs html
function renderAllJobs() {
  let html = "";
  allJobs.forEach((item) => {
    // checking the status value , if value interview make border green ,
    // if value rejected show the red border
    const leftBorder =
      item.notApplied === "INTERVIEW"
        ? "border-4 border-l-green-600"
        : item.notApplied === "REJECTED"
          ? "border-4 border-l-red-600"
          : "";
    // changing style based on the interview and rejected
    const statusStyle =
      item.notApplied === "INTERVIEW"
        ? "bg-green-600 text-white rounded-lg"
        : item.notApplied === "REJECTED"
          ? "bg-red-600 text-white rounded-lg"
          : "";
    html += `
    <div class="application-section w-full p-6 shadow border rounded-xl border-gray-100 transition-transform  duration-300 ease-out hover:translate-y-1 hover:shadow-lg ${leftBorder}">
          <div class="card-name-status flex justify-between items-center">
            <div>
              <h2 class="application-name font-semibold text-[18px] mb-0">
                ${item.name}
              </h2>
              <p
                class="application-status font-normal text-[16px] text-gray-500"
              >
                ${item.status}
              </p>
            </div>
            <div class="delete-button">
              <button
                class="application-delete btn btn-error w-8 h-8 rounded-full border flex items-center justify-center"
              >
                <i class="fa-regular fa-trash-can w-4 h-4"></i>
              </button>
            </div>
          </div>
          <div class="card-description">
            <p
              class="font-normal text-[16px] text-gray-500 my-5"
            >
              <span class="location">${item.location}</span> • <span class="type">${item.type}</span> • <span class="salary">${item.salary}</span>  
            </p>
            <p class="current-status bg-[#EEF4FF] rounded-lg py-2 px-3 font-medium text-[12px] inline ${statusStyle}"
            >
             ${item.notApplied}
            </p>
            <p
              class="application-description font-normal text-[16px] text-gray-600 mb-5 mt-3"
            >
             ${item.description}
            </p>
            <div class="flex gap-2">
              <button class="interview-button btn btn-outline btn-accent"
              >
                INTERVIEW
              </button>
              <button class="rejected-btn btn btn-outline btn-error"
              >
                REJECTED
              </button>
            </div>
          </div>
        </div>
    `;
  });
  document.getElementById("allCardSection").innerHTML = html;
}
// render the interview html
function renderInterview() {
  let html = "";
  interview.forEach((item) => {
    html += `
    <div class="card w-full p-6 shadow border border-gray-100 border-2 border-green-600 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-green-50">
          <div class="card-name-status flex justify-between items-center">
            <div>
              <h2 class="application-name font-semibold text-[18px] mb-0">
                ${item.name}
              </h2>
              <p
                class="application-status font-normal text-[16px] text-gray-500"
              >
                ${item.status}
              </p>
            </div>

            <div class="delete-button">
              <button
                class="application-delete btn btn-error w-8 h-8 rounded-full border flex items-center justify-center"
              >
                <i class="fa-regular fa-trash-can w-4 h-4"></i>
              </button>
            </div>
          </div>
          <div class="card-description">
            <p
              class="font-normal text-[16px] text-gray-500 my-5"
            >
              <span class="location">${item.location}</span> • <span class="type">${item.type}</span> • <span class="salary">${item.salary}</span> 
            </p>
            <p
              class="application-not-applied py-1 px-2 font-bold text-[12px] inline rounded text-green-600 bg-green-600/30 border-2 border-green-500 cursor-pointer"
            >
              ${item.notApplied}
            </p>
            <p
              class="application-description font-normal text-[16px] text-gray-600 mb-5 mt-3"
            >
              ${item.description}
            </p>
            <div class="flex gap-2">
              <button class="interview-button btn btn-outline btn-accent">
                INTERVIEW
              </button>
              <button  class="rejected-btn btn btn-outline btn-error">
                REJECTED
              </button>
            </div>
          </div>
        </div>
    `;
  });
  document.getElementById("interviewAllCardSection").innerHTML = html;
}
// render rejected html
function renderRejected() {
  let html = "";
  rejected.forEach((item) => {
    html += `
    <div class="card w-full p-6 shadow border border-gray-100 border-2 border-red-600 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-red-50">
          <div class="card-name-status flex justify-between items-center">
            <div>
              <h2 class="application-name font-semibold text-[18px] mb-0">
                ${item.name}
              </h2>
              <p
                class="application-status font-normal text-[16px] text-gray-500"
              >
                ${item.status}
              </p>
            </div>

            <div class="delete-button">
              <button
                class="application-delete btn btn-error w-8 h-8 rounded-full border flex items-center justify-center"
              >
                <i class="fa-regular fa-trash-can w-4 h-4"></i>
              </button>
            </div>
          </div>
          <div class="card-description">
            <p
              class="font-normal text-[16px] text-gray-500 my-5"
            >
              <span class="location">${item.location}</span> • <span class="type">${item.type}</span> • <span class="salary">${item.salary}</span> 
            </p>
            <p
              class="application-not-applied py-1 px-2 font-bold text-[12px] inline rounded text-red-600 bg-red-600/30 border-2 border-red-600 cursor-pointer"
            >
              ${item.notApplied} 
            </p>
            <p
              class="application-description font-normal text-[16px] text-gray-600 mb-5 mt-3"
            >
              ${item.description}
            </p>
            <div class="flex gap-2">
              <button class="interview-button btn btn-outline btn-accent">
                INTERVIEW
              </button>
              <button class="rejected-btn btn btn-outline btn-error ">
                REJECTED
              </button>
            </div>
          </div>
        </div>
    `;
  });
  document.getElementById("rejectedCardSection").innerHTML = html;
}

// update the count of the interview count
function updateInterViewCount() {
  if (interview.length === 0) {
    document.getElementById("active-jobs").innerText =
      `${interview.length} jobs`;
  } else {
    document.getElementById("active-jobs").innerText =
      `${interview.length} of ${allJobs.length} jobs`;
  }
}
// update the count of rejected count
function updateRejectedCount() {
  if (rejected.length === 0) {
    document.getElementById("active-jobs").innerText =
      `${rejected.length} jobs`;
  } else {
    document.getElementById("active-jobs").innerText =
      `${rejected.length} of ${allJobs.length} jobs`;
  }
}
// update the count of total count
function updateAvailableJobCount() {
  document.getElementById("active-jobs").innerText = `${allJobs.length} jobs`;
}
updateAvailableJobCount();

// if the total jobs length  is 0 show this (no jobs available section0
function noJobAvailableSectionForInfo() {
  if (currentTabId === "info-toggle") {
    if (allJobs.length === 0) {
      document.getElementById("infoNoJobs").classList.remove("hidden");
      document.getElementById("rejectedNoJobs").classList.add("hidden");
      document.getElementById("interviewNoJobs").classList.add("hidden");
    } else {
      document.getElementById("infoNoJobs").classList.add("hidden");
      document.getElementById("rejectedNoJobs").classList.add("hidden");
      document.getElementById("interviewNoJobs").classList.add("hidden");
    }
  } else {
    document.getElementById("infoNoJobs").classList.add("hidden");
  }
}
