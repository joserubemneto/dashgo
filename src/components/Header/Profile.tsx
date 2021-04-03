import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

export function Profile() {
  return (
    <Flex align='center'>
      <Box mr='4' textAlign='right'>
        <Text>José Rubem</Text>
        <Text color='gray.300' fontSize='small'>
          joserubem@ua.pt
        </Text>
      </Box>
      <Avatar size='md' name='José Rubem' />
    </Flex>
  )
}
