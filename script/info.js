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
      updateAvailableJobCount();
    }
  }
});
// refresh the tab when clicking the interview and rejected button to all update details
function refreshPage() {
  if (currentTabId === "interview-toggle") {
    renderInterview();
    showSelectedSectionForInterview();
  } else if (currentTabId === "rejected-toggle") {
    renderRejected();
    showSelectedSectionForRejected();
  } else if (currentTabId === "info-toggle") {
    let makeHideAllCardSection = document.getElementById("allCardSection");
    makeHideAllCardSection.classList.remove("hidden");
    let makeHideInterviewSection = document.getElementById(
      "noJobsAvailAble-section",
    );
    makeHideInterviewSection.classList.add("hidden");
    let showRejectionSection = document.getElementById("rejectedCardSection");
    showRejectionSection.classList.add("hidden");
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
      console.log(rejected);
      renderRejected();
      setTotalInterviewRejectedCount();
    }

    interview = interview.filter((item) => item.name != applicationInfo.name);
    renderInterview();
    renderRejected();
    setTotalInterviewRejectedCount();
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
  totalCount.innerText = allCardSection.children.length;
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
      setTotalInterviewRejectedCount();
      let makeHideAllCardSection = document.getElementById("allCardSection");
      makeHideAllCardSection.classList.remove("hidden");
      let makeHideInterviewSection = document.getElementById(
        "noJobsAvailAble-section",
      );
      makeHideInterviewSection.classList.add("hidden");
      let showRejectionSection = document.getElementById("rejectedCardSection");
      showRejectionSection.classList.add("hidden");
      updateAvailableJobCount();
    }
  }
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
function updateInterViewCount() {
  document.getElementById("active-jobs").innerText =
    `${interview.length} of ${allCardSection.children.length}`;
}
function updateRejectedCount() {
  document.getElementById("active-jobs").innerText =
    `${rejected.length} of ${allCardSection.children.length}`;
}
function updateAvailableJobCount() {
  document.getElementById("active-jobs").innerText =
    `${allCardSection.children.length} Jobs`;
}
