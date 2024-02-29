const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function () {
        jsPsych.data.displayData('csv');
      }
  });

let timeline = []; //Empty timeline to which we will add trials

//IRB//
const irb = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p><font size='3'>DESCRIPTION: We invite you to participate in a research study on language production and comprehension. In this experiment, you will complete a linguistic task online such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game.<br><br>RISKS AND BENEFITS: There are no known risks, costs, or discomforts in this study and this judgment is based on a large body of experience with the same or similar procedures with people of similar ages, sex, origins, etc.  We cannot and do not guarantee or promise that you will receive any benefits from this study. You will help us to understand how people perceive written stimuli.<br><br>TIME INVOLVEMENT: Your participation in this experiment will take less than one hour.<br><br>PAYMENTS: You will be paid at the posted rate. <br><br>SUBJECT'S RIGHTS: If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to answer particular questions. Your individual privacy will be maintained in all published and written data resulting from the study. <br><br> CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>WAIVER OF DOCUMENTATION: If you agree to participate in this research, please continue on to the next page.</font></p>",
    choices: ['Continue']
};

// push to the timeline
timeline.push(irb);

//INSTRUCTIONS//
const instructions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p><font size='3'>INSTRUCTIONS HERE<br><br>When you're ready to begin, click ‘Start’.</font></p>",
    choices: ['Start']
};

//push to the timeline
timeline.push(instructions);

// TRIALS
let trial_array = create_tv_array(trial_objects);
const trials = {
    timeline: [
        {
            type: jsPsychCloze,
            text: jsPsych.timelineVariable('text'),
            allow_blanks: false,
            button_text: 'Continue',
            data: {
                tag: jsPsych.timelineVariable('tag'),
                uvi: jsPsych.timelineVariable('uvi'),
                k_class: jsPsych.timelineVariable('k_class'),
                stim_id: jsPsych.timelineVariable('stim_id')
            },
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + trial_array.length));
            }
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            choices: [""],
            stimulus: "",
            response_ends_trial: false,
            trial_duration: 500
        }
    ],
    timeline_variables: trial_objects, //this is what is referencing the trials that were externally created
    randomize_order: true
};
timeline.push(trials);

const questionnaire = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'html',
                prompt: "Please answer the following questions:"
            },
            {
                type: 'multi-choice',
                prompt: 'Did you read the instructions and do you think you did the task correctly?', 
                name: 'correct', 
                options: ['Yes', 'No', 'I was confused']
            },
            {
                type: 'drop-down',
                prompt: 'Gender:',
                name: 'gender',
                options: ['Female', 'Male', 'Non-binary/Non-conforming', 'Other']
            },
            {
                type: 'text',
                prompt: 'Age:',
                name: 'age',
                textbox_columns: 10
            },
            {
                type: 'drop-down',
                prompt: 'Level of education:',
                name: 'education',
                options: ['Some high school', 'Graduated high school', 'Some college', 'Graduated college', 'Hold a higher degree']
            },
            {
                type: 'text',
                prompt: "Native language? (What was the language spoken at home when you were growing up?)",
                name: 'language',
                textbox_columns: 20
            },
            {
                type: 'drop-down',
                prompt: 'Do you think the payment was fair?',
                name: 'payment',
                options: ['The payment was too low', 'The payment was fair']
            },
            {
                type: 'drop-down',
                prompt: 'Did you enjoy the experiment?',
                name: 'enjoy',
                options: ['Worse than the average experiment', 'An average experiment', 'Better than the average experiment']
            },
            {
                type: 'text',
                prompt: "Do you have any other comments about this experiment?",
                name: 'comments',
                textbox_columns: 30,
                textbox_rows: 4
            }
        ]
    ],
    on_finish: function(){
        jsPsych.setProgressBar(1); // set progress bar to 85% full.
    }
};
timeline.push(questionnaire);

// THANKS //
const thanks = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Finish'],
    stimulus: "Thank you for your time! Please click 'Finish' and then wait a moment until you're directed back to Prolific.<br><br>"
};
timeline.push(thanks);

//RUN//
jsPsych.run(timeline);