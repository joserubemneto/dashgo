import { Header } from '../components/Header'
import dynamic from 'next/dynamic'
import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    forColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}

const series = [{ name: 'series-1', data: [31, 128, 10, 18, 51] }]

export default function Dashboard() {
  return (
    <Flex direction='column' h='100vh'>
      <Header />
      <Flex w='100%' my='6' maxW='1480px' mx='auto' px='6'>
        <Sidebar />

        <SimpleGrid flex='1' gap='4' minChildWidth='320px' align='flex-start'>
          <Box p='8' bg='gray.800' borderRadius='8px' pb='4'>
            <Text fontSize='lg' mb='4'>
              Week subscribes
            </Text>
            <Chart type='area' options={options} series={series} height='160' />
          </Box>
          <Box p='8' bg='gray.800' borderRadius='8px'>
            <Text fontSize='lg' mb='4'>
              Openning rate
            </Text>
            <Chart type='area' options={options} series={series} height='160' />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
