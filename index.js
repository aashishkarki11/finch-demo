import Finch from '@tryfinch/finch-api';
import { readFile } from 'fs/promises';

async function main() {
    try {
        const { access_token } = JSON.parse(await readFile('token.json'));

        const finch = new Finch({
            accessToken: access_token,
            maxRetries: 3,
        });

        //all jobs
        // const listAllJobs = await finch.jobs.automated.list();
        // console.log("all jobs: ", await finch.jobs.automated.list());

        //all jobs
        // const jobId ="7765eb59-d7e5-426e-901a-9751434c4919";
        // const jobData = await finch.jobs.automated.retrieve(jobId);
        // console.log("job data :", jobData);

        //individuals
        // const page = await finch.hris.directory.list();
        // const individualInDirectory = page.individuals[0];
        // const employeeData = page.individuals;
        // console.log("employee data :", employeeData);
        // console.log("first users data:", individualInDirectory);

        const employeeIds = ['b02cbf0a-c7c2-4795-804a-6561059fbd26', 'e1ff91dd-3d9c-47dd-9c4b-207209327752', '7003c945-6724-4c1c-867d-33e10c167551'];
        const request = {
            requests: employeeIds.map(id => ({
                individual_id: id
            }))
        };

        //selected employee id ko data
        const individualsPage = await finch.hris.individuals.retrieveMany(request);
        const individuals = individualsPage.responses;
        console.log("requested record for individual: ", individuals)

        //their email and type 
        individuals.forEach(individual => {
            const { body: { emails } } = individual;
            console.log("Emails for individual:", emails);
            emails.forEach(email => {
                const { data, type } = email;
                console.log(`Email: ${data}, Type: ${type}`);
            });
        });

        //company
        // const companyDetails = await finch.hris.company.retrieve();

        // console.log("company details :", companyDetails);
        // console.log("Company ID:", companyDetails.id);
        // console.log("Legal Name:", companyDetails.legal_name);
        // console.log("Primary Email:", companyDetails.primary_email);
        // console.log("Primary Phone Number:", companyDetails.primary_phone_number);

        //employment
        // const employmentData = await finch.employments.retrieveMany({ requests: individualIds.map(id => ({ individual_id: id })) });
        // console.log("employment data", employmentData);

        //payment
        // const startDate = '2024-01-01';
        // const endDate = '2024-12-31';
        // const query = {
        //     end_date: endDate,
        //     start_date: startDate,
        // };
        // const paymentData = await finch.payments.list(query);
        // console.log("payment data :", paymentData);


    } catch (error) {
        console.error('Error:', error);
    }
}

main();
