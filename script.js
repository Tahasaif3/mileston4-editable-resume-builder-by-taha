"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resumeForm');
    const addEducationBtn = document.getElementById('addEducation');
    const addExperienceBtn = document.getElementById('addExperience');
    const addSkillBtn = document.getElementById('addSkill');
    const addHobbyBtn = document.getElementById('addHobby');
    function createRemovableEntry(containerId, entryHTML) {
        const container = document.getElementById(containerId);
        if (container) {
            const newEntry = document.createElement('div');
            newEntry.className = `${containerId.slice(0, -7)}-entry`;
            newEntry.innerHTML = entryHTML;
            container.appendChild(newEntry);
            const removeButton = newEntry.querySelector('.remove-entry');
            if (removeButton) {
                removeButton.addEventListener('click', function () {
                    container.removeChild(newEntry);
                });
            }
        }
    }
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', function () {
            createRemovableEntry('educationEntries', `
                <input type="text" name="qualification[]" placeholder="Qualification" required>
                <input type="number" name="year[]" placeholder="Year of Passing" required>
                <input type="text" name="grade[]" placeholder="Grade/Percentage" required>
                <input type="text" name="school[]" placeholder="School/Institution Name" required>
                <button type="button" class="remove-entry">Remove</button>
            `);
        });
    }
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', function () {
            createRemovableEntry('experienceEntries', `
                <input type="text" name="company[]" placeholder="Company Name" required>
                <input type="text" name="role[]" placeholder="Your Role" required>
                <input type="text" name="startDate[]" placeholder="Start Date (MM/YYYY)" required>
                <input type="text" name="endDate[]" placeholder="End Date (MM/YYYY or Present)" required>
                <textarea name="responsibilities[]" placeholder="Key Responsibilities" rows="3" required></textarea>
                <button type="button" class="remove-entry">Remove</button>
            `);
        });
    }
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', function () {
            createRemovableEntry('skillsEntries', `
                <input type="text" name="skills[]" placeholder="Enter a skill" required>
                <button type="button" class="remove-entry">Remove</button>
            `);
        });
    }
    if (addHobbyBtn) {
        addHobbyBtn.addEventListener('click', function () {
            createRemovableEntry('hobbiesEntries', `
                <input type="text" name="hobbies[]" placeholder="Enter a hobby" required>
                <button type="button" class="remove-entry">Remove</button>
            `);
        });
    }
    if (form) {
        form.addEventListener('submit', function (event) {
            var _a;
            event.preventDefault();
            const profilePictureInput = document.getElementById('profilePicture');
            const nameElement = document.getElementById('name');
            const emailElement = document.getElementById('email');
            const phoneElement = document.getElementById('phone');
            const addressElement = document.getElementById('address');
            if (profilePictureInput && nameElement && emailElement && phoneElement && addressElement) {
                const name = nameElement.value;
                const email = emailElement.value;
                const phone = phoneElement.value;
                const address = addressElement.value;
                // Get another education 
                const educationEntries = document.querySelectorAll('.education-entry');
                let educationHTML = '';
                educationEntries.forEach((entry) => {
                    const inputs = entry.querySelectorAll('input');
                    educationHTML += `
                        <div class="education-item">
                            <p><strong contenteditable="true">${inputs[0].value}</strong> - <span contenteditable="true">${inputs[1].value}</span></p>
                            <p>Grade: <span contenteditable="true">${inputs[2].value}</span>, Institution: <span contenteditable="true">${inputs[3].value}</span></p>
                        </div>
                    `;
                });
                // Get another experience 
                const experienceEntries = document.querySelectorAll('.experience-entry');
                let experienceHTML = '';
                experienceEntries.forEach((entry) => {
                    const inputs = entry.querySelectorAll('input');
                    const textarea = entry.querySelector('textarea');
                    experienceHTML += `
                        <div class="experience-item">
                            <p><strong contenteditable="true">${inputs[0].value}</strong> - <span contenteditable="true">${inputs[1].value}</span></p>
                            <p><span contenteditable="true">${inputs[2].value}</span> - <span contenteditable="true">${inputs[3].value}</span></p>
                            <p contenteditable="true">${textarea.value}</p>
                        </div>
                    `;
                });
                // Get skills
                const skillInputs = document.querySelectorAll('#skillsEntries input');
                const skills = Array.prototype.map.call(skillInputs, (input) => input.value).join(', ');
                // Get hobbies
                const hobbyInputs = document.querySelectorAll('#hobbiesEntries input');
                const hobbies = Array.prototype.map.call(hobbyInputs, (input) => input.value).join(', ');
                // Profile picture
                const profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
                const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
                // Creating Resume Output
                const resumeOutput = `
                    <div class="resume-container">
                        <h2 class="resume-title">Resume</h2>
                        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profile-picture">` : ""}
                        <div class="personal-info">
                            <p><strong>Name:</strong> <span contenteditable="true">${name}</span></p>
                            <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
                            <p><strong>Phone Number:</strong> <span contenteditable="true">${phone}</span></p>
                            <p><strong>Address:</strong> <span contenteditable="true">${address}</span></p>
                        </div>
                        <div class="section">
                            <h3>Education</h3>
                            ${educationHTML}
                        </div>
                        <div class="section">
                            <h3>Experience</h3>
                            ${experienceHTML}
                        </div>
                        <div class="section">
                            <h3>Skills</h3>
                            <p contenteditable="true">${skills}</p>
                        </div>
                        <div class="section">
                            <h3>Hobbies</h3>
                            <p contenteditable="true">${hobbies}</p>
                        </div>
                    </div>
                `;
                const resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    makeEditable();
                }
                else {
                    console.error('The resume output element is missing');
                }
            }
            else {
                console.error('One or more form elements are missing');
            }
        });
    }
});
function makeEditable() {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach((element) => {
        element.addEventListener('blur', function () {
            console.log('Content edited:', element.innerText);
        });
    });
}
