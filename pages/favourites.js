import { Row, Col, Card, Pagination } from 'react-bootstrap'
import { ArtworkCard } from '../components'

import { useAtom } from 'jotai'
import { favouritesAtom } from '../store'

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

    if (!favouritesList) return null

    return (
        <Row className='gy-4'>
            {!favouritesList.length ? (
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h4>Nothing Here</h4>
                        </Card.Title>
                        <Card.Text>
                            Try adding some new artwork to the list.
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                favouritesList.map((objectID) => (
                    <Col lg={3} key={objectID}>
                        <ArtworkCard objectID={objectID} />
                    </Col>
                ))
            )}
        </Row>
    )
}
