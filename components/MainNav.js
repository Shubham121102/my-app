import { Container, Nav, Navbar, Form, Button, NavDropdown } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '../store'

import { addToHistory } from '../lib/userData'
import { readToken, removeToken } from '../lib/authenticate'

export default function MainNav() {
    let token = readToken()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const router = useRouter()
    const [isExpanded, setIsExpanded] = useState(false)
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            search: ''
        }
    })

    const logout = () => {
        setIsExpanded(false)
        removeToken()
        router.push('/login')
    }

    const handleSubmitForm = async (data) => {
        const query = `title=true&q=${data.search}`
        router.push(`/artwork?${query}`)
        reset({ search: '' })
        setIsExpanded((prevState) => false)
        setSearchHistory(await addToHistory(query))
    }

    return (
        <>
            <Navbar
                bg='primary'
                variant='dark'
                expand='lg'
                className='fixed-top'
                style={{ paddingTop: '12px', paddingBottom: '12px' }}
                expanded={isExpanded}
            >
                <Container>
                    <Navbar.Brand>Shubham Ashokkumar Patel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={e => setIsExpanded(!isExpanded)} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" >
                            <Link href="/" passHref legacyBehavior>
                                {/* <a>Home</a> */}
                                <Nav.Link onClick={e => setExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link onClick={e => setExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        &nbsp;
                        {token && (
                            <>
                                <Form
                                    className='d-flex'
                                    onSubmit={handleSubmit(handleSubmitForm)}
                                >
                                    <Form.Control
                                        type='search'
                                        placeholder='Search'
                                        className='me-2 form-control-sm'
                                        aria-label='Search'
                                        {...register('search')}
                                    />
                                    <Button
                                        variant='success'
                                        className='btn-sm'
                                        type='submit'
                                    >
                                        Search
                                    </Button>
                                </Form>
                                &nbsp;&nbsp; &nbsp;&nbsp;
                                <Nav>
                                    <NavDropdown
                                        title={token.userName}
                                        id='basic-nav-dropdown'
                                    >
                                        <Link href="/favourites" passHref legacyBehavior>
                                            <NavDropdown.Item onClick={e => setExpanded(false)} active={router.pathname === "/favorites"} >Favourites</NavDropdown.Item>
                                        </Link>
                                        <Link href="/history" passHref legacyBehavior>
                                            <NavDropdown.Item onClick={e => setExpanded(false)} active={router.pathname === "/history"} >Search History</NavDropdown.Item>
                                        </Link>
                                        <NavDropdown.Item
                                            onClick={() => {
                                                logout()
                                                setIsExpanded(
                                                    (prevState) => false
                                                )
                                            }}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                        {!token && (
                            <Nav>
                                <Link href='/register' passHref>
                                    <Nav.Link
                                        active={router.pathname === '/register'}
                                        onClick={() =>
                                            setIsExpanded((prevState) => false)
                                        }
                                    >
                                        Register
                                    </Nav.Link>
                                </Link>
                                <Link href='/login' passHref>
                                    <Nav.Link
                                        active={router.pathname === '/login'}
                                        onClick={() =>
                                            setIsExpanded((prevState) => false)
                                        }
                                    >
                                        Login
                                    </Nav.Link>
                                </Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    )
}
