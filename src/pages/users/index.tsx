import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from '@chakra-ui/react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'

export default function UserList() {
  return (
    <Box>
      <Header />
      <Flex w='100%' my='6' maxW='1480px' mx='auto' px='6'>
        <Sidebar />

        <Box flex='1' borderRadius='8px' bg='gray.800' p='8'>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Users List
            </Heading>
            <Button
              as='a'
              size='sm'
              fontSize='sm'
              colorScheme='pink'
              leftIcon={<Icon as={RiAddLine} fontSize='20' />}>
              Create new
            </Button>
          </Flex>
          <Table colorScheme='whiteAlpha'>
            <Thead>
              <Tr>
                <Th px='6' color='gray.300' w='8'>
                  <Checkbox colorScheme='pink' />
                </Th>
                <Th>User</Th>
                <Th>Registration date</Th>
                <Th w='8'></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px='6'>
                  <Checkbox colorScheme='pink' />
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight='bold'>José Rubem</Text>
                    <Text fontSize='sm' color='gray.300'>
                      joserubem@ua.pt
                    </Text>
                  </Box>
                </Td>
                <Td>April 4 2021</Td>
                <Td>
                  <Button
                    as='a'
                    size='sm'
                    fontSize='sm'
                    colorScheme='purple'
                    leftIcon={<Icon as={RiPencilLine} fontSize='16' />}>
                    Edit
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}
