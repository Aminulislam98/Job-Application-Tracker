// all application data stored in here
let allJobs = [
  {
    name: "Mobile First Corp",
    status: "React Native Developer",
    salary: "Remote • Full-time • $130,000 - $175,000",
    notApplied: "Not applied",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
  },
  {
    name: "WebFlow Agency",
    status: "Web Designer & Developer",
    salary: "Los Angeles, CA• Part-time •$80,000 - $120,000",
    notApplied: "Not applied",
    description:
      "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
  },
  {
    name: "DataViz Solutions",
    status: "Data Visualization Specialist",
    salary: "Boston, MA •Full-time•$125,000 - $165,000",
    notApplied: "Not applied",
    description:
      "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
  },
  {
    name: "CloudFirst Inc",
    status: "Backend Developer",
    salary: "Seattle, WA•Full-tim •$140,000 - $190,000",
    notApplied: "Not applied",
    description:
      "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
  },
  {
    name: "Innovation Labs",
    status: "UI/UX Engineer",
    salary: "Austin, TX • Full-time • $110,000 - $150,000",
    notApplied: "Not applied",
    description:
      "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
  },
  {
    name: "MegaCorp Solutions",
    status: "JavaScript Developer",
    salary: "New York, NY • Full-time • $130,000 - $170,00",
    notApplied: "Not applied",
    description:
      "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
  },
  {
    name: "StartupXYZ",
    status: "Full Stack Engineer",
    salary: "Remote • Full-time • $120,000 - $160,000",
    notApplied: "Not applied",
    description:
      "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
  },
  {
    name: "TechCorp Industries",
    status: "Senior Frontend Developer",
    salary: "San Francisco, CA • Full-time • $130,000 - $175,000",
    notApplied: "Not applied",
    description:
      "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
  },
];
renderAllJobs();
let interview = [];
let rejected = [];
let currentTabId = "info-toggle";
let mainContainer = document.querySelector("main");

// process to delete the card from section
mainContainer.addEventListener("click", (event) => {
  if (currentTabId === "interview-toggle") {
    if (
      event.target.classList.contains("fa-regular") ||
      event.target.classList.contains("application-delete")
    ) {
      let parent = event.target.parentNode.parentNode.parentNode;
      let name = parent.querySelector(".application-name").innerText;
      interview = interview.filter((item) => item.name != name);
      setTotalInterviewRejectedCount();
      refreshPage();
      updateInterViewCount();
      updateRejectedCount();
    }
  } else if (currentTabId === "rejected-toggle") {
    if (
      event.target.classList.contains("fa-regular") ||
      event.target.classList.contains("application-delete")
    ) {
      let parent = event.target.parentNode.parentNode.parentNode;
      let name = parent.querySelector(".application-name").innerText;
      rejected = rejected.filter((item) => item.name != name);
      setTotalInterviewRejectedCount();
      refreshPage();
    }
  } else if (currentTabId === "info-toggle") {
    if (
      event.target.classList.contains("fa-regular") ||
      event.target.classList.contains("application-delete")
    ) {
      let parent = event.target.parentNode.parentNode.parentNode;
      let name = parent.querySelector(".application-name").innerText;
      allJobs = allJobs.filter((item) => item.name != name);
      setTotalInterviewRejectedCount();
      refreshPage();
    }
  }
});
// refresh the tab when clicking the interview and rejected button to all update details
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
    let makeHideAllCardSection = document.getElementById("allCardSection");
    makeHideAllCardSection.classList.remove("hidden");

    let makeHideInterviewSection = document.getElementById(
      "noJobsAvailAble-section",
    );
    makeHideInterviewSection.classList.add("hidden");

    let showRejectionSection = document.getElementById("rejectedCardSection");
    showRejectionSection.classList.add("hidden");
    renderAllJobs();
    updateAvailableJobCount();
  }
}

mainContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("interview-button")) {
    let parent = event.target.parentNode.parentNode.parentNode;
    let name = parent.querySelector(".application-name").innerText;
    let status = parent.querySelector(".application-status").innerText;
    let salary = parent.querySelector(".application-salary").innerText;
    let notApplied = parent.querySelector(".application-not-applied").innerText;
    let description = parent.querySelector(
      ".application-description",
    ).innerText;

    let applicationInfo = {
      name,
      status,
      salary,
      notApplied,
      description,
    };

    let exists = interview.find((item) => item.name == applicationInfo.name);

    if (!exists) {
      interview.push(applicationInfo);
      setTotalInterviewRejectedCount();
    }
    rejected = rejected.filter((item) => item.name != applicationInfo.name);
    renderInterview();
    renderRejected();
    setTotalInterviewRejectedCount();
    updateInterViewCount();
    refreshPage();
  } else if (event.target.classList.contains("rejected-btn")) {
    let parent = event.target.parentNode.parentNode.parentNode;
    let name = parent.querySelector(".application-name").innerText;
    let status = parent.querySelector(".application-status").innerText;
    let salary = parent.querySelector(".application-salary").innerText;
    let notApplied = parent.querySelector(".application-not-applied").innerText;
    let description = parent.querySelector(
      ".application-description",
    ).innerText;

    parent.querySelector(".application-not-applied").innerText = "REJECTED";

    let applicationInfo = {
      name,
      status,
      salary,
      notApplied,
      description,
    };

    let exists = rejected.find((item) => item.name == applicationInfo.name);

    if (!exists) {
      rejected.push(applicationInfo);
      setTotalInterviewRejectedCount();
    }

    interview = interview.filter((item) => item.name != applicationInfo.name);
    renderRejected();
    renderInterview();
    setTotalInterviewRejectedCount();
    updateRejectedCount();
    refreshPage();
  }
});

let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let allCardSection = document.getElementById("allCardSection");

// get the total, job and application count history
setTotalInterviewRejectedCount();
function setTotalInterviewRejectedCount() {
  totalCount.innerText = allJobs.length;
  interviewCount.innerText = interview.length;
  rejectedCount.innerText = rejected.length;
}

// Info / interview / rejected buttons
let infoButton = document.getElementById("info-toggle");
let interviewButton = document.getElementById("interview-toggle");
let rejectedButton = document.getElementById("rejected-toggle");

// this showSelectedSectionForInterview and showSelectedSectionForRejected function take decision which section to hidden or show on page

function showSelectedSectionForInterview() {
  setTotalInterviewRejectedCount();
  if (interview.length == 0) {
    // if interview section contains any property then show it otherwise show the Not job available.

    let showInterviewNoCard = document.getElementById(
      "noJobsAvailAble-section",
    );
    showInterviewNoCard.classList.remove("hidden");

    // rejected all card section
    let rejectedCardSection = document.getElementById("rejectedCardSection");
    rejectedCardSection.classList.add("hidden");

    // all card section from main section
    let makeHideAllCardSection = document.getElementById("allCardSection");
    makeHideAllCardSection.classList.add("hidden");
  } else {
    // all card section from main section
    let makeHideAllCardSection = document.getElementById("allCardSection");
    makeHideAllCardSection.classList.add("hidden");

    // No jobs available section
    let noJobAvailableSection = document.getElementById(
      "noJobsAvailAble-section",
    );
    noJobAvailableSection.classList.add("hidden");

    // rejected all card section
    let rejectedCardSection = document.getElementById("rejectedCardSection");
    rejectedCardSection.classList.add("hidden");

    // all card section from interview section
    let allCardFromInterviewSection = document.getElementById(
      "interviewAllCardSection",
    );
    allCardFromInterviewSection.classList.remove("hidden");
  }
}
function showSelectedSectionForRejected() {
  setTotalInterviewRejectedCount();
  if (rejected.length == 0) {
    // all card section from interview section
    let allCardFromInterviewSection = document.getElementById(
      "interviewAllCardSection",
    );
    allCardFromInterviewSection.classList.add("hidden");

    // show No Jobs available section
    let noJobAvailableSection = document.getElementById(
      "noJobsAvailAble-section",
    );
    noJobAvailableSection.classList.remove("hidden");

    // all card section from main section
    let makeHideAllCardSection = document.getElementById("allCardSection");
    makeHideAllCardSection.classList.add("hidden");
  } else {
    // all card section from main section
    let makeHideAllCardSection = document.getElementById("allCardSection");
    makeHideAllCardSection.classList.add("hidden");

    // all card from interviewSection
    let interviewAllCardSection = document.getElementById(
      "interviewAllCardSection",
    );
    interviewAllCardSection.classList.add("hidden");

    // No jobs available section
    let noJobAvailableSection = document.getElementById(
      "noJobsAvailAble-section",
    );
    noJobAvailableSection.classList.add("hidden");

    // rejected all card section
    let rejectedCardSection = document.getElementById("rejectedCardSection");
    rejectedCardSection.classList.remove("hidden");

    let noJobsRejectedSection = document.getElementById(
      "rejected-noJobsSection",
    );
    noJobsRejectedSection.classList.add("hidden");
  }
}

// toggle select which section to show on page keep update data
function toggleButton(id) {
  currentTabId = id;
  // adding white bg on all button
  infoButton.classList.add("text-white", "bg-white");
  interviewButton.classList.add("text-white", "bg-white");
  rejectedButton.classList.add("text-white", "bg-white");

  //   removing all blue bg
  infoButton.classList.remove("text-white", "bg-[#3B82F6]");
  interviewButton.classList.remove("text-white", "bg-[#3B82F6]");
  rejectedButton.classList.remove("text-white", "bg-[#3B82F6]");

  let selected = document.getElementById(id);
  selected.classList.remove("text-white", "bg-white");
  selected.classList.add("text-white", "bg-[#3B82F6]");

  toggleButtonCondition(id);
  function toggleButtonCondition(id) {
    if (id === "interview-toggle") {
      setTotalInterviewRejectedCount();
      renderInterview();
      showSelectedSectionForInterview();
      updateInterViewCount();
    } else if (id === "rejected-toggle") {
      setTotalInterviewRejectedCount();
      renderRejected();
      showSelectedSectionForRejected();
      updateRejectedCount();
    } else if (id === "info-toggle") {
      let makeHideAllCardSection = document.getElementById("allCardSection");
      makeHideAllCardSection.classList.remove("hidden");
      let makeHideInterviewSection = document.getElementById(
        "noJobsAvailAble-section",
      );
      makeHideInterviewSection.classList.add("hidden");
      let showRejectionSection = document.getElementById("rejectedCardSection");
      showRejectionSection.classList.add("hidden");

      // all card section from interview section
      let allCardFromInterviewSection = document.getElementById(
        "interviewAllCardSection",
      );
      allCardFromInterviewSection.classList.add("hidden");
      renderAllJobs();
      updateAvailableJobCount();
    }
  }
}

// render all jobs section
function renderAllJobs() {
  let html = "";
  allJobs.forEach((item) => {
    html += `
    <div class="card w-full p-6 shadow border border-gray-100">
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
              class="application-salary font-normal text-[16px] text-gray-500 my-5"
            >
              ${item.salary}
            </p>
            <p
              class="application-not-applied bg-[#EEF4FF] py-2 px-3 font-medium text-[14px] inline"
            >
             ${item.notApplied}
            </p>
            <p
              class="application-description font-normal text-[16px] text-gray-600 mb-5 mt-3"
            >
             ${item.description}
            </p>
            <div class="flex gap-2">
              <button
                id="interview-btn"
                class="interview-button btn btn-outline btn-accent"
              >
                INTERVIEW
              </button>
              <button
                id="rejected-btn"
                class="rejected-btn btn btn-outline btn-error"
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

// render interview all card
function renderInterview() {
  let html = "";
  interview.forEach((item) => {
    html += `
    <div class="card w-full p-6 shadow border border-gray-100">
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
              class="application-salary font-normal text-[16px] text-gray-500 my-5"
            >
              ${item.salary}
            </p>
            <p
              class="application-not-applied bg-[#EEF4FF] py-2 px-3 font-medium text-[14px] inline rounded bg-green-600 text-white"
            >
              ${(item.notApplied = "INTERVIEW")}
            </p>
            <p
              class="application-description font-normal text-[16px] text-gray-600 mb-5 mt-3"
            >
              ${item.description}
            </p>
            <div class="flex gap-2">
              <button id="interview-btn" class="interview-button btn btn-success bg-green-600 text-white shadow-sm border border-green-600">
                INTERVIEW
              </button>
              <button id="rejected-btn" class="rejected-btn btn btn-outline btn-error">
                REJECTED
              </button>
            </div>
          </div>
        </div>
    `;
  });
  document.getElementById("interviewAllCardSection").innerHTML = html;
}

// render rejected all card
function renderRejected() {
  let html = "";
  rejected.forEach((item) => {
    html += `
    <div class="card w-full p-6 shadow border border-gray-100">
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
              class="application-salary font-normal text-[16px] text-gray-500 my-5"
            >
              ${item.salary}
            </p>
            <p
              class="application-not-applied bg-[#EEF4FF] py-2 px-3 font-medium text-[14px] inline rounded text-white bg-red-600"
            >
              ${(item.notApplied = "REJECTED")}
            </p>
            <p
              class="application-description font-normal text-[16px] text-gray-600 mb-5 mt-3"
            >
              ${item.description}
            </p>
            <div class="flex gap-2">
              <button id="interview-btn" class="interview-button btn btn-outline btn-accent">
                INTERVIEW
              </button>
              <button id="rejected-btn" class="rejected-btn btn btn-outline btn-error bg-red-600 text-white">
                REJECTED
              </button>
            </div>
          </div>
        </div>
    `;
  });
  document.getElementById("rejectedCardSection").innerHTML = html;
}

// update the count of the application number
function updateInterViewCount() {
  document.getElementById("active-jobs").innerText =
    `${interview.length} of ${allJobs.length}`;
}
function updateRejectedCount() {
  document.getElementById("active-jobs").innerText =
    `${rejected.length} of ${allJobs.length}`;
}
function updateAvailableJobCount() {
  document.getElementById("active-jobs").innerText = `${allJobs.length} Jobs`;
}
updateAvailableJobCount();
