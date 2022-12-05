import { Card, Form, Alert, Button } from 'react-bootstrap'
import { useState } from 'react'
import { registerUser } from '../lib/authenticate'
import { useRouter } from 'next/router'

export default function Register(props) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [warning, setWarning] = useState('')
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()
        alert(`So your username is : ${user} ? Press OK to continue`);


        try {
            if (user == '' || password == '' || password2 == '') {
                setWarning(`Fields should not be blank`)
            }
            else {
                await registerUser(user, password, password2)
                router.push('/login')
            }
        } catch (err) {
            setWarning('Oops, Please Try Again!')
        }
    }

    return (
        <>
            <Card bg='light'>
                <button>
                <Card.Body>
                    <h2>Register</h2>Register for a account:
                </Card.Body>
                </button>
            </Card>
            <br />
            <Form className="flex flex-col" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control
                        type='text'
                        value={user}
                        id='userName'
                        name='userName'
                        onChange={(e) => setUser(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        id='password'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type='password'
                        value={password2}
                        id='password2'
                        name='password2'
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </Form.Group>
                {warning && (
                    <>
                        <br />
                        <Alert variant='danger'>{warning}</Alert>
                    </>
                )}
                <br />
                <Button variant='primary' className='pull-right' type='submit'>
                    Register
                </Button>
            </Form>
        </>
    )
}
