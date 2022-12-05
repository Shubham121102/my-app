import { MainNav } from '../components'
import { Container } from 'react-bootstrap'

export default function Layout(props) {
    return (
        <>
            <MainNav />
            <br />
            <br />
            <Container>{props.children}</Container>
            <br />
        </>
    )
}
