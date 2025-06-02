'use client';
import React from 'react'


import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Text,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBriefcase,
  IconUsers,
  IconUser,
  IconMessageDots,
  IconPlus,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Find Jobs', href: '/jobs', icon: IconBriefcase },
  { label: 'Find Talents', href: '/talents', icon: IconUsers },
  { label: 'About us', href: '/about', icon: IconUser },
  { label: 'Testimonials', href: '/testimonials', icon: IconMessageDots },
];

const NavBar = ({ onCreateJobClick }) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <Box bg="" py="xs"
      // className='bg-gray-100'
      className="shadow-sm"
      style={{ borderRadius: '29px' }} // or '8px', '16px', etc.

    // style={{
    //   boxShadow: '0 4px 20px rgba(255, 255, 255, 0.5)', // white shadow
    //   borderRadius: '8px', // optional: soften edges
    // }}  
    >
      <Container size="lg" px="md">
        <Group justify="space-between" align="center" wrap="nowrap">
          {/* Logo */}
          <Group gap="xs" component={Link} href="/" style={{ textDecoration: 'none' }}>
            <Image src="/images/job_logo.png"
              alt="Main Logo" width={32} height={32} />
            {/* <Text fw={700} size="xl" c="black">JobGiant</Text> */}
          </Group>

          {/* Desktop Menu */}
          <Group visibleFrom="sm" gap="md" className='text-gray-900'>
            {navLinks.map((link) => (
              <Text
                key={link.label}
                // variant="default"
                className='text-gray-900 font-bold'
              //component={Link}
              // href={link.href}
              >
                {link.label}
              </Text>
            ))}
            <Button
              // component={Link}
              // href="/create"
              variant="filled"
              color="violet"
              radius="xl"
              onClick={onCreateJobClick}
            >
              Create Jobs
            </Button>
          </Group>

          {/* Mobile Menu Burger */}
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </Container>

      {/* Drawer Menu (Mobile) */}
      <Drawer
        opened={opened}
        onClose={close}
        // title="Navigation"
        padding="md"
        size="75%"
        hiddenFrom="sm"
        withCloseButton
      >
        <Box>
          {navLinks.map((link) => (
            <Text
              size="sm"
              key={link.label}
              // fullWidth
              width="100%"
              variant="default"
              // leftSection={link.icon ? <link.icon size={18} /> : null}
              // component={Link}
              // href={link.href}
              mb="sm"
              onClick={close}
            >
              {link.label}
            </Text>
          ))}

          <Button
            width='100%'
            // fullWidth
            variant="filled"
            color="violet"
            // leftSection={<IconPlus size={18} />}
            // component={Link}
            onClick={onCreateJobClick}
          >
            Create Jobs
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
export default NavBar;

