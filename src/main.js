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
        avatar: './src/assets/img/patient_1.webp',
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
        avatar: './src/assets/img/patient_2.webp',
        contact: '+44 20 7946 0958',
        nationality: 'fi fi-gb',
        nationalityName: 'British',
        email: 'jane.smith@example.com',
        birthdate: '22 May 1988',
        age: '(37 yrs.)',
        nric: 'BP123456C',
        occupation: 'Marketing Manager',
        lastVisit: '08 Jan 2026 10:00AM',
        visitDuration: '(30 min)',
        remark: 'Routine check-up completed. Allergies: Aspirin',
        vip: true
    },
    '114': {
        // patient: 'Maria Garcia',
        // avatar: './src/assets/img/patient_3.webp',
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
    '11D': {
        patient: 'Maria Garcia',
        avatar: './src/assets/img/patient_3.webp',
        contact: '+34 91 123 4567',
        nationality: 'fi fi-es',
        nationalityName: 'Spanish',
        email: 'maria.garcia@example.com',
        birthdate: '10 Mar 1992',
        age: '(33 yrs.)',
        nric: 'ES987654D',
        occupation: 'Teacher',
        lastVisit: '05 Jan 2026 03:15PM',
        visitDuration: '(50 min)',
        remark: 'Prescribed new medication for allergies. No known drug allergies.',
        vip: false
    },
    '115': {
        patient: 'Li Wei',
        avatar: './src/assets/img/patient_4.webp',
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

// Appointment Data
const appointments = {
    'apt-001': {
        patientId: '112',
        date: '20 Jan 2026',
        time: '02:30PM',
        treatmentType: 'Hypertension Follow-up',
        assignedDoctor: 'Dr. Sarah Johnson',
        status: 'StatusScheduled',
        remark: 'Elevated blood pressure, mild headaches'
    },
    'apt-002': {
        patientId: '113',
        date: '22 Jan 2026',
        time: '10:00AM',
        treatmentType: 'Routine Checkup',
        assignedDoctor: 'Dr. Michael Chen',
        status: 'StatusScheduled',
        remark: 'General health assessment'
    },
    'apt-003': {
        patientId: '114',
        date: '25 Jan 2026',
        time: '03:15PM',
        treatmentType: 'Cardiology Consultation',
        assignedDoctor: 'Dr. Emma Rodriguez',
        status: 'StatusPending',
        remark: 'Chest discomfort, shortness of breath'
    },
    'apt-004': {
        patientId: '115',
        date: '28 Jan 2026',
        time: '11:00AM',
        treatmentType: 'Orthopedic Examination',
        assignedDoctor: 'Dr. James Kumar',
        status: 'StatusScheduled',
        remark: 'Back pain, reduced mobility'
    },
    'apt-005': {
        patientId: '112',
        date: '10 Jan 2026',
        time: '02:30PM',
        treatmentType: 'Post-Surgery Review',
        assignedDoctor: 'Dr. Sarah Johnson',
        status: 'StatusCompleted',
        remark: 'Recovery assessment, wound check'
    }
};

const PatientPanel = (() => {
    const overlay = document.getElementById('patient-overlay');
    const panel = document.getElementById('patient-panel');
    let btn_close = null;
    let trapHandler = null;

    const ButtonClose = `
        <button id="patient-close" aria-label="Close patient panel" class="button__secondary button__icon !bg-white/60 aspect-square w-fit rounded-2xl p-1">
            <svg class="icon--lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"/></svg>
        </button>
    `;

    const addClose = () => {
        btn_close = document.getElementById('patient-close');
        btn_close.removeEventListener('click', closePanel);
        btn_close.addEventListener('click', closePanel);
    }

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
                ${ButtonClose}
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
            ${ButtonClose}
            <div role="dialog" aria-modal="true" tabindex="-1" class="relative w-[80%] md:w-[50%] lg:w-[30%] h-full bg-primary/80 p-4 overflow-y-auto">
                <span class="flex gap-2 mt-2">
                    <h1 id="patient-name">${data.patient}</h1>
                    <span aria-hidden="true" class="${data.nationality}"></span>
                </span>
                <div id="patient-content">
                    <section class="flex flex-col ml-4">
                        <p class="patient__data">
                            <span class="sr-only">Contact</span>
                            <svg class="icon--sm icon--light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M19.95 21q-3.125 0-6.187-1.35T8.2 15.8t-3.85-5.55T3 4.05V3h5.9l.925 5.025l-2.85 2.875q.55.975 1.225 1.85t1.45 1.625q.725.725 1.588 1.388T13.1 17l2.9-2.9l5 1.025V21z"/></svg>
                            <span>${data.contact}</span>
                        </p>
                        <p class="patient__data">
                            <span class="sr-only">Email</span>
                            <svg class="icon--sm icon--light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zM20 8l-7.475 4.675q-.125.075-.262.113t-.263.037t-.262-.037t-.263-.113L4 8v10h16zm-8 3l8-5H4zM4 8v.25v-1.475v.025V6v.8v-.012V8.25zv10z"/></svg>
                            <span>${data.email}</span>
                        </p>
                        <p class="patient__data">
                            <span class="sr-only">Date of birth</span>
                            <svg class="icon--sm icon--light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><!-- Icon from IconPark Outline by ByteDance - https://github.com/bytedance/IconPark/blob/master/LICENSE --><g fill="none"><path d="M8 40h32V24H8z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M40 40H8m32 0H4h4m32 0h4m-4 0V24H8v16"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m40 34l-4-2l-4 2l-4-2l-4 2l-4-2l-4 2l-4-2l-4 2m24-10v-9m-8 9v-9m-8 9v-9m16-5V8m-8 2V8m-8 2V8M8 24v16m32-16v16"/></g></svg>
                            <span>${data.birthdate} ${data.age}</span>
                        </p>
                    </section>
                    <section class="patient__section">
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
                    </section>
                    <section class="patient__section">
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
                    </section>
                </div>
            </div>
        `;
    }

    const handleTab = (e) => {
        if (e.key !== 'Tab' || overlay.classList.contains('hidden'))
            return ;
        e.preventDefault();
        btn_close.focus();
    }

    const openPanel = (patientID) => {
        overlay.classList.remove('hidden');
        panel.offsetHeight; 
        panel.classList.add('transition-all', 'duration-300');
        panel.classList.remove('translate-x-full');

        panel.innerHTML = `
            ${ButtonClose}
            <div role="status" aria-live="polite" aria-busy="true" class="relative w-[80%] md:w-[50%] lg:w-[30%] h-full bg-primary/80 p-4 overflow-y-auto flex items-center justify-center">
                <span class="sr-only">Loading Patient Panel</span>
                <svg class="w-6 h-6 text-white animate-spin" viewBox="0 0 64 64" fill="none"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-primary/50">
                    </path>
                </svg>
            </div>
        `;

        addClose();
        setTimeout(() => {
            createPanel(patientID);
            panel.setAttribute('aria-busy', 'false');
            addClose();
        }, 500);
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

const togglePatientPanel = (() => {
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

const UpcomingAppointments = (() => {
    const statusIcons = {
        StatusPending: `
            <span aria-label="Appointment Pending" class="sr-only">Appointment Pending</span>
                <svg aria-hidden="true" class="icon--sm fill-current text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m-.22-13h-.06c-.4 0-.72.32-.72.72v4.72c0 .35.18.68.49.86l4.15 2.49c.34.2.78.1.98-.24a.71.71 0 0 0-.25-.99l-3.87-2.3V7.72c0-.4-.32-.72-.72-.72"/></svg>
            </span>
        `,
        StatusScheduled:`
            <span aria-label="Appointment Scheduled" class="sr-only">Appointment Scheduled</span>
                <svg class="icon--sm fill-current text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v6.375q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h6.225q.425 0 .7.288T12.2 21t-.287.713T11.2 22zM5 8h14V6H5zm0 0V6zm11.525 11.675l3.55-3.55q.3-.3.7-.3t.7.3t.3.713t-.3.712L17.25 21.8q-.3.3-.712.3t-.713-.3L13.7 19.675q-.3-.3-.3-.712t.3-.713t.713-.3t.712.3z"/></svg>
            </span>
        `,
        StatusCompleted: `
            <span aria-label="Appointment Completed" class="sr-only">Appointment Completed</span>
                <svg class="icon--sm text-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from NRK Core Icons by Norsk rikskringkasting - https://creativecommons.org/licenses/by/4.0/ --><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12"/><path d="m17.608 9l-7.726 7.726L6 12.093l1.511-1.31l2.476 3.01l6.207-6.207z"/></g></svg>
            </span>
        `,
        // StatusCancel: `<svg class="icon--sm fill-current text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from NRK Core Icons by Norsk rikskringkasting - https://creativecommons.org/licenses/by/4.0/ --><g fill="currentColor"><path fill-rule="evenodd" d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12" clip-rule="evenodd" opacity=".5"/><path d="m15.293 7.293l-8 8l1.414 1.414l8-8z"/><path d="m8.707 7.293l8 8l-1.414 1.414l-8-8z"/></g></svg>`,
    };

    const getStatusIcon = (status) => {
        return statusIcons[status];
    };

    const render = () => {
        return Object.keys(appointments).map(key => {
            const data = appointments[key];
            icon_status = getStatusIcon(data.status) || '';
            return `
                <div role="dialog" tabindex="0" class="flex flex-col flex-shrink-0 bg-primary/90 rounded-3xl shadow-md/20 snap-start w-125 md:w-80 h-30 text-[14px] text-white">
                    <div class="flex justify-between bg-bgAlt border border-secondaryText/50 rounded-t-3xl py-1 px-4 font-semibold text-primaryText">
                        <span class="sr-only">Appointment date time</span>
                        <span aria-label="appointment date and time">${data.date} - ${data.time}</span>
                        ${icon_status}
                    </div>
                    <div class="mt-1 ml-1 px-4 pb-2">
                        <p aria-label="treatment type">${data.treatmentType}</p>
                        <p class="flex gap-1 items-start">
                            <span class="sr-only">Doctor</span>
                            <svg class="icon--sm fill-current text-white" xmlnsF="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><!-- Icon from Maki by Mapbox - https://creativecommons.org/publicdomain/zero/1.0/ --><path fill="currentColor" d="M5.5 7A2.5 2.5 0 0 1 3 4.5v-2a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v2a3.49 3.49 0 0 0 1.51 2.87A4.4 4.4 0 0 1 5 10.5a3.5 3.5 0 1 0 7 0v-.57a2 2 0 1 0-1 0v.57a2.5 2.5 0 0 1-5 0a4.4 4.4 0 0 1 1.5-3.13A3.49 3.49 0 0 0 9 4.5v-2A1.5 1.5 0 0 0 7.5 1H7a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v2A2.5 2.5 0 0 1 5.5 7m6 2a1 1 0 1 1 0-2a1 1 0 0 1 0 2"/></svg>
                            <span aria-label="assigned doctor" class="text-medium">${data.assignedDoctor}</span>
                        </p>
                        <p class="flex gap-1 items-start line-clamp-2">
                            <span class="sr-only">Remark</span>
                            <svg class="icon--sm fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M5.616 19H14v-4.192q0-.344.232-.576t.576-.232H19V5.616q0-.27-.173-.443T18.385 5H5.615q-.269 0-.442.173T5 5.616v12.769q0 .269.173.442t.443.173m0 1q-.667 0-1.141-.475T4 18.386V5.615q0-.666.475-1.14T5.615 4h12.77q.666 0 1.14.475T20 5.615v8.002q0 .332-.13.632t-.349.518l-4.754 4.754q-.217.218-.517.348t-.633.131zm5.884-6.538H8.385q-.213 0-.357-.144q-.143-.144-.143-.357t.143-.356t.357-.143H11.5q.213 0 .356.144t.144.356t-.144.356t-.356.144M15.616 9.5H8.385q-.213 0-.357-.144t-.143-.357t.143-.356t.357-.143h7.23q.213 0 .357.144t.144.357t-.144.356t-.356.143M5 19V5z"/></svg>
                            <span>${data.remark}</span>
                        </p>
                    </div>
                </div>
            `;
        }).join('');
    };

    return { render };
})();

const PatientListTable = (() => {
    const BadgeVIP = `<svg aria-label="VIP" class="icon--sm text-vip" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M9.68 13.69L12 11.93l2.31 1.76l-.88-2.85L15.75 9h-2.84L12 6.19L11.09 9H8.25l2.31 1.84zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2l6 2v-7.72A7.96 7.96 0 0 0 20 10m-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6s2.69-6 6-6"/></svg>`;
    const ButtonMoreActions = `
        <button title="More actions" class="table__action button__icon">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"/></svg>
        </button>
    `;

    const render = () => {
        const tableHeader = `
            <table id="patient-table" class="sm:min-w-[290px] w-full border-collapse border border-border text-left overflow-x-auto md:overflow-x-auto">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Contact</th>
                        <th>Nationality</th>
                        <th>Datetime</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        const rows = Object.keys(patients).map(key => {
            //11D share same data as 114, but 114 need for showing no data case
            if (key === '11D')
                return '';

            let counter = 0;
            ++counter;
            const data = key === '114' ? patients['11D'] : patients[key];
            const patientId = key === '114' ? '114' : (key === '115' ? '' : key);
            return `
                    <tr data-patient-id="${patientId}">
                        <td>
                            <div class="table__patient">
                                <img class="hidden md:block avatar w-6 md:w-8" src="${data.avatar}" alt="Patient ${counter} Avatar" />
                                <div>
                                    <p class="flex gap-1">
                                        <span>${data.patient}</span>
                                        ${data.vip ? BadgeVIP : ''}
                                    </p>
                                    <p class="text__idNumber">id: ${key}</p>
                                </div>
                            </div>
                        </td>
                        <td>${data.contact}</td>
                        <td>
                            <div class="table__nationality">
                                <span aria-hidden="true" class="hidden md:block ${data.nationality} icon__flag"></span>
                                <span>${data.nationalityName}</span>
                            </div>
                        </td>
                        <td>${data.lastVisit}</td>
                        <td>
                            ${ButtonMoreActions}
                        </td>
                    </tr>
            `;
        }).join('');

        const tableFooter = `
                </tbody>
            </table>
        `;

        return tableHeader + rows + tableFooter;
    }

    return  { render };
})();

document.addEventListener('DOMContentLoaded', () => {
    fetch('./src/components/navbar.html')
        .then(r => r.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
            NavSidebar.init();
    });
    document.getElementById('search-trigger').addEventListener('click', () => {
        document.getElementById('search').focus();
    });
    document.getElementById('section-table').innerHTML = PatientListTable.render();
    document.getElementById('appointment-cards').innerHTML = UpcomingAppointments.render();
    togglePatientPanel.init();
});