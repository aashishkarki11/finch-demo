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

        //company
        const companyDetails = await finch.hris.company.retrieve();

        console.log("company details :", companyDetails);
        console.log("Company ID:", companyDetails.id);
        console.log("Legal Name:", companyDetails.legal_name);
        console.log("Primary Email:", companyDetails.primary_email);
        console.log("Primary Phone Number:", companyDetails.primary_phone_number);

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
