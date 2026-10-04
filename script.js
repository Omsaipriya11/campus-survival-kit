// ==========================================
// CAMPUS SURVIVAL KIT
// ==========================================

const CHECKLIST_KEY = "campusSurvivalChecklist";
const CONTACT_KEY = "campusSurvivalContacts";
const TIPS_KEY = "campusSurvivalTips";


// ==========================================
// CHECKLIST DATA
// ==========================================

const checklistItems = [

    {
        id: 1,
        name: "College ID Card",
        category: "academic",
        icon: "🪪"
    },

    {
        id: 2,
        name: "Notebook & Pens",
        category: "academic",
        icon: "📓"
    },

    {
        id: 3,
        name: "Important Documents",
        category: "academic",
        icon: "📄"
    },

    {
        id: 4,
        name: "Calculator",
        category: "academic",
        icon: "🧮"
    },

    {
        id: 5,
        name: "Laptop",
        category: "tech",
        icon: "💻"
    },

    {
        id: 6,
        name: "Laptop Charger",
        category: "tech",
        icon: "🔌"
    },

    {
        id: 7,
        name: "Phone Charger",
        category: "tech",
        icon: "📱"
    },

    {
        id: 8,
        name: "Power Bank",
        category: "tech",
        icon: "🔋"
    },

    {
        id: 9,
        name: "Headphones",
        category: "tech",
        icon: "🎧"
    },

    {
        id: 10,
        name: "Water Bottle",
        category: "daily",
        icon: "💧"
    },

    {
        id: 11,
        name: "Umbrella",
        category: "daily",
        icon: "☔"
    },

    {
        id: 12,
        name: "Hand Sanitizer",
        category: "daily",
        icon: "🧴"
    },

    {
        id: 13,
        name: "Small Snack",
        category: "daily",
        icon: "🍎"
    },

    {
        id: 14,
        name: "Basic First-Aid Items",
        category: "emergency",
        icon: "🩹"
    },

    {
        id: 15,
        name: "Emergency Contact Details",
        category: "emergency",
        icon: "📞"
    },

    {
        id: 16,
        name: "Flashlight",
        category: "emergency",
        icon: "🔦"
    }

];


// ==========================================
// SURVIVAL PLANS
// ==========================================

const survivalPlans = {

    exam: {

        icon: "📚",

        title: "Exam Tomorrow",

        description:
            "Don't try to study everything. Focus on high-value topics and prepare yourself for tomorrow.",

        steps: [
            "Collect your syllabus and previous question papers.",
            "Choose the 3–5 most important topics.",
            "Revise concepts instead of reading everything again.",
            "Practice important questions without looking at answers.",
            "Prepare your ID card, stationery and other essentials.",
            "Sleep properly instead of studying all night."
        ]

    },


    forgot: {

        icon: "😵",

        title: "Forgot Something",

        description:
            "Don't panic. Decide whether you actually need the item immediately.",

        steps: [
            "Check whether the item is available in your classroom or department.",
            "Ask a trusted classmate if you can temporarily borrow it.",
            "Check the campus store or library if available.",
            "Use a temporary alternative if the task allows it.",
            "Add the item to tomorrow's checklist so it doesn't happen again."
        ]

    },


    coding: {

        icon: "💻",

        title: "Coding Deadline",

        description:
            "Stop adding features. Get the core functionality working first.",

        steps: [
            "Write down exactly what must be submitted.",
            "Finish the main functionality before UI improvements.",
            "Test the most important user flow.",
            "Remove unnecessary features that are causing bugs.",
            "Save your work and make a Git commit.",
            "Prepare screenshots and a short project explanation."
        ]

    },


    unproductive: {

        icon: "🫠",

        title: "Feeling Unproductive",

        description:
            "You don't need motivation first. Start with something small enough that you cannot avoid it.",

        steps: [
            "Put your phone away for 15 minutes.",
            "Choose exactly one task.",
            "Set a 15-minute timer.",
            "Work only on the first small step.",
            "Take a short break after finishing.",
            "Decide whether you want another 15-minute round."
        ]

    },


    presentation: {

        icon: "🎤",

        title: "Presentation Soon",

        description:
            "A simple, well-explained presentation is better than a complicated one you cannot explain.",

        steps: [
            "Understand the problem and your solution clearly.",
            "Prepare a simple opening sentence.",
            "Know the purpose of every important slide.",
            "Practice explaining the project without reading.",
            "Prepare answers for likely questions.",
            "Check your laptop, charger and presentation file."
        ]

    },


    emergency: {

        icon: "🚨",

        title: "Campus Emergency",

        description:
            "Move to a safe location first and follow your institution's emergency procedures.",

        steps: [
            "Stay calm and assess the immediate danger.",
            "Move away from the hazard when safe to do so.",
            "Contact campus security or the appropriate emergency service.",
            "Follow instructions from authorized campus personnel.",
            "Avoid spreading unverified information.",
            "Keep your emergency contacts accessible."
        ]

    }

};


// ==========================================
// SURVIVAL TIPS
// ==========================================

const survivalTips = [

    "Keep your college ID and phone in an easily accessible place.",

    "Charge your phone before a long campus day.",

    "Keep one backup copy of important academic files.",

    "Save your project to Git before making major changes.",

    "Carry water when you know you will be on campus for several hours.",

    "Check the weather before leaving for college.",

    "Keep a small emergency stationery kit in your bag.",

    "Don't wait until the submission day to test your project.",

    "Save important documents in both cloud storage and local storage.",

    "Keep your campus emergency contacts saved in your phone.",

    "When overwhelmed, choose one task instead of trying to solve everything.",

    "Keep a charger or power bank ready on long college days."

];


// ==========================================
// LOAD SAVED DATA
// ==========================================

let completedItems =
    JSON.parse(
        localStorage.getItem(CHECKLIST_KEY)
    ) || [];

let contacts =
    JSON.parse(
        localStorage.getItem(CONTACT_KEY)
    ) || {

        security: "",
        medical: "",
        office: ""

    };

let tipsGenerated =
    Number(
        localStorage.getItem(TIPS_KEY)
    ) || 0;


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderChecklist("all");

        updateStats();

        loadContacts();

        updateTipsCount();

    }
);


// ==========================================
// RENDER CHECKLIST
// ==========================================

function renderChecklist(category) {

    const container =
        document.getElementById(
            "checklistContainer"
        );

    container.innerHTML = "";


    const filteredItems =
        category === "all"
            ? checklistItems
            : checklistItems.filter(
                item => item.category === category
            );


    filteredItems.forEach(item => {

        const completed =
            completedItems.includes(item.id);


        const element =
            document.createElement("div");


        element.className =
            `check-item ${
                completed ? "completed" : ""
            }`;


        element.innerHTML = `

            <input
                type="checkbox"
                id="item-${item.id}"
                ${completed ? "checked" : ""}
                onchange="toggleItem(${item.id})"
            >

            <label for="item-${item.id}">
                ${item.icon} ${item.name}
            </label>

            <small>
                ${capitalize(item.category)}
            </small>

        `;


        container.appendChild(element);

    });

}


// ==========================================
// TOGGLE CHECKLIST ITEM
// ==========================================

function toggleItem(id) {

    if (completedItems.includes(id)) {

        completedItems =
            completedItems.filter(
                item => item !== id
            );

    } else {

        completedItems.push(id);

    }


    localStorage.setItem(
        CHECKLIST_KEY,
        JSON.stringify(completedItems)
    );


    const activeCategory =
        document.querySelector(
            ".category-btn.active"
        );


    renderChecklist(
        getCategoryFromButton(
            activeCategory
        )
    );


    updateStats();

}


// ==========================================
// FILTER CHECKLIST
// ==========================================

function filterItems(category, button) {

    document
        .querySelectorAll(".category-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );


    button.classList.add("active");


    renderChecklist(category);

}


// ==========================================
// CATEGORY HELPER
// ==========================================

function getCategoryFromButton(button) {

    if (!button) return "all";


    const text =
        button.textContent.toLowerCase();


    if (text.includes("academic"))
        return "academic";

    if (text.includes("tech"))
        return "tech";

    if (text.includes("daily"))
        return "daily";

    if (text.includes("emergency"))
        return "emergency";


    return "all";

}


// ==========================================
// UPDATE STATS
// ==========================================

function updateStats() {

    const total =
        checklistItems.length;


    const completed =
        completedItems.length;


    const score =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    document.getElementById(
        "completedCount"
    ).textContent = completed;


    document.getElementById(
        "totalCount"
    ).textContent = total;


    document.getElementById(
        "survivalScore"
    ).textContent = `${score}%`;


    document.getElementById(
        "progressText"
    ).textContent = `${score}%`;


    document.getElementById(
        "progressFill"
    ).style.width = `${score}%`;

}


// ==========================================
// SURVIVAL PLAN
// ==========================================

function showPlan(type) {

    const plan =
        survivalPlans[type];


    if (!plan) return;


    document.getElementById(
        "planIcon"
    ).textContent = plan.icon;


    document.getElementById(
        "planTitle"
    ).textContent = plan.title;


    document.getElementById(
        "planDescription"
    ).textContent = plan.description;


    const stepsContainer =
        document.getElementById(
            "planSteps"
        );


    stepsContainer.innerHTML = "";


    plan.steps.forEach(
        (step, index) => {

            const element =
                document.createElement("div");


            element.className =
                "plan-step";


            element.innerHTML = `

                <span class="step-number">
                    ${index + 1}
                </span>

                <span>
                    ${step}
                </span>

            `;


            stepsContainer.appendChild(
                element
            );

        }
    );


    document
        .getElementById("planResult")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

}


// ==========================================
// SCROLL
// ==========================================

function scrollToSurvival() {

    document
        .getElementById("survivalSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// RANDOM TIP
// ==========================================

function generateTip() {

    const randomIndex =
        Math.floor(
            Math.random() *
            survivalTips.length
        );


    const tip =
        survivalTips[randomIndex];


    document.getElementById(
        "tipText"
    ).textContent = tip;


    tipsGenerated++;


    localStorage.setItem(
        TIPS_KEY,
        tipsGenerated
    );


    updateTipsCount();

}


// ==========================================
// TIP COUNT
// ==========================================

function updateTipsCount() {

    document.getElementById(
        "tipsCount"
    ).textContent = tipsGenerated;

}


// ==========================================
// COPY CHECKLIST
// ==========================================

async function copyChecklist() {

    const completed =
        checklistItems.filter(
            item =>
                completedItems.includes(item.id)
        );


    const remaining =
        checklistItems.filter(
            item =>
                !completedItems.includes(item.id)
        );


    let text =
        "CAMPUS SURVIVAL CHECKLIST\n\n";


    text += "COMPLETED:\n";


    if (completed.length === 0) {

        text += "None yet\n";

    } else {

        completed.forEach(item => {

            text += `✓ ${item.name}\n`;

        });

    }


    text += "\nREMAINING:\n";


    if (remaining.length === 0) {

        text += "Everything ready!\n";

    } else {

        remaining.forEach(item => {

            text += `□ ${item.name}\n`;

        });

    }


    try {

        await navigator.clipboard.writeText(
            text
        );


        alert(
            "Checklist copied to your clipboard!"
        );

    } catch {

        alert(
            "Could not copy automatically. Try again in a supported browser."
        );

    }

}


// ==========================================
// RESET CHECKLIST
// ==========================================

function resetChecklist() {

    const confirmed =
        confirm(
            "Reset your entire campus checklist?"
        );


    if (!confirmed) return;


    completedItems = [];


    localStorage.setItem(
        CHECKLIST_KEY,
        JSON.stringify(completedItems)
    );


    renderChecklist("all");


    document
        .querySelectorAll(".category-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );


    document
        .querySelector(".category-btn")
        .classList.add("active");


    updateStats();

}


// ==========================================
// EMERGENCY CONTACTS
// ==========================================

function editContact(type) {

    const names = {

        security: "Campus Security",

        medical: "Campus Medical",

        office: "College Office"

    };


    const current =
        contacts[type] || "";


    const number =
        prompt(
            `Enter the phone number for ${names[type]}:`,
            current
        );


    if (number === null) return;


    contacts[type] =
        number.trim();


    localStorage.setItem(
        CONTACT_KEY,
        JSON.stringify(contacts)
    );


    loadContacts();

}


// ==========================================
// LOAD CONTACTS
// ==========================================

function loadContacts() {

    document.getElementById(
        "securityNumber"
    ).textContent =
        contacts.security ||
        "Add campus number";


    document.getElementById(
        "medicalNumber"
    ).textContent =
        contacts.medical ||
        "Add medical number";


    document.getElementById(
        "officeNumber"
    ).textContent =
        contacts.office ||
        "Add office number";

}


// ==========================================
// FOCUS TIMER
// ==========================================

let timerSeconds = 25 * 60;

let timerInterval = null;

let timerRunning = false;


function startTimer() {

    document
        .getElementById("timerModal")
        .classList.add("active");


    updateTimerDisplay();

}


function closeTimer() {

    document
        .getElementById("timerModal")
        .classList.remove("active");

}


function toggleTimer() {

    if (timerRunning) {

        pauseTimer();

    } else {

        runTimer();

    }

}


function runTimer() {

    timerRunning = true;


    document.getElementById(
        "timerButton"
    ).textContent = "Pause";


    document.getElementById(
        "timerStatus"
    ).textContent =
        "Focus mode is running. Stay with one task.";


    timerInterval =
        setInterval(() => {

            timerSeconds--;


            updateTimerDisplay();


            if (timerSeconds <= 0) {

                clearInterval(
                    timerInterval
                );


                timerRunning = false;


                document.getElementById(
                    "timerButton"
                ).textContent = "Start";


                document.getElementById(
                    "timerStatus"
                ).textContent =
                    "🎉 Focus session complete!";

                alert(
                    "25-minute focus session complete!"
                );

            }

        }, 1000);

}


function pauseTimer() {

    clearInterval(
        timerInterval
    );


    timerRunning = false;


    document.getElementById(
        "timerButton"
    ).textContent = "Start";


    document.getElementById(
        "timerStatus"
    ).textContent =
        "Timer paused. Continue when you're ready.";

}


function resetTimer() {

    clearInterval(
        timerInterval
    );


    timerSeconds = 25 * 60;

    timerRunning = false;


    document.getElementById(
        "timerButton"
    ).textContent = "Start";


    document.getElementById(
        "timerStatus"
    ).textContent =
        "Focus on one task. No distractions.";


    updateTimerDisplay();

}


function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timerSeconds / 60
        );


    const seconds =
        timerSeconds % 60;


    document.getElementById(
        "timerDisplay"
    ).textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


// ==========================================
// MODAL CLOSE
// ==========================================

document
    .getElementById("timerModal")
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "timerModal"
            ) {

                closeTimer();

            }

        }
    );


// ==========================================
// KEYBOARD ESCAPE
// ==========================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeTimer();

        }

    }
);


// ==========================================
// HELPER
// ==========================================

function capitalize(text) {

    return text.charAt(0).toUpperCase() +
        text.slice(1);

}