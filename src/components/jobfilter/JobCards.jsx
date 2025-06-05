'use client';

import {
    Card,
    Text,
    Badge,
    Group,
    Button,
    Stack,
    Grid,
} from '@mantine/core';
import { List } from '@mantine/core';
// import { IconBriefcase } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';
import { IconBuildings } from '@tabler/icons-react';

import {
    IconBriefcase,
    IconMapPin,
    IconCurrencyDollar,
    IconClockHour4,
    IconCalendar,
} from '@tabler/icons-react';
import Image from 'next/image';

function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} sec `;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return diffInMinutes === 1 ? "1 min " : `${diffInMinutes} min `;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return diffInHours === 1 ? "1 hr" : `${diffInHours} hrs`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return diffInDays === 1 ? "1 day " : `${diffInDays} days `;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return diffInMonths === 1 ? "1 month " : `${diffInMonths} months`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return diffInYears === 1 ? "1 year " : `${diffInYears} years `;
}

const JobCards = ({ job }) => {

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full w-full">
            <Stack justify="space-between" h="100%">
                <div>
                    <Group justify="space-between">
                        <Image
                            src="/images/amazon_logo.png"
                            alt={job.company}
                            width={50}
                            height={32}
                        />
                        {/* <Image src="/images/job_logo.png"
                            alt="Main Logo" width={32} height={32} /> */}
                        {/* <Text size="lg" fw={600}>Logo</Text> */}
                        <h1 className='text-black h-8 bg-blue-300 m-1 p-1 rounded ' fw="500">{timeAgo(job.created_at)} Ago</h1>
                    </Group>

                    <Text size="lg" mt="xs" fw={700}>{job.title}</Text>

                    <Group gap="sm" justify="space-between" wrap="wrap" className='w-full' mt="xs" fw='500' >
                        <Group gap={4}>
                            <IconUser size={16} />
                            {/* <IconMapPin size={16} /> */}
                            <Text size="sm">{job.exp || '1-3'} Exp</Text>
                        </Group>

                        <Group gap={4}>
                            <IconBuildings stroke={1} size={16} />
                            {/* <IconCurrencyDollar size={16} /> */}
                            <Text size="sm">{job.type}</Text>
                        </Group>

                        <Group gap={4}>
                            <IconCalendar size={16} />
                            <Text size="sm">{job.salary || 12} LPA</Text>
                        </Group>
                    </Group>



                    {/* <Text size="sm" lineClamp={3} mt="xs">

</Text> */}
                    <div className='m-1 text-slate-600 text-sm'>

                        <List listStyleType="disc">
                            <List.Item>{job.description}</List.Item>

                        </List>
                    </div>
                </div>

                <Button variant="dark" color="blue" fullWidth mt="md">
                    Apply Now
                </Button>

            </Stack>
        </Card>
    );
};

export default JobCards;
