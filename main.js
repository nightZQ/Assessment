// Navbar tablet view: toggle on/off
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
});

// Patient panel


// Patient Data
const patientDatabase = {
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
        allergies: 'Penicillin, Shellfish',
        lastVisit: '10 Jan 2026 02:30 PM',
        visitDuration: '(45 min)',
        remark: 'Follow-up on hypertension management. Allergies: Penicillin, Shellfish'
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
        allergies: 'Aspirin',
        lastVisit: '08 Jan 2026 10:00 AM',
        visitDuration: '(30 min)',
        remark: 'Routine check-up completed. Allergies: Aspirin'
    },
    '114': {
        patient: 'Maria Garcia',
        contact: '+34 91 123 4567',
        nationality: 'fi fi-es',
        nationalityName: 'Spanish',
        email: 'maria.garcia@example.com',
        birthdate: '10 Mar 1992',
        age: '(33 yrs.)',
        nric: 'ES987654D',
        occupation: 'Teacher',
        allergies: 'None',
        lastVisit: '05 Jan 2026 03:15 PM',
        visitDuration: '(50 min)',
        remark: 'Prescribed new medication for allergies. No known drug allergies.'
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
        allergies: 'Sulfonamides',
        lastVisit: '03 Jan 2026 01:45 PM',
        visitDuration: '(35 min)',
        remark: 'Lab results reviewed, all normal. Allergies: Sulfonamides'
    }
};