import { Flex, Button, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail is required').email('Invalid e-mail'),
  password: yup.string().required('Password is required'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <Flex w='100vw' h='100vh' align='center' justify='center'>
      <Flex
        direction='column'
        as='form'
        w='100%'
        maxW='360px'
        bg='gray.800'
        p='8'
        borderRadius='8px'
        onSubmit={handleSubmit(handleSignIn)}>
        <Stack spacing='4'>
          <Input
            type='email'
            name='email'
            label='E-mail'
            error={formState.errors.email}
            {...register('email')}
          />
          <Input
            type='password'
            name='password'
            label='Password'
            error={formState.errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}>
          Log In
        </Button>
      </Flex>
    </Flex>
  )
}
