
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
        lastVisit_date: '10 Jan 2026',
        lastVisit_time: '02:30PM',
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
        lastVisit_date: '08 Jan 2026',
        lastVisit_time: '10:00AM',
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
        // lastVisit_date: '05 Jan 2026',
        // lastVisit_time: '03:15PM',
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
        lastVisit_date: '05 Jan 2026',
        lastVisit_time: '03:15PM',
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
        lastVisit_date: '03 Jan 2026',
        lastVisit_time: '01:45PM',
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