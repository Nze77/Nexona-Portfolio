export interface FaqItem {
    question: string
    answer: string
}

// FAQ doubles as FAQPage structured data, so every answer opens with the actual
// answer — the rest is explanation for whoever keeps reading.
export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'What is college ERP software?',
        answer: 'One system instead of nine registers. Admissions, student records, fees, attendance, timetable, exams, hostel, transport, staff payroll — all reading from the same data, so nobody re-types a roll number for the fourth time this week. We build it custom, with a portal and an app for students and parents.',
    },
    {
        question: 'Is custom college ERP affordable for a single institution?',
        answer: 'Usually cheaper to own than a boxed one. Which sounds wrong, and is not. Ready-made campus software is priced per student — every admission season your bill climbs, for a bundle built for a university with departments you do not have. We build what your campus uses. You are not renting your own records back.',
    },
    {
        question: 'Custom ERP or ready-made school software — which is better?',
        answer: 'Ready-made, if your rules already match the product. Most institutions find out they do not, around the time someone asks it to handle a sibling concession that overlaps a scholarship in the second instalment. Then it is customisation charges, or a clerk keeping a parallel Excel. Custom fits from the start, and it changes when the university changes its format.',
    },
    {
        question: 'Does it work on mobile for students and parents?',
        answer: 'Yes — browser, or installed as an app on Android and iOS. Teachers mark attendance standing in the classroom. Parents check fees and results without ringing the office. That last part is the one principals notice first, because the phone stops.',
    },
    {
        question: 'Can it handle online fee payment and receipts?',
        answer: 'Yes. Parents pay online, receipts generate themselves, dues and instalments track themselves, reminders go out without anyone keeping a list. Your accounts person stops matching a bank statement against a register by hand every evening in July.',
    },
    {
        question: 'Can it produce NAAC, AICTE and UGC reports?',
        answer: 'Yes, and this is where it earns its keep. Enrolment, attendance, results, faculty, activities — the data those reports want is already sitting in the system. A report becomes a filter instead of a fortnight of chasing every department for a spreadsheet nobody has updated since the last visit.',
    },
    {
        question: 'Can it work for a school, a college, or a group of institutions?',
        answer: 'All three. A trust can run several campuses on one system, each with its own rules, with a combined view at the top. We build to your structure. Forcing every branch into one template is how you end up with a branch that quietly stops using it.',
    },
    {
        question: 'What about our existing student data?',
        answer: 'It comes across — students, fee history, staff, past results — and the old way can run alongside for a term while people settle. Almost everyone arrives from spreadsheets, a register, or software they bought once and now work around.',
    },
    {
        question: 'What features should a college ERP have?',
        answer: 'Admissions, student records, fees with online payment, attendance, timetable, exams and results, library, hostel, transport, staff payroll, a parent and student portal, communication, accounts, accreditation-ready reports. That is the spine. The rest depends on what you teach and who you answer to.',
    },
    {
        question: 'Do we own the software you build?',
        answer: 'You own it. Yours, shaped around your campus, extendable when you add a course or a branch or a department that does not exist yet.',
    },
]

/** Reasons Nexona's approach beats boxed campus software. */
export const WHY_BETTER = [
    {
        title: 'Newer technology',
        body: 'Most campus software was drawn up for a clerk at a desktop. You can feel it — every click waits. We build on modern tools, so a change takes days, not a term.',
    },
    {
        title: 'Works on mobile',
        body: 'Teachers mark attendance in the classroom. Parents check fees from home. The office works on a desktop. Same live data, all of it.',
    },
    {
        title: 'App and web app',
        body: 'A browser with nothing to install, or a proper app on the home screen. Parents will use whichever one is already in their hand.',
    },
    {
        title: 'Built to your rules',
        body: 'Your fee structure, your attendance policy, your grading, your university\'s formats. Not someone else\'s idea of how a campus runs.',
    },
    {
        title: 'Affordable to own',
        body: 'No modules you never open. No licence climbing with every admission. You own what we build.',
    },
    {
        title: 'It can grow',
        body: 'Add a course, a hostel, a whole branch. Built to be changed, not frozen on day one and worked around by March.',
    },
]

/** The features a college or school ERP genuinely needs. */
export const FEATURES = [
    {
        title: 'Admissions',
        body: 'Enquiry to application to enrolment. Documents, merit lists, seats left. Not a spreadsheet with a colour code only one person understands.',
    },
    {
        title: 'Student records',
        body: 'One profile per student — personal, academic, attendance, fees, history. One. Not five registers that disagree.',
    },
    {
        title: 'Fees and online payment',
        body: 'Structures, instalments, concessions, online payment, receipts that write themselves, dues that chase themselves.',
    },
    {
        title: 'Attendance',
        body: 'Marked from a phone or a biometric device. Visible to a parent the same day, not at term end when it is too late.',
    },
    {
        title: 'Timetable',
        body: 'Classes, rooms, faculty. No clashes. Changes everyone sees straight away.',
    },
    {
        title: 'Examination and results',
        body: 'Marks entry, moderation, grade cards, transcripts. In your affiliating university\'s format, not a close approximation.',
    },
    {
        title: 'Parent and student portal',
        body: 'Attendance, fees, results, notices. On their phone. The office phone stops ringing.',
    },
    {
        title: 'Library',
        body: 'Catalogue, issue, return, dues, reservations. Tied to the same student record as everything else.',
    },
    {
        title: 'Hostel and transport',
        body: 'Rooms, mess, routes, stops. Fees flow into the same account instead of a separate book.',
    },
    {
        title: 'Staff, payroll and HR',
        body: 'Faculty records, leave, workload, salary. Without a second system to reconcile against.',
    },
    {
        title: 'Communication',
        body: 'Notices and alerts to a class, a course, one parent. Sent from the system that already has the data.',
    },
    {
        title: 'Accreditation-ready reports',
        body: 'NAAC, AICTE, UGC — pulled from live records. Not assembled from every department the week before.',
    },
]

/** Custom vs boxed — the comparison buyers run before they enquire. */
export const COMPARISON: { point: string; boxed: string; nexona: string }[] = [
    {
        point: 'Fit to your rules',
        boxed: 'Your fee and grading rules bend to suit the product.',
        nexona: 'Built to the rules you already follow.',
    },
    {
        point: 'What you pay for',
        boxed: 'A bundle sized for a university. Most of it unused.',
        nexona: 'The modules your campus opens. That is it.',
    },
    {
        point: 'Growing intake',
        boxed: 'A licence per student, climbing every admission season.',
        nexona: 'Admit freely — nobody bills you per head for your own system.',
    },
    {
        point: 'Making a change',
        boxed: 'Raise a ticket. Wait on the vendor. Pay for the customisation.',
        nexona: 'Tell us. Small things land in days.',
    },
    {
        point: 'For parents and staff',
        boxed: 'Built for an office desktop. The phone came later, and it shows.',
        nexona: 'Phone, tablet, desktop. Installs as an app.',
    },
    {
        point: 'Going live',
        boxed: 'Long project, then a switch mid-term nobody is ready for.',
        nexona: 'Start where it hurts — fees, usually — then the rest.',
    },
    {
        point: 'Ownership',
        boxed: 'You rent access. Stop paying, it goes away.',
        nexona: 'You own what we build.',
    },
]

/** Institutions we build for — long-tail intent. */
export const INSTITUTIONS = [
    'Degree colleges',
    'Engineering colleges',
    'Schools (CBSE, ICSE, State)',
    'Junior colleges',
    'Pharmacy & nursing',
    'Management institutes',
    'Coaching institutes',
    'Education trusts & groups',
]

/** Signals an institution has outgrown registers and spreadsheets. */
export const SIGNALS = [
    'Admission season is one person and a spreadsheet with a colour code only she understands.',
    'Fee dues become clear once somebody reconciles the bank statement by hand. In the evening. In July.',
    'Attendance sits in a register until it is far too late to warn a parent.',
    'Results are rebuilt in Excel every term and the formulas are treated as sacred.',
    'The office phone rings all day with questions a parent could answer themselves.',
    'A NAAC visit is announced and the whole campus stops to collect data.',
]
