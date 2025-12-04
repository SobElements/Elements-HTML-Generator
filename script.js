// Wait for the page to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Track active bucket
    let activeBucket = 'normal';

    // Get elements
    const tabNormal = document.getElementById('tab-normal');
    const tabProject = document.getElementById('tab-project');
    const optionSelect = document.getElementById('option-select');
    const dynamicInputs = document.getElementById('dynamic-inputs');
    const generateBtn = document.getElementById('generate-btn');
    const outputArea = document.getElementById('output-area');

    // HTML Templates for Normal bucket
    const normalTemplates = {
        learning: `<div class="elements_summary">
    <h2><strong>WK ??: TITLE</strong><br></h2>
</div>
<div class="elements_summary_text"><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/elements%20logo%20disc.png?forcedownload=1" alt="" width="200" height="199" role="presentation" class="img-fluid atto_image_button_middle">
    <h2 style="text-align: left; margin-left: 30px;"><span class="sr-only">Learning Objectives</span><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/learning%20objectives%20%28V2%29.png?forcedownload=1" alt="Learning Objectives" width="278" height="32" role="presentation" class="img-fluid atto_image_button_text-bottom"></h2>
    <p style="margin-left: 30px;"></p>
    <p style="margin-left: 30px;"><strong><span style="color: #212529;">In this session you will be able to:</span></strong></p>
    <ul style="list-style-type: disc; margin-left: 20px;">
        <li><br></li>
        <li><br></li>
        <li><br></li>
    </ul>
    <ul></ul>
</div>`,
        
        plenary: `<div class="elements_task">
    <h4>Well Done! You have completed this week's Elements<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Tick.png?forcedownload=1" alt="" width="32" height="32" role="presentation" class="img-fluid atto_image_button_text-bottom"><br></h4>
</div>
<p></p>
<p><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Plenary.png?forcedownload=1" alt="Plenary" width="70" height="70" class="img-fluid atto_image_button_middle">&nbsp;This week you have learned about:<br></p>
<p></p>
<ul>
    <li><strong></strong><br></li>
</ul>
<p></p>`,
        
        stretch: `<div class="elements_task"><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/stretch%20challenge.png?forcedownload=1" alt="Stretch and Challenge" width="284" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<p>Enter text here</p>`,
        
        duration: `<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>`,
        
        task1: `<div class="elements_task"><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task1.png?forcedownload=1" alt="Task 1" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`,
        
        task2: `<div class="elements_task"><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task2.png?forcedownload=1" alt="Task 2" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`,
        
        task3: `<div class="elements_task"><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task3.png?forcedownload=1" alt="Task 3" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`,
        
        task4: `<div class="elements_task"><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task4.png?forcedownload=1" alt="Task 4" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`,
        
        task5: `<div class="elements_task"><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task5.png?forcedownload=1" alt="Task 5" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`
    };

    // HTML Templates for Project bucket
    const projectTemplates = {
        learning: `<div class="elements_summary green">
    <h2><strong><span>WK ??: PROJECT WEEK: Title</span></strong></h2>
</div>
<div class="elements_summary_text green"><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Project%20Image.png?forcedownload=1" alt="" width="250" height="250" role="presentation" class="img-fluid atto_image_button_middle">
    <h2 style="text-align: left; margin-left: 30px;"><span class="sr-only">Learning Objectives</span><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/learning%20objectives%20%28V2%29.png?forcedownload=1" alt="Learning Objectives" width="278" height="32" class="img-fluid atto_image_button_text-bottom"></h2>
    <ul>
        <li><strong>Add your objectives here</strong></li>
    </ul>
    <p></p>
    <h2 style="text-align: left; margin-left: 30px;"><span class="sr-only">Skills Badges</span><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/skills%20badges%20%28V2%29.png?forcedownload=1" alt="Skills Badges" width="215" height="33" class="img-fluid atto_image_button_text-bottom"></h2>
    <p></p>
    <p style="padding-left: 30px;"><strong><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Collab%205c.png?forcedownload=1" width="71" height="85" role="presentation" class="img-fluid atto_image_button_text-bottom">&nbsp;<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Comms%205c.png?forcedownload=1" alt="Communication Badge
" width="71" height="84" class="img-fluid atto_image_button_text-bottom">&nbsp;<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Creativity%205c.png?forcedownload=1" alt="Creativity Badge" width="71" height="84" class="img-fluid atto_image_button_text-bottom">&nbsp;<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Critical%205c.png?forcedownload=1" alt="Critical Thinking" width="71" height="84" class="img-fluid atto_image_button_text-bottom">&nbsp;<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Company%205c.png?forcedownload=1" alt="Company Behaviours Digital badge" width="71" height="85" class="img-fluid atto_image_button_text-bottom"></strong></p>
    <h2 style="padding-left: 30px;"><strong><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Project%20Word%20Image.png?forcedownload=1" alt="Project Outline" width="160" height="32" class="img-fluid atto_image_button_text-bottom"><br></strong></h2>
    <ul>
        <li><strong>Add your short project summary here</strong></li>
    </ul>
    <p></p>
</div>`,
        
        plenary: `<div class="elements_task green"><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Tick.png?forcedownload=1" alt="" width="32" height="32" role="presentation" class="atto_image_button_middle">
    <h4>Well done! You have completed all of this week's Elements</h4>
</div><br><img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Plenary.png?forcedownload=1" alt="Plenary" width="70" height="70" class="img-fluid atto_image_button_middle">&nbsp;This week you have:<br>
<p></p>
<ul>
    <li><strong></strong><br></li>
</ul>
<p></p>`,
        
        stretch: `<div class="elements_task green"><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/stretch%20challenge.png?forcedownload=1" alt="Stretch and Challenge" width="284" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<p>Enter text here</p>`,
        
        duration: `<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>`,
        
        task1: `<div class="elements_task green"><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task1.png?forcedownload=1" alt="Task 1" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`,
        
        task2: `<div class="elements_task green"><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task2.png?forcedownload=1" alt="Task 2" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`,
        
        task3: `<div class="elements_task green"><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task3.png?forcedownload=1" alt="Task 3" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`,
        
        task4: `<div class="elements_task green"><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task4.png?forcedownload=1" alt="Task 4" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`,
        
        task5: `<div class="elements_task green"><img src=" https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/task5.png?forcedownload=1" alt="Task 5" width="104" height="32" class="img-fluid atto_image_button_text-bottom">
    <h4>Enter Task Name</h4>
</div>
<p></p>
<img src="https://moodle.howcollege.ac.uk/pluginfile.php/169272/mod_folder/content/0/Timed%20Task.png?forcedownload=1" alt="Timer" width="50" height="50" class="img-fluid atto_image_button_middle">&nbsp;<strong>This task should take approximately XX mins.</strong><br><br>
<p>Enter text here</p>`
    };

    // Tab switching logic
    tabNormal.addEventListener('click', () => {
        activeBucket = 'normal';
        tabNormal.classList.add('active');
        tabProject.classList.remove('active');
        console.log('Switched to Normal bucket');
    });

    tabProject.addEventListener('click', () => {
        activeBucket = 'project';
        tabProject.classList.add('active');
        tabNormal.classList.remove('active');
        console.log('Switched to Project bucket');
    });

    // Handle option selection
    optionSelect.addEventListener('change', () => {
        const selectedOption = optionSelect.value;
        dynamicInputs.innerHTML = ''; // Clear previous inputs
        
        console.log('Selected option:', selectedOption);

        if (selectedOption === 'duration') {
            // Show duration input
            dynamicInputs.innerHTML = `
                <label for="duration-input">Enter duration (minutes):</label>
                <input type="number" id="duration-input" min="1" />
            `;
        } else if (selectedOption === 'task') {
            // Show task number and duration inputs
            dynamicInputs.innerHTML = `
                <label for="task-number">Task number:</label>
                <input type="number" id="task-number" min="1" max="5" />
                <br>
                <label for="task-duration">Enter duration (minutes):</label>
                <input type="number" id="task-duration" min="1" />
            `;
        }
    });

    // Generate HTML button
    generateBtn.addEventListener('click', () => {
        const selectedOption = optionSelect.value;
        let generatedHTML = '';

        if (!selectedOption) {
            alert('Please select an option first!');
            return;
        }

        // Choose the correct template bucket based on active tab
        const templates = activeBucket === 'normal' ? normalTemplates : projectTemplates;

        // Generate HTML based on selection
        if (selectedOption === 'learning') {
            generatedHTML = templates.learning;
        } else if (selectedOption === 'plenary') {
            generatedHTML = templates.plenary;
        } else if (selectedOption === 'stretch') {
            generatedHTML = templates.stretch;
        } else if (selectedOption === 'duration') {
            const duration = document.getElementById('duration-input').value;
            if (!duration) {
                alert('Please enter a duration!');
                return;
            }
            generatedHTML = templates.duration.replace('XX', duration);
        } else if (selectedOption === 'task') {
            const taskNumber = document.getElementById('task-number').value;
            const taskDuration = document.getElementById('task-duration').value;
            
            if (!taskNumber || !taskDuration) {
                alert('Please enter both task number and duration!');
                return;
            }
            
            if (taskNumber < 1 || taskNumber > 5) {
                alert('Task number must be between 1 and 5!');
                return;
            }
            
            generatedHTML = templates[`task${taskNumber}`].replace('XX', taskDuration);
        }

        // Display the generated HTML
        outputArea.value = generatedHTML;
        console.log('Generated HTML for', activeBucket, 'bucket:', generatedHTML);
    });

    // Add copy to clipboard functionality
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy to Clipboard';
    copyBtn.id = 'copy-btn';
    copyBtn.style.marginTop = '10px';
    copyBtn.style.padding = '10px 20px';
    copyBtn.style.backgroundColor = '#28a745';
    copyBtn.style.color = 'white';
    copyBtn.style.border = 'none';
    copyBtn.style.cursor = 'pointer';
    copyBtn.style.fontSize = '14px';
    
    outputArea.parentElement.appendChild(copyBtn);
    
    copyBtn.addEventListener('click', () => {
        if (outputArea.value) {
            outputArea.select();
            document.execCommand('copy');
            
            // Visual feedback
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy to Clipboard';
            }, 2000);
        } else {
            alert('Nothing to copy! Generate HTML first.');
        }
    });

});

