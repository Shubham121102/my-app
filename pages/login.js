import { Card, Form, Alert, Button } from 'react-bootstrap'
import { useState } from 'react'
import { authenticateUser } from '../lib/authenticate'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { searchHistoryAtom, favouritesAtom } from '../store'
import { getFavourites, getHistory } from '../lib/userData'

export default function Login(props) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const [warning, setWarning] = useState('')
    const router = useRouter()

    const [favourites, setFavourites] = useAtom(favouritesAtom)
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    async function updateAtoms() {
        setFavourites(await getFavourites())
        setSearchHistory(await getHistory())
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (user == '' || password == '') {
            setWarning(`Fields cannot be blank`) 
            }
            else {
            await authenticateUser(user, password)
            await updateAtoms()
            router.push('/favourites')
            }
        } catch (err) {
            setWarning(`${user} does not exist`)
        }
    }


    return (
        <>
            <Card bg='light'>
                <button>
                <Card.Body>
                    <h2>Login</h2>Enter your login information below:
                </Card.Body>
                </button>
            </Card>
            <br />
            <Form onSubmit={handleSubmit}>
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
                {warning && (
                    <>
                        <br />
                        <Alert variant='danger'>{warning}</Alert>
                    </>
                )}
                <br />
                <Button variant='primary' className='pull-right' type='submit'>
                    Login
                </Button>
            </Form>
        </>
    )
}
