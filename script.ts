document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Select the form elements
    const profilePictureInptut = document.getElementById('profilePicture') as HTMLInputElement
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const addresssElement = document.getElementById('address') as HTMLInputElement
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const hobbiesElement = document.getElementById('hobbies') as HTMLTextAreaElement

    // Check if elements are present
    if (profilePictureInptut && nameElement && emailElement && phoneElement && addresssElement && educationElement && experienceElement && skillsElement && hobbiesElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addresssElement.value
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const hobbies = hobbiesElement.value

        // Picture element
        const profilePictureFile = profilePictureInptut.files?.[0];
        const profilePictureURL = profilePictureFile? URL.createObjectURL(profilePictureFile) : '';

        // Create Resume Output
        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture"> `: ""}
            <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span> </p>
            <p><strong>Email:</strong> <span id="edit-edit" class="editable"> ${email} </span> </p>
            <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>
            <p><strong>Address:</strong> <span id="edit-address" class="editable"> ${address} </span> </p>
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            <h3>Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
            <h3>Hobbies</h3>
            <p id="edit-hobbies" class="editable">${hobbies}</p>
        `;

        

        // Display the resume output
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable()
        } 
        } else {
        console.error('One or more form elements are missing!');
    }
});

// here creating a function to make the content editable
function makeEditable(){
    const editableElements = document.querySelectorAll('editable');
    editableElements.forEach(element => {
        element.addEventListener('click' , function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "" ;

            // replace content here
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input')
                input.type = 'text'
                input.value = currentValue
                input.classList.add('editing-input')

                
                input.addEventListener('blur' , function() {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline'
                    input.remove()
                })


                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(input, currentElement)
                input.focus()
            }
        })
    })
}