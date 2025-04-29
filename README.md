# Hospital Management System 🏥

A full-stack hospital management web application to manage doctor shifts, patient reservations, and cases tracking with role-based access control (Admin, Receptionist, Doctor).

## Roles Features ✨
### Admins and Receptionists:
- Check doctors in the current shift.
- Search patients by phone number to see if the patient registered in the system.
- Add patient info for new patients.
- Edit an existing patient.
- Reserve a patient check or consultation.
- Cancel patient reservation.

### Admins:
- Create accounts for receptionists, admins, and doctors, or create a new clinic.
- Add or remove doctors to/from shifts.

### Doctors:
- See the queue of patients reserved with him/her.
- Write a report, prescription, and schedule a consultation date.
- See the previous reports and prescriptions by date.
- Mark checks and consults as complete.

## Tech Stack 🚀
- Backend: Node.js, Express.js, TypeScript, MongoDB (Mongoose ODM)
- Frontend: React.js, TailwindCSS, TypeScript
- Remote State Management: React Query
- Authentication: JWT + Cookies
- File Upload: Multer
- Emails: Nodemailer

## Getting Started Locally 🖥️

1. Clone the project:
```bash
git clone https://github.com/ehabsmh/hospital-management-system.git
```

2. Install Dependencies and run:
   ```bash
   cd backend
   npm install
   npm start
   ```
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment 🌐
- Backend hosted on Railway
- Frontend hosted on Netlify
**https://hospital-msys.netlify.app/**

## Contact Me 📬
- [LinkedIn](https://www.linkedin.com/in/dev-ehabelsayed/)
- [GitHub](https://github.com/ehabsmh)
