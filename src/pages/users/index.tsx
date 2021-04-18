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
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react'
import Link from 'next/link'

import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { useUsers } from '../../services/hooks/useUsers'

export default function UserList() {
  const { data, isLoading, isError, isFetching } = useUsers()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>
      <Header />
      <Flex w='100%' my='6' maxW='1480px' mx='auto' px='6'>
        <Sidebar />

        <Box flex='1' borderRadius='8px' bg='gray.800' p={['6', '8']}>
          <Flex mb='8' justify='space-between' align='center'>
            <Heading size='lg' fontWeight='normal'>
              Users
              {!isLoading && isFetching && (
                <Spinner size='sm' color='gray.500' ml='4' />
              )}
            </Heading>

            <Link href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}>
                Create new
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : isError ? (
            <Flex justify='center'>Failed to get users</Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color='gray.300' w='8'>
                      <Checkbox colorScheme='pink' />
                    </Th>
                    <Th>User</Th>
                    {isWideVersion && <Th>Registration date</Th>}
                    {isWideVersion && <Th w='8'></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((user) => (
                    <Tr>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme='pink' />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight='bold'>{user.name}</Text>
                          <Text fontSize='sm' color='gray.300'>
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      {isWideVersion && (
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
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
