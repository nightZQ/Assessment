const NavSidebar = (() => {
    const init = () => {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger-nav');
        const iconMenu = document.getElementById('nav-menu');
        const iconClose = document.getElementById('nav-close');
        hamburger.addEventListener('click', () => {
            const isNavHidden = navbar.classList.contains('hidden');
            navbar.classList.toggle('hidden');
            navbar.classList.toggle('block');
            iconMenu.classList.toggle('hidden', isNavHidden);
            iconClose.classList.toggle('hidden', !isNavHidden);
            hamburger.setAttribute('aria-expanded', isNavHidden);

            const username = document.getElementById('user-name');
            if (window.innerWidth < 768) {
                    username.classList.toggle('hidden', isNavHidden);
            }
        });
    };

    return { init };
})();

const UpcomingAppointmentsSection = (() => {
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
                <div role="dialog" tabindex="0" class="flex flex-col flex-shrink-0 bg-primary/90 rounded-3xl shadow-md/20 snap-start w-65 md:w-80 h-30 text-[14px] text-white">
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
    const BadgeVIP = 
        `<svg aria-label="VIP" class="icon--sm text-vip place-self-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M9.68 13.69L12 11.93l2.31 1.76l-.88-2.85L15.75 9h-2.84L12 6.19L11.09 9H8.25l2.31 1.84zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2l6 2v-7.72A7.96 7.96 0 0 0 20 10m-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6s2.69-6 6-6"/></svg>`;
    const ButtonMoreActions = `
        <button title="More actions" class="table__action button__icon">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"/></svg>
        </button>
    `;

    const render = () => {
        const tableHeader = `
            <table class="sm:min-w-[290px] w-full border-collapse border border-border text-left">
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
                        <td>
                            <div class="flex gap-2 flex-wrap">
                                <span class="text-nowrap">${data.lastVisit_date}</span>
                                <span>${data.lastVisit_time}</span>
                            </div>
                        </td>
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
    document.getElementById('patient-table').innerHTML = PatientListTable.render();
    document.getElementById('appointment-cards').innerHTML = UpcomingAppointmentsSection.render();
    togglePatientPanel.init();
});