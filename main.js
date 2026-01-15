const NavSidebar = (() => {
    const init = () => {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger-nav');
        const iconMenu = document.getElementById('nav-menu');
        const iconClose = document.getElementById('nav-close');
        hamburger.addEventListener('click', () => {
            const isNavHidden = navbar.classList.contains('md:hidden');;
            navbar.classList.toggle('md:hidden');
            navbar.classList.toggle('md:flex');
            iconMenu.classList.toggle('hidden', isNavHidden);
            iconClose.classList.toggle('hidden', !isNavHidden);
            hamburger.setAttribute('aria-expanded', isNavHidden);
        });
    };

    return { init };
})();

// Patient Data
const patients = {
    '112': {
        patient: 'John Doe',
        contact: '+1 234 567 8901',
        nationality: 'fi fi-us',
        nationalityName: 'American',
        email: 'john.doe@example.com',
        birthdate: '15 Jan 1990',
        age: '(36 yrs.)',
        nric: 'A1234567B',
        occupation: 'Software Engineer',
        lastVisit: '10 Jan 2026 02:30PM',
        visitDuration: '(45 min)',
        remark: 'Follow-up on hypertension management. Allergies: Penicillin, Shellfish. THis is aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa long text',
        vip: false
    },
    '113': {
        patient: 'Jane Smith',
        contact: '+44 20 7946 0958',
        nationality: 'fi fi-gb',
        nationalityName: 'British',
        email: 'jane.smith@example.com',
        birthdate: '22 May 1988',
			age: '37',
        nric: 'BP123456C',
        occupation: 'Marketing Manager',
        lastVisit: '08 Jan 2026 10:00AM',
        visitDuration: '(30 min)',
        remark: 'Routine check-up completed. Allergies: Aspirin',
        vip: true
    },
    '114': {
        // patient: 'Maria Garcia',
        // contact: '+34 91 123 4567',
        // nationality: 'fi fi-es',
        // nationalityName: 'Spanish',
        // email: 'maria.garcia@example.com',
        // birthdate: '10 Mar 1992',
        // age: '(33 yrs.)',
        // nric: 'ES987654D',
        // occupation: 'Teacher',
        // lastVisit: '05 Jan 2026 03:15PM',
        // visitDuration: '(50 min)',
        // remark: 'Prescribed new medication for allergies. No known drug allergies.',
        // vip: false
    },
    '115': {
        patient: 'Li Wei',
        contact: '+86 10 1234 5678',
        nationality: 'fi fi-cn',
        nationalityName: 'Chinese',
        email: 'li.wei@example.com',
        birthdate: '28 Nov 1985',
        age: '(40 yrs.)',
        nric: 'CN456789E',
        occupation: 'Accountant',
        lastVisit: '03 Jan 2026 01:45PM',
        visitDuration: '(35 min)',
        remark: 'Lab results reviewed, all normal. Allergies: Sulfonamides',
        vip: false
    },
};

const PatientPanel = (() => {
    const overlay = document.getElementById('patient-overlay');
    const panel = document.getElementById('patient-panel');
    let btn_close = null;
    let trapHandler = null;

    const checkingID = (patientID) => {
        const error = {
          "keyNotFound": "Error: Fail to fetch! Patient ID not found.",
          "dataMissing": "Error: Data missing for this patient."
        };
        let status = true;

        if (!(patientID in patients))
            status = "keyNotFound";
        else
        {
            const data = patients[patientID];
            if (!data || Object.keys(data).length === 0)
                status = "dataMissing";
        }
        if (status !== true) {
            console.error(error[status]);
            panel.innerHTML = `
                <button id="patient-close" aria-label="Close patient panel" class="button__secondary button__icon !bg-white/60 aspect-square w-fit rounded-2xl p-1">
                    <svg class="icon--lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"/></svg>
                </button>
                <div class="relative w-[80%] md:w-[50%] lg:w-[30%] h-full bg-primary/80 p-4 text-center text-white">
                    <p class="mt-4">${error[status]}</p>
                    <p>Patient ID: ${patientID}</p>
                </div>
            `;
            addClose();
            return false;
        }
        return true;
    };

    const createPanel = (patientID) => {
        if (!checkingID(patientID))
            return;

        const data = patients[patientID];
        panel.innerHTML = `
            <button id="patient-close" aria-label="Close patient panel" class="button__secondary button__icon !bg-white/60 aspect-square w-fit rounded-2xl p-1">
                <svg class="icon--lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"/></svg>
            </button>
            <div class="relative w-[80%] md:w-[50%] lg:w-[30%] h-full bg-primary/80 p-4 overflow-y-auto">
                <span class="flex gap-2 mt-2">
                    <h1>${data.patient}</h1>
                    <span class="${data.nationality}"></span>
                </span>
                <div class="flex flex-col ml-4">
                    <p class="patient__data">
                        <svg title="Contact" class="icon--sm icon--light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M19.95 21q-3.125 0-6.187-1.35T8.2 15.8t-3.85-5.55T3 4.05V3h5.9l.925 5.025l-2.85 2.875q.55.975 1.225 1.85t1.45 1.625q.725.725 1.588 1.388T13.1 17l2.9-2.9l5 1.025V21z"/></svg>
                        <span>${data.contact}</span>
                    </p>
                    <p class="patient__data">
                        <svg title="Email" class="icon--sm icon--light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zM20 8l-7.475 4.675q-.125.075-.262.113t-.263.037t-.262-.037t-.263-.113L4 8v10h16zm-8 3l8-5H4zM4 8v.25v-1.475v.025V6v.8v-.012V8.25zv10z"/></svg>
                        <span>${data.email}</span>
                    </p>
                    <p class="patient__data">
                        <svg title="Date of birth" class="icon--sm icon--light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><!-- Icon from IconPark Outline by ByteDance - https://github.com/bytedance/IconPark/blob/master/LICENSE --><g fill="none"><path d="M8 40h32V24H8z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M40 40H8m32 0H4h4m32 0h4m-4 0V24H8v16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m40 34l-4-2l-4 2l-4-2l-4 2l-4-2l-4 2l-4-2l-4 2m24-10v-9m-8 9v-9m-8 9v-9m16-5V8m-8 2V8m-8 2V8M8 24v16m32-16v16"/></g></svg>
                        <span>${data.birthdate} ${data.age}</span>
                    </p>
                </div>
                <div class="patient__section">
                    <h2>Personal Details</h2>
                    <dl>
                        <div class="patient__data">
                            <dt>Nationality</dt>
                            <dd>${data.nationalityName}</dd>
                        </div>
                        <div class="patient__data">
                            <dt>NRIC/Passport</dt>
                            <dd>${data.nric}</dd>
                        </div>
                        <div class="patient__data">
                            <dt>Occupation</dt>
                            <dd>${data.occupation}</dd>
                        </div>
                    </dl>
                </div>
                <div class="patient__section">
                    <h2>Medical Notes</h2>
                    <dl>
                        <div class="patient__data">
                            <dt>Last Visit</dt>
                            <dd>${data.lastVisit} ${data.visitDuration}</dd>
                        </div>
                        <div class="flex flex-col">
                            <dt>Remark</dt>
                            <dd class="patient__data--remarkBox">${data.remark}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        `;

        addClose();
    }

    const addClose = () => {
        btn_close = document.getElementById('patient-close');
        btn_close.addEventListener('click', closePanel);
    }

    const handleTab = (e) => {
        if (e.key !== 'Tab' || overlay.classList.contains('hidden'))
            return ;
        e.preventDefault();
        btn_close.focus();
    }

    const openPanel = (patientID) => {
        createPanel(patientID);
        overlay.classList.remove('hidden');
        panel.offsetHeight;
        panel.classList.add('transition-all', 'duration-300');
        panel.classList.remove('translate-x-full');
        btn_close.focus();
        trapHandler = handleTab;
        document.addEventListener('keydown', trapHandler);
    }

    const closePanel = () => {
        if (trapHandler)
            document.removeEventListener('keydown', trapHandler);
        panel.classList.add('translate-x-full');
        setTimeout(() => {
            overlay.classList.add('hidden');
            panel.innerHTML = '';
            panel.classList.remove('transition-all', 'duration-300');
        }, 400);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            closePanel();
        }
    });
    
    return { openPanel, closePanel };
})();

const PatientTable = (() => {
    const init = () => {
        document.querySelectorAll('#patient-table tbody tr').forEach(row => {
            row.addEventListener('click', () => {
                const patientID = row.getAttribute('data-patient-id');
                PatientPanel.openPanel(patientID);
            });

            row.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const patientID = row.getAttribute('data-patient-id');
                    PatientPanel.openPanel(patientID);
                }
            });

            row.setAttribute('tabindex', '0');
        });

        document.querySelectorAll('#patient-table button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
    NavSidebar.init();
    PatientTable.init();
});