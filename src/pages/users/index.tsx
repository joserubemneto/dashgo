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
  Link,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { useState } from 'react'

import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../services/api'
import { getUsers, useUsers } from '../../services/hooks/useUsers'
import { queryClient } from '../../services/queryClient'

export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, isFetching } = useUsers(page)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ['user', userId],
      async () => {
        const { data } = await api.get(`users/${userId}`)

        return data
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    )
  }

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

            <NextLink href='/users/create' passHref>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20' />}>
                Create new
              </Button>
            </NextLink>
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
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme='pink' />
                      </Td>
                      <Td>
                        <Box>
                          <Link
                            color='purple.400'
                            onMouseEnter={() => handlePrefetchUser(user.id)}>
                            <Text fontWeight='bold'>{user.name}</Text>
                          </Link>
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
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

// use react-query with SSR
/*export const getServerSideProps: GetServerSideProps = async () => {
  const { users } = await getUsers(1)

  return {
    props: {
      users,
    },
  }
}*/
