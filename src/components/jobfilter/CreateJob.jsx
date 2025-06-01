'use client';

import {
  Modal,
  TextInput,
  Textarea,
  Group,
  Select,
  NumberInput,
  Stack,
  Button
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, Controller } from 'react-hook-form';
import { IconCalendar } from '@tabler/icons-react';
import { IconChevronDown } from '@tabler/icons-react';


const CreateJobModal = ({ opened, onClose }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      company: data.company,
      location: data.location,
      type: data.type,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      deadline: data.deadline,
      description: data.description,
    };

    const res = await fetch('/api/jobs/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('payload:', payload);
    console.log('re:', res);
    if (res.ok) {
      console.log('Job created');
      reset(); // Reset form fields
      onClose(); // Close modal
    } else {
      const { error } = await res.json();
      alert('Error: ' + error);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={onClose}
        title="Create Job Opening" size="lg" centered className='font-bold'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="md">
            <Group grow>
              <Controller
                name="title"
                control={control}
                render={({ field }) => <TextInput label="Job Title" placeholder="Full Stack Developer" {...field} />}
              />
              <Controller
                name="company"
                control={control}
                render={({ field }) => <TextInput label="Company Name" placeholder="Amazon, Microsoft, Swiggy" {...field} />}
              />
            </Group>

            <Group grow>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Location"
                    placeholder="Choose Preferred Location"
                    data={['Remote', 'Bangalore', 'Hyderabad', 'Mumbai']}
                    {...field}
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Job Type"
                    placeholder="Select Job Type"
                    data={['FullTime', 'PartTime', 'Internship']}
                    {...field}
                  />
                )}
              />
            </Group>

            <Group grow>
              <Controller
                name="salaryMin"
                control={control}
                render={({ field }) => <NumberInput label="Salary Min" placeholder="0" prefix="₹" {...field} />}
              />
              <Controller
                name="salaryMax"
                control={control}
                render={({ field }) => <NumberInput label="Salary Max" placeholder='100000' prefix="₹" {...field} />}
              />
              <Controller
                name="deadline"
                control={control}

                render={({ field }) => <DateInput label="Application Deadline1"
                  rightSection={<IconCalendar size={18} stroke={1.5} />}

                  placeholder="Pick date" {...field} />}
              />
            </Group>

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Job Description"
                  placeholder="Please share a description to let the candidate know more about the job role"
                  autosize

                  minRows={4}
                  maxRows={6}

                  {...field}
                />
              )}
            />

            <Group justify="space-between" mt="md">
              <Button type="button" variant="default" onClick={() => reset()}>
                Save Draft ↓
                {/* {'\u21CA'} */}



              </Button>
              <Button color="blue" type="submit">
                Publish »
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default CreateJobModal;
