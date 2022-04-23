## Pitang Trainee Program

Pitang's final project that aims to create a React and Node.js application to schedule vaccine appointments (Covid-19) and to visualize all the already scheduled appointments grouped by date and time.

### How to run this project:
1. Download the files or clone this repository
2. Run **yarn install** or simply **yarn** in the terminal to install all dependencies listed within **package.json**
3. Start your **MongoDB Database Server**
4. Create a **.env** file in the project's root directory and insert the following configurations:

   - **DATABASE_URL** = mongodb://localhost:27017/schedule_vaccine
   - **DATABASE_URL_TEST** = mongodb://localhost:27017/schedule_vaccine_test
   - **PORT** = 4000
  
5. Run **yarn start** to execute the API

### Some Dependencies (Backend)

- @joi/date: 2.1.0
- cors: 2.8.5
- date-fns: 2.28.0
- date-fns-tz: 1.3.3
- dotenv: 16.0.0
- express: 4.17.3
- express-async-errors: 3.1.1
- joi: 17.6.0
- mongoose: 6.2.10
- morgan: 1.10.0
- @types/jest: 27.4.1
- cross-env: 7.0.3
- eslint: 8.13.0
- eslint-config-airbnb-base: 15.0.0
- eslint-plugin-import: 2.26.0
- jest: 27.5.1
- nodemon: 2.0.15
- supertest: 6.2.2

## Challenge Description

### Rules of use:

- Scheduling must be done on one page using a form.
- Maximum of 20 appointments per day.
- Maximum of 2 appointments for the same hour.
- A page must be created to consult the appointments.
- The result of the appointments must be grouped by day and time.
- The time interval between one appointment and another is 1 hour.

### Business rules:

- The patient must inform his name, date of birth and day and time of the
appointment.
- It must be checked if the form has been filled out.
- Patient data/schedules must be stored in memory.
- Within the page to consult the schedules, it must be possible to view the list of appointments and inform if the patient was seen or not,
and what was the conclusion of the appointment.
- When user press F5 or reload the page the data cannot be lost.

### Execution Rules:
1. Portal written in React (use react-datepicker to manage dates).
2. Build a Node API to receive data from the portal.
3. Axios as http client.
4. Use Formik to validate the data in the view.
5. IDE is your choice.

## API endpoints:

<table align="center">
<thead>
  <tr>
    <th><b>HTTP request</b></th>
    <th><b>Description</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>POST</b> /api/schedules</td>
    <td>Schedule a new appointment</td>
  </tr>
  <tr>
    <td><b>PUT</b> /api/schedules/:id</td>
    <td>Update an appointment (Used mainly to update conclusion text and status of appointment)</td>
  </tr>
  <tr>
    <td><b>DELETE</b> /api/schedules/:id</td>
    <td>Delete/unschedule an appointment</td>
  </tr>
  <tr>
    <td><b>GET </b> /api/schedules</td>
    <td>Returns all scheduled appointments</td>
  </tr>
</tbody>
</table>

<br/>
<p align="center">© Developed by Anne Livia</p>