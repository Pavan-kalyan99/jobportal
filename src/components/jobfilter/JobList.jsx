// import JobCard from './JobCard';
import React, { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { Grid, Text } from "@mantine/core";
import JobCards from "./JobCards";
import JobSearch from "./JobSearch";
import debounce from 'lodash.debounce';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
console.log("url", supabaseUrl);
console.log('snkey::', supabaseAnonKey)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const jobs1 = [
    {
        id: 1,
        title: 'Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'Remote',
        type: 'Full-time',
        salary: '₹60k–₹100k',
        posted: '2 days ago',
        salary: 10,
        exp: '1-2',
        description: 'We are looking for a talented Full Stack Developer to design, develop, and maintain both front-end and back-end components of web applications. '
    },
    {
        id: 2,
        title: 'Backend Engineer',
        company: 'CodeBase',
        location: 'Bangalore',
        type: 'Part-time',
        salary: '₹40k–₹80k',
        posted: '5 days ago',
        salary: 11,
        exp: '1-2',
        description: ' The ideal candidate has experience across the full development lifecycle, from concept to deployment, and is comfortable working with modern front-end frameworks, server-side logic, databases, and cloud infrastructure.'



    },
    {
        id: 3,
        title: 'Backend Engineer',
        company: 'CodeBase',
        location: 'Bangalore',
        type: 'Part-time',
        salary: '₹40k–₹80k',
        posted: '5 days ago',
        desciption: ' A user- friendly interface using tailwind css ',
        salary: 9,
        exp: '1-2',


    },
    // Add more...
];


const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        query: '',
        location: '',
        type: '',
        salary: [30000, 120000],
    });
    console.log('jobs:', jobs);

    // useEffect(() => {
    //     async function fetchJobs() {
    //         setLoading(true);
    //         const { data, error } = await supabase.from("jobs").select("*");
    //         if (error) {
    //             setError(error.message);
    //         } else {
    //             setJobs(data);
    //         }
    //         setLoading(false);
    //     }
    //     fetchJobs();
    // }, []);
    // if (loading) return <p>Loading jobs...</p>;
    // if (error) return <p>Error loading jobs: {error}</p>;



    // filter 
    const fetchJobs = useCallback(
        debounce(async (filters) => {
            setLoading(true);

            let query = supabase.from('jobs').select('*');

            if (filters.query) {
                query = query.ilike('title', `%${filters.query}%`);
            }

            if (filters.location) {
                query = query.eq('location', filters.location);
            }

            if (filters.type) {
                query = query.eq('type', filters.type);
            }
            console.log('filters:', filters);

            query = query
                .gte('salary_min', filters.salary[0])
                .lte('salary_max', filters.salary[1]);

            const { data, error } = await query;

            if (!error) {
                setJobs(data);
            }

            setLoading(false);
        }, 2000),
        []
    );
    useEffect(() => {
        fetchJobs(filters);
    }, [filters, fetchJobs]);

    return (
        <>
            <JobSearch filters={filters} setFilters={setFilters} />
            <Grid className="">
                {jobs.length == 0 ? (
                    <Text c="dimmed" ta="center" w="100%" py="xl">
                        No results found.
                    </Text>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">{

                        jobs.map((job) => (
                            <JobCards key={job.id} job={job} />
                        ))
                    }
                    </div>
                )}
            </Grid>
        </>
    );
};

export default JobList;
