'use client';

import {
  TextInput,
  Select,
  RangeSlider,
  Button,
  Group,
  Paper,
} from '@mantine/core';
import {
  IconSearch,
  IconMapPin,
  IconBriefcase,
  IconCurrencyDollar,
} from '@tabler/icons-react';
import { useState } from 'react';

const JobSearch = ({ filters, setFilters }) => {
  const [salary, setSalary] = useState([30000, 120000]);

  return (
    <Paper shadow="md" p="md" radius="md" withBorder>
      <form className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <TextInput
          placeholder="Search By Job Title"
          leftSection={<IconSearch size={16} />}
          className="flex-1"
          variant="unstyled" // <-- removes border, background, padding

          value={filters.query}
          onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
        />
        <div className="hidden lg:block w-px bg-gray-300 self-stretch mx-2" />

        <Select
          placeholder="Preferred location"
          data={['Remote', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi']}
          leftSection={<IconMapPin size={16} />}
          className="flex-1"
          variant="unstyled" // <-- removes border, background, padding

          value={filters.location}
          onChange={(value) => setFilters((f) => ({ ...f, location: value }))}
        />
        <div className="hidden lg:block w-px bg-gray-300 self-stretch mx-2" />

        <Select
          placeholder="Job type"
          data={['FullTime', 'PartTime', 'Internship', 'Freelance']}
          leftSection={<IconBriefcase size={16} />}
          className="flex-1"
          variant="unstyled" // <-- removes border, background, padding

          value={filters.type}
          onChange={(value) => setFilters((f) => ({ ...f, type: value }))}
        />
        <div className="hidden lg:block w-px bg-gray-300 self-stretch mx-2" />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <label className="block font-medium">Salary Per Month</label>
            <span className="text-sm font-medium text-gray-600">
              ₹{(filters.salary[0] / 1000).toFixed(0)}k - ₹
              {(filters.salary[1] / 1000).toFixed(0)}k
            </span>
          </div>
          <RangeSlider
            label={(value) => `₹${value.toLocaleString()}`}
            min={10000}
            max={200000}
            step={5000}
            value={filters.salary}
            onChange={(val) => setFilters((f) => ({ ...f, salary: val }))}
            thumbChildren={[
              <IconCurrencyDollar size={12} key="min" />,
              <IconCurrencyDollar size={12} key="max" />,
            ]}
          />
        </div>
      </form>
    </Paper>
  );
};

export default JobSearch;
